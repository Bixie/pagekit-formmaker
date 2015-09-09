<?php

return [

	'name' => 'formmaker',

	'type' => 'extension',

	'main' => 'Pagekit\\Formmaker\\FormmakerExtension',

	'autoload' => [

		'Pagekit\\Formmaker\\' => 'src'

	],

	'routes' => [

		'/formmaker' => [
			'name' => '@formmaker',
			'controller' => [
				'Pagekit\\Formmaker\\Controller\\FormmakerController',
				'Pagekit\\Formmaker\\Controller\\FormController',
				'Pagekit\\Formmaker\\Controller\\SiteController'
			]
		],
		'/api/formmaker' => [
			'name' => '@formmaker/api',
			'controller' => [
				'Pagekit\\Formmaker\\Controller\\FieldApiController',
				'Pagekit\\Formmaker\\Controller\\FormApiController',
				'Pagekit\\Formmaker\\Controller\\SubmissionApiController'
			]
		]

	],

	'resources' => [

		'formmaker:' => ''

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
		'submissions_per_page' => 20,
		'from_address' => function () use ($app) {
			return $app->config('system/mail')->get('from_address', '');
		}

	],

	'events' => [

		'uninstall.formmaker' => function () use ($app) {
			// downgrade all migrations
			$app['migrator']->create('formmaker:migrations', $this->config('version'))->run(0);

			// remove the config
			$app['config']->remove($this->name);
		},

		'view.scripts' => function ($event, $scripts) use ($app) {
			if ($app['user']->hasAccess('formmaker: manage submissions')) {
				$scripts->register('widget-formmaker', 'formmaker:app/bundle/widget-formmaker.js', ['~dashboard']);
			}
			$scripts->register('formmaker-settings', 'formmaker:app/bundle/settings.js', '~extensions');
			$scripts->register('node-formmaker', 'formmaker:app/bundle/node-formmaker.js', '~site-edit');
			$scripts->register('link-formmaker', 'formmaker:app/bundle/link-formmaker.js', '~panel-link');
			//register fields
			$scripts->register('formmaker-formmakerfields', 'formmaker:app/bundle/formmaker-formmakerfields.js', 'vue');
			$formmaker = $app->module('formmaker');
			foreach ($formmaker->getTypes() as $type) {
				$scripts->register(
					'formmaker-' . $type['id'], 'formmaker:app/bundle/formmaker-' . $type['id'] . '.js',
					array_merge(['~formmaker-formmakerfields'], $type['dependancies'])
				);
			}
		},

		'view.styles' => function ($event, $styles) use ($app) {
			//todo this should be prettier
			$route = $app->request()->attributes->get('_route');
			if (strpos($route, '@formmaker') === 0) {
				$formmaker = $app->module('formmaker');
				foreach ($formmaker->getTypes() as $type) {
					if (isset($type['style'])) {
						foreach ($type['style'] as $name => $source) {
							$styles->add($name, $source);

						}
					}
				}
			}
		}

	]

];
