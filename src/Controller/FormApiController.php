<?php

namespace Bixie\Formmaker\Controller;

use Pagekit\Application as App;
use Pagekit\Application\Exception;
use Bixie\Formmaker\Model\Form;
use Bixie\Formmaker\Model\Field;

/**
 * @Route("form", name="form")
 */
class FormApiController {

	/**
	 * @Route("/", methods="GET")
	 */
	public function indexAction () {
		//TODO pagination/filter
		$query = Form::query();
		return array_values($query->related('fields')->get());
	}

	/**
	 * @Route("/", methods="POST")
	 * @Route("/{id}", methods="POST", requirements={"id"="\d+"})
	 * @Request({"formitem": "array", "id": "int"}, csrf=true)
	 */
	public function saveAction ($data, $id = 0) {

		if (!$form = Form::find($id)) {
			$form = Form::create();
			unset($data['id']);
		}

		if (!$data['slug'] = App::filter(($data['slug'] ?: $data['title']), 'slugify')) {
			App::abort(400, __('Invalid slug.'));
		}

		try {

			$form->save($data);

		} catch (Exception $e) {
			App::abort(400, $e->getMessage());
		}

		return ['message' => 'success', 'formitem' => $form];
	}

	/**
	 * @Route("/{id}", methods="DELETE", requirements={"id"="\d+"})
	 * @Request({"id": "int"}, csrf=true)
	 */
	public function deleteAction ($id) {
		if ($form = Form::find($id)) {

			foreach (Field::where(['form_id = :id'], [':id' => $id])->get() as $field) {
				$field->delete();
			}

			$form->delete();
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
