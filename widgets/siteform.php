<?php

use Pagekit\Formmaker\Model\Form;

return [

    'name' => 'bixie/siteform',

    'label' => 'Formmaker',

    'events' => [

        'view.scripts' => function ($event, $scripts) use ($app) {
            $scripts->register('widget-siteform', 'formmaker:app/bundle/widget-siteform.js', ['~widgets']);
        }

    ],

    'render' => function ($widget) use ($app) {

		$id = $widget->get('form_id');
		$user = $app->user();
		$formmaker = $app->module('formmaker');

		if (!$form = Form::where(['id = ?'], [$id])->where(function ($query) use ($user) {
			if (!$user->isAdministrator()) $query->where('status = 1');
		})->related('fields')->first()
		) {
			return 'Form not found';
		}

		$form->set('hide_title', $widget->get('hide_title'));
		$form->set('formStyle', $widget->get('formStyle'));

		$form->prepareView();

		$app->on('view.data', function ($event, $data) use ($form, $formmaker) {
			$data->add('$formmaker', [
				'config' => $formmaker->publicConfig(),
				'formitem' => $form,
				'fields' => array_values($form->fields)
			]);
		});

		$app->on('view.styles', function ($event, $styles) use ($app, $formmaker) {
			$formmaker->typeStyles($styles);
		});

		return $app->view('formmaker:views/form.php');
    }

];
