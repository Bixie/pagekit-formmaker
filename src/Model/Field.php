<?php

namespace Bixie\Formmaker\Model;

use Bixie\Framework\Field\FieldBase;
use Pagekit\Application as App;
use Pagekit\System\Model\DataModelTrait;
use Pagekit\User\Model\AccessModelTrait;

/**
 * @Entity(tableClass="@formmaker_field",eventPrefix="formmaker_field")
 */
class Field extends FieldBase implements \JsonSerializable {
	use  AccessModelTrait, DataModelTrait, FieldModelTrait;

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

	/** @Column(type="string") */
	public $slug;

	/** @Column(type="json_array") */
	public $options;

	/** @BelongsTo(targetEntity="Form", keyFrom="form_id") */
	public $form;

	/** @var array */
	protected static $properties = [
		'prepared' => 'prepareValue'
	];

	/**
	 * @param string $type
	 */
	public function setType ($type) {
		$this->type = $type;
	}

	/**
	 * Prepare default value before displaying form
	 * @return array
	 */
	public function prepareValue () {
		/** @var \Bixie\Formmaker\Type\Type $type */
		if ($type = App::module('bixie/formmaker')->getFieldType($this->type)) {
			return $type->prepareValue($this, $this->get('value'));
		}
		return $this->get('value');
	}

	/**
	 * {@inheritdoc}
	 * @return mixed
	 */
	public function getOptions () {

		/** @var \Bixie\Formmaker\Type\Type $type */
		if ($type = App::module('bixie/formmaker')->getFieldType($this->type)) {
			return $type->getOptions($this);
		}
		return [];
	}

	/**
	 * {@inheritdoc}
	 * @param mixed $options
	 */
	public function setOptions ($options) {
		$this->options = $options;
	}

	/**
	 * reference value=>label for easy formatting
	 * @return array
	 */
	public function getOptionsRef () {
		$options = [];
		foreach ($this->getOptions() as $option) {
			$options[$option['value']] = $option['text'];
		}
		return $options;
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
