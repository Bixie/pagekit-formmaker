<?php

return [

    'name' => 'bixie/siteform',

    'label' => 'Formmaker',

    'events' => [

        'view.scripts' => function ($event, $scripts) use ($app) {
            $scripts->register('widget-siteform', 'bixie/formmaker:app/bundle/widget-siteform.js', ['~widgets']);
        }

    ],

    'render' => function ($widget) use ($app) {

		$id = $widget->get('form_id');
		$formmaker = $app->module('bixie/formmaker');

		try {
			return $formmaker->renderForm($app, $id, [
				'hide_title' => $widget->get('hide_title'),
				'formStyle' => $widget->get('formStyle')
			]);
		} catch (\Pagekit\Application\Exception $e) {
			return $e->getMessage();
		}
    }

];
