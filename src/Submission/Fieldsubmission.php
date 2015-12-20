<?php

namespace Bixie\Formmaker\Submission;

use Bixie\Formmaker\Type\TypeBase;
use Pagekit\Application as App;
use Pagekit\System\Model\DataModelTrait;
use Bixie\Formmaker\Model\Field;

class Fieldsubmission {

	use DataModelTrait;

	/**
	 * @var Field
	 */
	public $field;
	/**
	 * @var TypeBase
	 */
	public $type;

	/**
	 * Fieldsubmission constructor.
	 */
	public function __construct (Field $field, $data) {
		$formmaker = App::module('bixie/formmaker');
		$this->field = $field;
		$this->data = $data;
		$this->type = $formmaker->getType($field->type);
		if (!$this->type) { //default text field for inactive/deleted fieldtypes
			$this->type = $formmaker->getType('text');
		}
	}

	/**
	 * @return array
	 */
	public function toFormattedArray () {
		return [
			'field' => $this->field->toArray(),
			'slug' => $this->field->slug,
			'type' => $this->type->toArray(),
			'label' => $this->field->label,
			'value' => $this->formatValue()
		];
	}

	/**
	 * @return array
	 */
	public function formatValue () {

		$value = $this->type->formatValue($this->field, $this->get('value'));

		return is_array($value) ? $value : [$value];
	}
}
