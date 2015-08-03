<?php

namespace Pagekit\Formmaker\Controller;

use Pagekit\Application as App;
use Pagekit\Application\Exception;
use Pagekit\Kernel\Exception\NotFoundException;
use Pagekit\Formmaker\Model\Field;
use Pagekit\User\Model\Role;

class FieldApiController {

	/**
	 * @Route("/", methods="GET")
	 */
	public function indexAction () {
		$query = Field::query();
		return array_values($query->get());
	}

	/**
	 * @Route("/", methods="POST")
	 * @Route("/{id}", methods="POST", requirements={"id"="\d+"})
	 * @Request({"field": "array", "id": "int"}, csrf=true)
	 */
	public function saveAction ($data, $id = 0) {

		if (!$field = Field::find($id)) {
			$field = Field::create();
			unset($data['id']);
		}

		try {

			$field->save($data);

		} catch (Exception $e) {
			App::abort(400, $e->getMessage());
		}

		return ['message' => 'success', 'field' => $field];
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

		return ['field' => $field, 'type' => $type, 'roles' => array_values(Role::findAll())];
	}

	/**
	 * @Route("/updateOrder", methods="POST")
	 * @Request({"fields": "array"}, csrf=true)
	 */
	public function updateOrderAction ($fields = []) {
		foreach ($fields as $data) {
			if ($field = Field::find($data['id'])) {

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
