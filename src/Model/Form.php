<?php

namespace Pagekit\Formmaker\Model;

use Pagekit\Application as App;
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

	/** @var array */
	protected static $properties = [
		'url' => 'getFormUrl'
	];

	/**
	 * @HasMany(targetEntity="Field", keyFrom="id", keyTo="form_id")
	 * @OrderBy({"priority" = "ASC"})
	 * @var Field[]
	 */
	public $fields;

	public function getFields () {
		if (!isset($this->fields)) {
			$this->fields = Field::query(['form_id' => $this->id])->orderBy('priority', 'ASC')->get();
		}
		return $this->fields;
	}

	public function getFormUrl () {
		return  App::url('@formmaker/form', ['id' => $this->id]);
	}

	/**
	 * {@inheritdoc}
	 */
	public function jsonSerialize () {
		return $this->toArray();
	}

}
