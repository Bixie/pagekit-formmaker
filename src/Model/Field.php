<?php

namespace Pagekit\Formmaker\Model;

use Pagekit\System\Model\DataModelTrait;

/**
 * @Entity(tableClass="@formmaker_field")
 */
class Field implements \JsonSerializable {
	use  DataModelTrait, FieldModelTrait;

	/** @Column(type="integer") @Id */
	public $id;

	/** @Column(type="integer") */
	public $form_id;

	/** @Column(type="integer") */
	public $priority = 0;

	/** @Column(type="string") */
	public $type;

	/** @Column(type="string") */
	public $label;

	/** @Column(type="json_array") */
	public $options;

	/**
	 * @param mixed $type
	 */
	public function setType ($type) {
		$this->type = $type;
	}

	/**
	 * {@inheritdoc}
	 * @return mixed
	 */
	public function getOptions () {
		return $this->options ?: [];
	}

	/**
	 * {@inheritdoc}
	 * @param mixed $options
	 */
	public function setOptions ($options) {
		$this->options = $options;
	}

	/**
	 * {@inheritdoc}
	 */
	public function jsonSerialize () {
		$field = $this->toArray();

		$field['options'] = $this->getOptions();

		return $field;
	}

}
