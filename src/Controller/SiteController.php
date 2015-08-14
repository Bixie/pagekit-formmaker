<?php

namespace Pagekit\Formmaker\Controller;

use Pagekit\Application as App;
use Pagekit\Formmaker\Model\Form;

class SiteController {

	/**
	 * @Route("/{id}")
	 */
	public function formAction ($id = 0) {
		$user = App::user();

		if (!$form = Form::where(['id = ?'], [$id])->where(function ($query) use ($user) {
			if (!$user->isAdministrator()) $query->where('status = 1');
		})->related('fields')->first()
		) {
			App::abort(404, __('Form not found!'));
		}

		if (!App::node()->hasAccess(App::user())) {
			App::abort(403, __('Insufficient User Rights.'));
		}
		if ($form->get('recaptcha')) {
			App::view()->on('footer', function ($event) {
				$event->addResult('<script src="https://www.google.com/recaptcha/api.js?onload=grecacapthaCallback&render=explicit" async defer></script>');
			});
		}
		return [
			'$view' => [
				'title' => __($form->title),
				'name' => 'formmaker:views/form.php'
			],
			'$data' => [
				'config' => App::module('formmaker')->publicConfig(),
				'formitem' => $form,
				'fields' => array_values($form->fields)
			]
		];

	}

}
