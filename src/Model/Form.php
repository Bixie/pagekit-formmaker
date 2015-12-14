<?php

namespace Bixie\Formmaker\Model;

use Pagekit\Application as App;
use Pagekit\System\Model\DataModelTrait;
use Bixie\Formmaker\Model\Submission;

/**
 * @Entity(tableClass="@formmaker_form",eventPrefix="formmaker")
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
			$fields = Field::query(['form_id' => $this->id])->orderBy('priority', 'ASC')->get();
		} else {
			$fields = $this->fields;
		}
		//make sure type exists
		$formmaker = App::module('bixie/formmaker');
		$this->fields = [];
		foreach ($fields as $field) {
			if ($formmaker->getType($field->type)) {
				$this->fields[] = $field;
			}
		}
		return $this->fields;
	}

	public function getNrActiveSubmissions () {
		if (!$this->id || !App::user()->isAdministrator()) return 0;
		return App::db()->createQueryBuilder()
			->from('@formmaker_submission')
			->where(['form_id' => $this->id, 'status' => Submission::STATUS_ACTIVE])
			->count();
	}

	public function getFormUrl () {
		if (!$this->id) return '';
		return  App::url('@formmaker/form/front', ['id' => $this->id]);
	}

	/**
	 * Prepare form for display
	 * @param App $app
	 * @param \Bixie\Formmaker\FormmakerModule $formmaker
	 */
	public function prepareView ($app, $formmaker) {
		if ($this->get('recaptcha') && $formmaker->config('recaptha_secret_key')) {
			$app->on('view.footer', function ($event) {
				$event->addResult('<script src="https://www.google.com/recaptcha/api.js?onload=grecacapthaCallback&render=explicit" async defer></script>');
			});
		}
		$app->on('view.styles', function ($event, $styles) use ($formmaker) {
			foreach ($this->getFields() as $field) {
				$formmaker->getType($field->type)->addStyles($styles);
			}
		});


	}
	/**
	 * {@inheritdoc}
	 */
	public function jsonSerialize () {
		$form = $this->toArray();
		if (is_array($form['data']) && !App::user()->isAdministrator()) {
			unset($form['data']['submitEmail']);
		}
		return $form;
	}

}
