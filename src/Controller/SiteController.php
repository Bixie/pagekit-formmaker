<?php

namespace Bixie\Formmaker\Controller;

use Bixie\Formmaker\Model\Submission;
use Bixie\Formmaker\Submission\Fieldsubmission;
use Pagekit\Application as App;
use Bixie\Formmaker\Model\Form;

class SiteController {

	/**
	 * @Route("/{id}", name="form/front")
	 */
	public function formAction ($id = 0) {
		if (!$formmaker = App::module('bixie/formmaker')) {
			return 'Formmaker extension is disabled!';
		}

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
		$app = App::getInstance();

		$form->prepareView($app, $formmaker);

		return [
			'$view' => [
				'title' => __($form->title),
				'name' => 'bixie/formmaker/form.php'
			],
			'node' => App::node()
		];

	}

}
