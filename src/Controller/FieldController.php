<?php

namespace Pagekit\Formmaker\Controller;

use Pagekit\Application as App;
use Pagekit\Kernel\Exception\NotFoundException;
use Pagekit\Userprofile\Model\Field;
use Pagekit\User\Model\Role;

/**
 * @Access("site: manage site")
 */
class FieldController {

	/**
	 * @Route("/edit")
	 * @Request({"id"})
	 * @Access("site: manage site", admin=true)
	 */
	public function editAction ($id = '') {
		$userprofile = App::module('userprofile');

		if (is_numeric($id)) {
			$field = Field::find($id);
		} else {
			$field = Field::create();
			$field->setType($id);
		}

		if (!$field) {
			throw new NotFoundException(__('Field not found.'));
		}

		if (!$type = $userprofile->getType($field->type)) {
			throw new NotFoundException(__('Type not found.'));
		}

		return [
			'$view' => [
				'title' => __('Field'),
				'name' => 'userprofile:views/admin/edit.php'
			],
			'$data' => [
				'field' => $field,
				'type' => $type,
				'roles' => array_values(Role::findAll())

			]
		];
	}

}
