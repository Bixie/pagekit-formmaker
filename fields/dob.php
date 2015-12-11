<?php
return [
	'id' => 'dob',
	'label' => __('Date of birth'),
	'hasOptions' => 0,
	'required' => 0,
	'multiple' => 0,
	'dependancies' => ['uikit-form-select', 'uikit-datepicker'],
	'style' => ['uikit-form-select' => 'app/assets/uikit/css/components/form-select.css'],
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