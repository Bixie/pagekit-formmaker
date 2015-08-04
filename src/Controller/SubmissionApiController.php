<?php

namespace Pagekit\Formmaker\Controller;

use Pagekit\Application as App;
use Pagekit\Application\Exception;
use Pagekit\Kernel\Exception\NotFoundException;
use Pagekit\Formmaker\Model\Form;
use Pagekit\Formmaker\Model\Submission;
use Pagekit\User\Model\Role;

/**
 * @Route("submission", name="submission")
 */
class SubmissionApiController {


	/**
	 * @Route("/", methods="POST")
	 * @Route("/{id}", methods="POST", requirements={"id"="\d+"})
	 * @Request({"submission": "array", "id": "int"}, csrf=true)
	 */
	public function saveAction ($data, $id = 0) {

		if (!$submission = Submission::find($id)) {
			$submission = Submission::create();
			unset($data['id']);

			$submission->form_id = $data['form_id'];
			$submission->created = new \DateTime;
			$submission->ip = App::request()->getClientIp();
		}

		if (!$form = Form::find($submission->form_id)) {
			App::abort(404, 'Form not found.');
		}

		$submission->form = $form; //todo from relations?

		try {

			$submission->save($data);

		} catch (Exception $e) {
			App::abort(400, $e->getMessage());
		}

		return ['message' => 'Submission successfull', 'submission' => $submission];
	}

	/**
	 * @Route("/edit")
	 * @Request({"id"})
	 */
	public function editAction ($id = '') {
		$formmaker = App::module('formmaker');

		if (is_numeric($id)) {
			$field = Field::find($id);
		} else {
			$field = Field::create();
			$field->setType($id);
		}

		if (!$field) {
			throw new NotFoundException(__('Field not found.'));
		}

		if (!$type = $formmaker->getType($field->type)) {
			throw new NotFoundException(__('Type not found.'));
		}
		//check fixed value
		foreach (['multiple', 'required'] as $key) {
			if ($type[$key] != -1) {
				$field->set($key, $type[$key]);
			}
		}

		return ['field' => $field, 'type' => $type, 'roles' => array_values(Role::findAll())];
	}

	/**
	 * @Route("/{id}", methods="DELETE", requirements={"id"="\d+"})
	 * @Request({"id": "int"}, csrf=true)
	 */
	public function deleteAction ($id) {
		if ($field = Field::find($id)) {

			$field->delete();
		}

		return ['message' => 'success'];
	}

	/**
	 * @Route("/bulk", methods="DELETE")
	 * @Request({"ids": "array"}, csrf=true)
	 */
	public function bulkDeleteAction ($ids = []) {
		foreach (array_filter($ids) as $id) {
			$this->deleteAction($id);
		}

		return ['message' => 'success'];
	}

}
