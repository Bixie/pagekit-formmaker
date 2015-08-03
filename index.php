<?php

return [

	'name' => 'formmaker',

	'type' => 'extension',

	'main' => 'Pagekit\\Formmaker\\FormmakerModule',

	'autoload' => [

		'Pagekit\\Formmaker\\' => 'src'

	],

	'nodes' => [

	],

	'routes' => [

		'/form' => [
			'name' => '@formmaker',
			'controller' => 'Pagekit\\Formmaker\\Controller\\FormmakerController'
		],
		'/formmaker' => [
			'name' => '@formmaker/admin',
			'controller' => [
				'Pagekit\\Formmaker\\Controller\\FormmakerController',
				'Pagekit\\Formmaker\\Controller\\FormController'
			]
		],
		'/api/formmaker/field' => [
			'name' => '@formmaker/api/field',
			'controller' => 'Pagekit\\Formmaker\\Controller\\FieldApiController'
		],
		'/api/formmaker/form' => [
			'name' => '@formmaker/api/form',
			'controller' => 'Pagekit\\Formmaker\\Controller\\FormApiController'
//		],
//		'/api/formmaker/profile' => [
//			'name' => '@formmaker/api/profile',
//			'controller' => 'Pagekit\\Formmaker\\Controller\\ProfileApiController'
		]

	],

	'resources' => [

		'formmaker:' => ''

	],

	'menu' => [

		'formmaker' => [
			'label' => 'Formmaker',
			'icon' => 'extensions/formmaker/assets/images/image.svg',
			'url' => '@formmaker/admin',
			// 'access' => 'formmaker: manage hellos',
			'active' => '@formmaker(/*)'
		],

		'formmaker: forms' => [
			'label' => 'Forms',
			'parent' => 'formmaker',
			'url' => '@formmaker/admin',
			'access' => 'formmaker: manage forms',
			'active' => '@formmaker(/edit)?' //todo why no active?
		]

	],

	'permissions' => [

		'formmaker: manage settings' => [
			'title' => 'Manage settings'
		],

		'formmaker: manage forms' => [
			'title' => 'Manage forms'
		]

	],

	'settings' => 'settings-formmaker',

	'config' => [

		'override_registration' => 1

	],

	'events' => [

		'boot' => function ($event, $app) {
		},

		'request' => function ($event, $request) use ($app) {
			if ($app->config('formmaker')->get('override_registration', true) && $request->attributes->get('_route') == '@user/registration') {
				$event->setResponse($app->redirect('@formmaker/registration'), [], 301);
			}
		},

		'enable.formmaker' => function () use ($app) {
			// run all migrations that are newer than the current version
			if ($version = $app['migrator']->create('formmaker:migrations', $this->config('version'))->run()) {
				$app->config($this->name)->set('version', $version);
			}
			$app->config($this->name)->set('override_registration', 1); //todo shouldn't this be done by PackageController?

		},

		'disable.formmaker' => function () use ($app) {
			// disable hook
		},

		'uninstall.formmaker' => function () use ($app) {
			// downgrade all migrations
			$app['migrator']->create('formmaker:migrations', $this->config('version'))->run(0);

			// remove the config
			$app['config']->remove($this->name);
		},

		'view.scripts' => function ($event, $scripts) use ($app) {
			$scripts->register('formmaker-settings', 'formmaker:app/bundle/settings.js', '~extensions');
			$scripts->register('formmaker-site', 'formmaker:app/bundle/site.js', '~site-edit');
			$scripts->register('formmaker-link', 'formmaker:app/bundle/link.js', '~panel-link');
			//register forms
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
			if (strpos($route, '@formmaker') === 0 || in_array($route, ['@user/edit'])) {
				$formmaker = $app->module('formmaker');
				foreach ($formmaker->getTypes() as $type) {
					if (isset($type['style'])) {
						foreach ($type['style'] as $name => $source) {
							$styles->add('uikit-form-select', 'vendor/assets/uikit/css/components/form-select.css');

						}
					}
				}
			}
		}

	]

];
