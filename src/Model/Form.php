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
	 * {@inheritdoc}
	 */
	public function jsonSerialize () {
		return $this->toArray();
	}

}
