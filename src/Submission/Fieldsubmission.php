<?php

namespace Bixie\Formmaker\Submission;

use Bixie\Framework\FieldValue\FieldValueBase;
use Bixie\Formmaker\Model\Field;
use Pagekit\Application as App;

class Fieldsubmission extends FieldValueBase {
	/**
	 * @var int
	 */
	public $field_id;

	/**
	 * FieldValue constructor.
	 * @param Field $field
	 * @param array $value
	 * @param array $data
	 */
	public function __construct (Field $field, $value, $data) {
		$this->setField($field);
		$this->field_id = $field->id;
		$this->value = is_array($value) ? $value : (!empty($value) ? [$value] : []);
		$this->data = $data;
	}

	public function toFormattedArray (array $data = [], array $ignore = []) {
		$data['field_id'] = $this->field_id;
		return parent::toFormattedArray($data, $ignore);
	}

}
