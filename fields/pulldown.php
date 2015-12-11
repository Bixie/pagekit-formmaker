<?php
/** @var Application $app */
return [
	'id' => 'pulldown',
	'label' => __('Pulldown'),
	'hasOptions' => 1,
	'required' => -1,
	'multiple' => -1,
	'dependancies' => [],
	'getOptions' => function ($field) use ($app) {
		if (empty($field->options)) {
			$field->options = [['value' => 'my-val', 'text' => 'my-text']];
		}
		return $field->options;
	}
];