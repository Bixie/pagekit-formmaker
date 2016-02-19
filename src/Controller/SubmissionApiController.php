<?php

namespace Bixie\Formmaker\Controller;

use Bixie\Framework\FieldValue\FieldValue;
use Pagekit\Application as App;
use Pagekit\Application\Exception;
use Pagekit\Util\ArrObject;
use Bixie\Formmaker\Model\Form;
use Bixie\Formmaker\Model\Field;
use Bixie\Formmaker\Model\Submission;
use Bixie\Formmaker\Submission\MailHelper;
use Bixie\Formmaker\Submission\CsvHelper;
use ReCaptcha\ReCaptcha;

/**
 * @Route("submission", name="submission")
 */
class SubmissionApiController {

	/**
	 * @Access("formmaker: manage submissions")
	 * @Route("/", methods="GET")
	 * @Request({"filter": "array", "page":"int"})
	 */
	public function indexAction ($filter = [], $page = 0) {
		$query = Submission::query();
		$filter = array_merge(array_fill_keys(['status', 'form', 'order', 'limit'], ''), $filter);

		extract($filter, EXTR_SKIP);

		if (is_numeric($status)) {
			$query->where('status = ?', [(int)$status]);
		} elseif ($status != 'all') {
			$query->where(['status > 0']);
		}

		if ($form) {
			$query->where(function ($query) use ($form) { //todo why nesting
				if (is_array($form)) {
//					$query->orWhere('form_id IN(?)', [implode(',', $form)]); //todo selects only first id
//					$query->whereInSet('form_id', $form); //input cleaned?
					$query->orWhere('form_id IN(' . implode(',', $form) . ')');
				} else {
					$query->orWhere(['form_id' => (int)$form]);
				}
			});
		}

		if (!preg_match('/^(created|ip|email)\s(asc|desc)$/i', $order, $order)) {
			$order = [1 => 'created', 2 => 'desc'];
		}


		$limit = (int)$limit ?: App::module('bixie/formmaker')->config('submissions_per_page');
		$count = $query->count();
		$pages = ceil($count / $limit);
		$page = max(0, min($pages - 1, $page));

		$submissions = array_values($query->offset($page * $limit)->limit($limit)->related('form')->orderBy($order[1], $order[2])->get());

		return compact('submissions', 'pages', 'count');

	}

	/**
	 * @Route("/ajax", methods="POST")
	 * @Request({"field_id": "int", "action": "string"})
	 */
	public function ajaxAction ($field_id, $action) {

		if (!$field = Field::find($field_id)) {
			App::abort(400, __('Field not found.'));
		}
		$fieldValue = new FieldValue($field, App::request()->get('value', []), App::request()->get('valuedata', []));
		$fieldType = $fieldValue->getFieldType();
		if (method_exists($fieldType, $action)) {
			return call_user_func([$fieldType,$action], $fieldValue);
		}
		return 'No response';
	}

	/**
	 * @Route("/", methods="POST")
	 * @Route("/{id}", methods="POST", requirements={"id"="\d+"})
	 * @Request({"submission": "array", "id": "int", "g-recaptcha-response": "string"}, csrf=true)
	 */
	public function saveAction ($data, $id = 0, $gRecaptchaResponse ='') {

		if (!$submission = Submission::find($id)) {
			$submission = Submission::create();
			unset($data['id']);

			$submission->form_id = $data['form_id'];
			$submission->created = new \DateTime;
			$submission->ip = App::request()->getClientIp();
		}

		unset($data['created']);

		if (!$form = Form::find($submission->form_id)) {
			App::abort(404, 'Form not found.');
		}
		$submission->form = $form;

		if ($form->get('recaptcha')
			and $id == 0
			and ($recaptha_secret_key = App::module('bixie/formmaker')->config('recaptha_secret_key'))) {
			$resp = (new ReCaptcha($recaptha_secret_key))->verify($gRecaptchaResponse, App::request()->server->get('REMOTE_ADDR'));
			if (!$resp->isSuccess()) {
				$errors = $resp->getErrorCodes();
				App::abort(403, (isset($errors[0]) ? $errors[0] : 'Error in reCaptcha'));
			}
		}

		$submission->save($data);

		$submission->email = $submission->getUserEmail();

		if ($id == 0) {
			try {

				(new MailHelper($submission))->sendMail();

				$submission->save();

			} catch (Exception $e) {
				App::abort(400, $e->getMessage());
			}
		}

		return ['message' => 'Submission successful', 'submission' => $submission];
	}

