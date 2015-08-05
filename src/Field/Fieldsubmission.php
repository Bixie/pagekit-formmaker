<?php

namespace Pagekit\Formmaker\Field;

use Pagekit\Application as App;
use Pagekit\System\Model\DataModelTrait;
use Pagekit\Database\ORM\PropertyTrait;
use Pagekit\Formmaker\Model\Field;

class Fieldsubmission {

	use DataModelTrait, PropertyTrait;

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
			'type' => $this->type,
			'value' => $this->get('value'),
			'format' => $this->formatValue()
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
