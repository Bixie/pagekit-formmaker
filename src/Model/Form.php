<?php

namespace Pagekit\Formmaker\Model;

use Pagekit\Application as App;
use Pagekit\System\Model\DataModelTrait;
use Pagekit\Formmaker\Model\Submission;

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
		'nrActiveSubmissions' => 'getNrActiveSubmissions',
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

	public function getNrActiveSubmissions () {
		if (!$this->id) return 0;
		return App::db()->createQueryBuilder()
			->from('@formmaker_submission')
			->where(['form_id' => $this->id, 'status' => Submission::STATUS_ACTIVE])
			->count();
	}

	public function getFormUrl () {
		return  App::url('@formmaker/front/form', ['id' => $this->id]);
	}

	/**
	 * {@inheritdoc}
	 */
	public function jsonSerialize () {
		$form = $this->toArray();
		if (is_array($form['data'])) {
			unset($form['data']['submitEmail']);
		}
		return $form;
	}

}
