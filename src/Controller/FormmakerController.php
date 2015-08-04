<?php

namespace Pagekit\Formmaker\Controller;

use Pagekit\Application as App;

/**
 * @Access(admin=true)
 */
class FormmakerController {
	public function indexAction () {
		$formmaker = App::module('formmaker');

		return [
			'$view' => [
				'title' => __('Formmaker'),
				'name' => 'formmaker:views/admin/forms.php'
			],
			'$data' => [
				'config' => App::module('formmaker')->config(),
				'types' => $formmaker->getTypes()
			]
		];
	}

}
