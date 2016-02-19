<?php

namespace Bixie\Formmaker\Model;

use Bixie\Framework\Field\FieldBase;
use Pagekit\Application as App;
use Pagekit\User\Model\AccessModelTrait;

/**
 * @Entity(tableClass="@formmaker_field",eventPrefix="formmaker_field")
 */
class Field extends FieldBase implements \JsonSerializable {
	use  AccessModelTrait, FieldModelTrait;

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
		'options' => 'getOptions',
		'value' => 'getValue',
		'valuedata' => 'getValuedata',
		'formatted' => 'formatValue'
	];

	/**
	 * {@inheritdoc}
	 */
	public function jsonSerialize () {
		$field = $this->toArray([], ['fieldValue', 'fieldType']);
		$field['options'] = $this->getOptions();
		return $field;
	}

}
