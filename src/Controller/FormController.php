<?php

namespace Pagekit\Formmaker\Controller;

use Pagekit\Application as App;
use Pagekit\Kernel\Exception\NotFoundException;
use Pagekit\Formmaker\Model\Form;

/**
 * @Access("formmaker: manage forms", admin=true)
 * @Route("form", name="form")
 */
class FormController {

	/**
	 * @Route("/edit")
	 * @Request({"id": "int"})
	 */
	public function editAction ($id = 0) {
		$formmaker = App::module('formmaker');

		if (!$form = Form::find($id)) {

			$form = Form::create();

		}

		if (!$form) {
			throw new NotFoundException(__('Form not found.'));
		}

		return [
			'$view' => [
				'title' => __('Form'),
				'name' => 'formmaker:views/admin/edit.php'
			],
			'$data' => [
				'config' => $formmaker->config(),
				'types' => $formmaker->getTypes(),
				'formitem' => $form
			]
		];
	}

}
