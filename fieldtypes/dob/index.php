<?php
return [
	'id' => 'dob',
	'label' => __('Date of birth'),
	'config' => [
		'hasOptions' => 0,
		'required' => 0,
		'multiple' => 0,
		'dateFormat' => 'MM-DD-YYYY',
		'minAge' => 12,
		'maxAge' => 120
	],
	'dependancies' => ['uikit-form-select', 'uikit-datepicker'],
	'styles' => ['uikit-form-select' => 'app/assets/uikit/css/components/form-select.css'],
	'formatValue' => function ($field, $value) {
		$formats = ['DD-MM-YYYY' => 'F, m Y', 'MM-DD-YYYY' => 'm F Y'];
		try {

			$date = new DateTime($value);

			return [$date->format($formats[$field->get('dateFormat', 'MM-DD-YYYY')])];

		} catch (Exception $e) {
			return ['-'];
		}

	}
];