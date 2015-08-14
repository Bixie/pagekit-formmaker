<?php

namespace Pagekit\Formmaker\Model;

use Pagekit\Application as App;
use Pagekit\System\Model\DataModelTrait;
use Pagekit\User\Model\AccessModelTrait;

/**
 * @Entity(tableClass="@formmaker_field")
 */
class Field implements \JsonSerializable {
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
	 * reference value=>label for easy formatting
	 * @return array
	 */
	public function getOptionsRef () {
		$options = [];
		foreach ($this->options as $option) {
			$options[$option['value']] = $option['text'];
		}
		return $options;
	}

	/**
	 * Prepare default value before displaying form
	 * @return array
	 */
	public function prepareValue () {

		$value = $this->get('value');
		$type = App::module('formmaker')->getType($this->type);

		if (is_callable($type['prepareValue'])) {

			return call_user_func($type['prepareValue'], $this, $value);

		}

		return $value;
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
