<?php
use Pagekit\Application as App;

return [
	'id' => 'htmlcode',
	'label' => __('Html code'),
	'config' => [
		'hasOptions' => 0,
		'required' => 0,
		'multiple' => 0,
	],
	'dependancies' => ['editor'],
	'prepareValue' => function ($field, $value) {
		return App::content()->applyPlugins($value, ['field' => $field, 'markdown' => $field->get('markdown')]);
	}
];