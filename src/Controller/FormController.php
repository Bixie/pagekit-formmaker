<?php

namespace Bixie\Formmaker\Controller;

use Pagekit\Application as App;
use Pagekit\Kernel\Exception\NotFoundException;
use Bixie\Formmaker\Model\Form;

/**
 * @Access("formmaker: manage forms", admin=true)
 * @Route("form", name="form")
 */
class FormController {

	/**
	 * @Route("/edit", name="edit")
	 * @Request({"id": "int"})
	 */
	public function editAction ($id = 0) {
		$formmaker = App::module('bixie/formmaker');

		if (!$form = Form::find($id)) {

			$form = Form::create();

		}

		if (!$form) {
			throw new NotFoundException(__('Form not found.'));
		}

		return [
			'$view' => [
				'title' => __('Form'),
				'name' => 'bixie/formmaker/admin/edit.php'
			],
			'$data' => [
				'config' => $formmaker->config(),
				'types' => $formmaker->getFieldTypes(),
				'formitem' => $form
			]
		];
	}

}
