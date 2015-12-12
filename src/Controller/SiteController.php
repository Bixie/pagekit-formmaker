<?php

namespace Bixie\Formmaker\Controller;

use Pagekit\Application as App;
use Bixie\Formmaker\Model\Form;

class SiteController {

	/**
	 * @Route("/{id}", name="form/front")
	 */
	public function formAction ($id = 0) {
		$user = App::user();
		/** @var Form $form */
		if (!$form = Form::where(['id = ?'], [$id])->where(function ($query) use ($user) {
			if (!$user->isAdministrator()) $query->where('status = 1');
		})->related('fields')->first()
		) {
			App::abort(404, __('Form not found!'));
		}

		if (!App::node()->hasAccess(App::user())) {
			App::abort(403, __('Insufficient User Rights.'));
		}
		$formmaker = App::module('bixie/formmaker');
		$app = App::getInstance();

		$form->prepareView($app, $formmaker);

		return [
			'$view' => [
				'title' => __($form->title),
				'name' => 'bixie/formmaker/form.php'
			],
			'$formmaker' => [
				'config' => $formmaker->publicConfig(),
				'formitem' => $form,
				'fields' => array_values($form->fields)
			],
			'node' => App::node()
		];

	}

}
