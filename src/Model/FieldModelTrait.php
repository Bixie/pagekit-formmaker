<?php

namespace Bixie\Formmaker\Model;

use Pagekit\Application as App;
use Pagekit\Application\Exception;
use Pagekit\Database\ORM\ModelTrait;

trait FieldModelTrait {
	use ModelTrait;

	/**
	 * @Saving
	 */
	public static function saving ($event, Field $field) {
		$formmaker = App::module('bixie/formmaker');

		if (!$type = $formmaker->getFieldType($field->type)) {
			throw new Exception(__('Field type not found.'));
		}

		foreach (['multiple', 'required'] as $key) {
			if ($type[$key] != -1) { //check fixed value
				if ($type[$key] != $field->get($key)) {
					throw new Exception(__('Invalid value for ' . $key . ' option.'));
				}
			}
		}
		//slug
		$i = 2;
		$id = $field->id;

		if (!$field->slug) {
			$field->slug = $field->label;
		}

		while (self::where(['slug = ?', 'form_id = ?'], [$field->slug, $field->form_id])->where(function ($query) use ($id) {
			if ($id) $query->where('id <> ?', [$id]);
		})->first()) {
			$field->slug = preg_replace('/-\d+$/', '', $field->slug) . '-' . $i++;
		}

		if (!$field->id) {
			$field->priority = 1 + self::getConnection()->fetchColumn('SELECT MAX(priority) FROM @formmaker_field');
		}
	}
}