	/**
	 * @Access("formmaker: manage submissions")
	 * @Route("/bulk", methods="POST")
	 * @Request({"submissions": "array"}, csrf=true)
	 */
	public function bulkSaveAction ($submissions = []) {
		foreach ($submissions as $data) {
			$this->saveAction($data, isset($data['id']) ? $data['id'] : 0);
		}

		return ['message' => 'success'];
	}

	/**
	 * @Access("formmaker: manage submissions")
	 * @Route("/detail")
	 * @Request({"submission_id"}, csrf=true)
	 */
	public function detailAction ($id) {

		if (!$submission = Submission::where(['id = ?'], [$id])->related('form')->first()) {
			App::abort(404, 'Submission not found.');
		}

		$submission->getFieldsubmissions();

		return $submission;
	}

	/**
	 * @Access("formmaker: manage submissions")
	 * @Route("/{id}", methods="DELETE", requirements={"id"="\d+"})
	 * @Request({"id": "int"}, csrf=true)
	 */
	public function deleteAction ($id) {
		if ($field = Submission::find($id)) {

			$field->delete();
		}

		return ['message' => 'success'];
	}

	/**
	 * @Access("formmaker: manage submissions")
	 * @Route("/bulk", methods="DELETE")
	 * @Request({"ids": "array"}, csrf=true)
	 */
	public function bulkDeleteAction ($ids = []) {
		foreach (array_filter($ids) as $id) {
			$this->deleteAction($id);
		}

		return ['message' => 'success'];
	}

	/**
	 * @Access("formmaker: manage submissions")
	 * @Route("/csv", methods="GET")
	 * @Request({"options": "array"}, csrf=true)
	 */
	public function indexCsvAction ($options = []) {
		$count = 0;
		$forms = [];
		$fields = [];
		$form = ['id' => 0];
		$options = new ArrObject($options);
		if ($form_id = $options->get('form_id', 0)) {
			//get forminfo
			$form = Form::find($form_id);
			$fields = Field::where(['form_id = ?'], [$form_id])->get();
			$options->set('field_ids', array_keys($fields));
			//count exported submissions
			$query = Submission::query();
			$query->where(['form_id = ?'], [$form_id])->whereIn('status', $options->get('status', [])); //input cleaned?
			$count = $query->count();
		} else {
			$forms = array_values(Form::findAll());
		}

		//force int
		$options->set('status', array_map(function ($id) {return (int) $id; }, $options->get('status', [])));
		$options->set('form_id', (int)$form_id);
		return ['options' => $options->toArray(), 'forms' => $forms, 'formitem' => $form, 'fields' => array_values($fields), 'count' => $count];
	}

	/**
	 * @Access("formmaker: manage submissions")
	 * @Route("/csv", methods="POST")
	 * @Request({"options": "array"}, csrf=true)
	 */
	public function exportCsvAction ($options = []) {
		$csvString = '';
		$options = new ArrObject($options);
		if ($form_id = $options->get('form_id', 0)) {
			//get forminfo
			$form = Form::find($form_id);

			//get submissions
			$query = Submission::query();
			$query->where(['form_id = ?'], [$form_id])->whereIn('status', $options->get('status', [])); //input cleaned?
			$submissions = $query->orderBy('created', 'desc')->get();

			$csvString = (new CsvHelper($submissions, $form, $options))->toCsv();

			if ($options->get('mark_archived', false)) {
				Submission::query()->whereIn('id', array_keys($submissions))
					->update(['status' => Submission::STATUS_ARCHIVED]);
			}

		} else {
			App::abort(404, 'Not a single form was given.');
		}

		return ['csv' => $csvString];
	}

}
