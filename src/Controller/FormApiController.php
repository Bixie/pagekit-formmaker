<?php

namespace Pagekit\Formmaker\Controller;

use Pagekit\Application as App;
use Pagekit\Application\Exception;
use Pagekit\Formmaker\Model\Form;
use Pagekit\Formmaker\Model\Field;

/**
 * @Route("form", name="form")
 */
class FormApiController {

	/**
	 * @Route("/", methods="GET")
	 */
	public function indexAction () {
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

		if (!$data['slug'] = $this->slugify($data['slug'] ?: $data['title'])) {
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
	 * @Route("/updateOrder", methods="POST")
	 * @Request({"forms": "array"}, csrf=true)
	 */
	public function updateOrderAction ($fields = []) {
		foreach ($fields as $data) {
			if ($field = Form::find($data['id'])) {

				$field->priority = $data['order'];

				$field->save();
			}
		}

		return ['message' => 'success'];
	}

	/**
	 * @Route("/{id}", methods="DELETE", requirements={"id"="\d+"})
	 * @Request({"id": "int"}, csrf=true)
	 */
	public function deleteAction ($id) {
		if ($form = Form::find($id)) {

			foreach (Field::where(['field_id = :id'], [':id' => $id])->get() as $field) {
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

	protected function slugify ($slug) {
		$slug = preg_replace('/\xE3\x80\x80/', ' ', $slug);
		$slug = str_replace('-', ' ', $slug);
		$slug = preg_replace('#[:\#\*"@+=;!><&\.%()\]\/\'\\\\|\[]#', "\x20", $slug);
		$slug = str_replace('?', '', $slug);
		$slug = trim(mb_strtolower($slug, 'UTF-8'));
		$slug = preg_replace('#\x20+#', '-', $slug);

		return $slug;
	}
}
