<?php

namespace Bixie\Formmaker\Submission;

use Bixie\Framework\FieldValue\FieldValueBase;
use Bixie\Framework\Field\FieldBase;
use Pagekit\Application as App;

class Fieldsubmission extends FieldValueBase{

	/**
	 * Fieldsubmission constructor.
	 * @param FieldBase $field
	 * @param array $data
	 */
	public function __construct (FieldBase $field, $data) {
		parent::__construct($field, $data);
		if (!$this->fieldType) { //default text field for inactive/deleted fieldtypes
			$this->fieldType = App::module('bixie/framework')->getFieldType('text');
		}
	}

}
