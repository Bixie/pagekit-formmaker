<?php

namespace Bixie\Formmaker\Submission;

use Bixie\PkFramework\FieldValue\FieldValueBase;
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
		$data = parent::toFormattedArray($data, $ignore);
		if (isset($data['field']['options']) && is_array($data['field']['options']) && !App::user()->isAdministrator()) {
		    $fieldOptions = [];
		    foreach ($data['field']['options'] as $fieldOption) {
		        unset($fieldOption['email']);
		        $fieldOptions[] = $fieldOption;
		    }
		    $data['field']['options'] = $fieldOptions;
		}
		return parent::toFormattedArray($data, $ignore);
	}

}
