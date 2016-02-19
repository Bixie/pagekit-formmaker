<?php

return [

	'name' => 'bixie/formmaker',

	'type' => 'extension',

	'main' => 'Bixie\\Formmaker\\FormmakerModule',

	'autoload' => [

		'Bixie\\Formmaker\\' => 'src'

	],

	'routes' => [

		'/formmaker' => [
			'name' => '@formmaker',
			'controller' => [
				'Bixie\\Formmaker\\Controller\\FormmakerController',
				'Bixie\\Formmaker\\Controller\\FormController',
				'Bixie\\Formmaker\\Controller\\SiteController'
			]
		],
		'/api/formmaker' => [
			'name' => '@formmaker/api',
			'controller' => [
				'Bixie\\Formmaker\\Controller\\FieldApiController',
				'Bixie\\Formmaker\\Controller\\FormApiController',
				'Bixie\\Formmaker\\Controller\\SubmissionApiController'
			]
		]

	],

	'widgets' => [

		'widgets/siteform.php'

	],

	'fieldtypes' => 'fieldtypes',

	'resources' => [

		'bixie/formmaker:' => ''

	],

	'menu' => [

		'formmaker' => [
			'label' => 'Formmaker',
			'icon' => 'packages/bixie/formmaker/icon.svg',
			'url' => '@formmaker',
			// 'access' => 'formmaker: manage hellos',
			'active' => '@formmaker(/*)'
		],

		'formmaker: forms' => [
			'label' => 'Forms',
			'parent' => 'formmaker',
			'url' => '@formmaker',
			'access' => 'formmaker: manage forms',
			'active' => '@formmaker(/edit)?'
		],

		'formmaker: submissions' => [
			'label' => 'Submissions',
			'parent' => 'formmaker',
			'url' => '@formmaker/submissions',
			'access' => 'formmaker: manage submissions',
			'active' => '@formmaker/submissions'
		]

	],

	'permissions' => [

		'formmaker: manage settings' => [
			'title' => 'Manage settings'
		],

		'formmaker: manage forms' => [
			'title' => 'Manage forms'
		],

		'formmaker: manage submissions' => [
			'title' => 'Manage submissions'
		]

	],

	'settings' => 'settings-formmaker',

	'config' => [
		'from_address' => '',
		'recaptha_sitekey' => '',
		'recaptha_secret_key' => '',
		'submissions_per_page' => 20

	],

	'events' => [

		'view.scripts' => function ($event, $scripts) use ($app) {
			if ($app['user']->hasAccess('formmaker: manage submissions')) {
				$scripts->register('widget-formmaker', 'bixie/formmaker:app/bundle/widget-formmaker.js', ['~dashboard']);
			}
			$scripts->register('formmaker-settings', 'bixie/formmaker:app/bundle/settings.js', '~extensions');
			$scripts->register('link-formmaker', 'bixie/formmaker:app/bundle/link-formmaker.js', '~panel-link');
		},

		'view.data' => function ($event, $data) use ($app) {
			$route = $app->request()->attributes->get('_route');
			if (strpos($route, '@formmaker') === 0) {
				$data->add('$fieldtypes', [
					'ajax_url' => 'api/formmaker/submission/ajax'
				]);
			}
		},

		'view.styles' => function ($event, $styles) use ($app) {
			$route = $app->request()->attributes->get('_route');
			if (strpos($route, '@formmaker') === 0) {
				foreach ($app->module('bixie/formmaker')->getFieldTypes() as $type) {
					$type->addStyles($styles);
				}
			}
		},

        'console.init' => function ($event, $console) {

			$console->add(new \Bixie\Formmaker\Console\Commands\TranslateCommand());

		}
	]

];
