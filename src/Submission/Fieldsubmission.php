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
	 * @var \Bixie\Framework\FieldType\FieldTypeBase
	 */
	protected $fieldType;

	/**
	 * Fieldsubmission constructor.
	 * @param Field $field
	 * @param array $data
	 */
	public function __construct (Field $field, $data) {
		$formmaker = App::module('bixie/formmaker');
		$this->field = $field;
		$this->data = $data;
		$this->fieldType = $formmaker->getFieldType($field->type);
		if (!$this->fieldType) { //default text field for inactive/deleted fieldtypes
			$this->fieldType = $formmaker->getFieldType('text');
		}
	}

	/**
	 * @return \Bixie\Framework\FieldType\FieldTypeBase
	 */
	public function getFieldType () {
		if (!isset($this->fieldType)) {
			$this->fieldType = App::module('bixie/framework')->getFieldType($this->field->type);
		}
		return $this->fieldType;
	}

	/**
	 * @return array
	 */
	public function toFormattedArray () {
		return [
			'field' => $this->field->toArray(),
			'slug' => $this->field->slug,
			'type' => $this->getFieldType()->toArray(),
			'label' => $this->field->label,
			'value' => $this->formatValue()
		];
	}

	/**
	 * @return array
	 */
	public function formatValue () {

		$value = $this->getFieldType()->formatValue($this->field, $this->get('value'));

		return is_array($value) ? $value : [$value];
	}
}
