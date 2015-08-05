<?php

namespace Pagekit\Formmaker\Submission;

use Pagekit\Application as App;
use Pagekit\System\Model\DataModelTrait;
use Pagekit\Formmaker\Model\Field;

class Fieldsubmission {

	use DataModelTrait;

	/**
	 * @var Field
	 */
	public $field;
	/**
	 * @var array
	 */
	public $type;

	/**
	 * Fieldsubmission constructor.
	 */
	public function __construct (Field $field, $data) {
		$this->field = $field;
		$this->data = $data;
		$this->type = App::module('formmaker')->getType($field->type);
	}

	public function toFormattedArray () {
		return [
			'field' => $this->field->toArray(),
			'slug' => $this->field->slug,
			'type' => $this->type,
			'label' => $this->field->label,
			'value' => $this->formatValue()
		];
	}

	public function formatValue () {

		$value = $this->get('value');

		if (is_callable($this->type['formatValue'])) {

			return call_user_func($this->type['formatValue'], $this->field, $value);

		}

		return is_array($value) ? $value : [$value];
	}
}
