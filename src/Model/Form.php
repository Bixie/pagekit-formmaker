<?php

namespace Pagekit\Formmaker\Model;

use Pagekit\System\Model\DataModelTrait;

/**
 * @Entity(tableClass="@formmaker_form")
 */
class Form implements \JsonSerializable {
	use DataModelTrait, FormModelTrait;

	/** @Column(type="integer") @Id */
	public $id;

	/** @Column(type="integer") */
	public $status = 0;

	/** @Column(type="string") */
	public $title;

	/** @Column(type="string") */
	public $slug;

	/**
	 * @HasMany(targetEntity="Field", keyFrom="id", keyTo="form_id")
	 * @OrderBy({"priority" = "ASC"})
	 */
	public $fields;

	public function getFields () {
		if (!isset($this->fields)) {
			$this->fields = Field::query(['form_id' => $this->id])->orderBy('priority', 'ASC')->get();
		}
		return $this->fields;
	}

	/**
	 * {@inheritdoc}
	 */
	public function jsonSerialize () {
		return $this->toArray();
	}

}
