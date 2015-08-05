<?php

namespace Pagekit\Formmaker\Model;

use Pagekit\Application as App;
use Pagekit\System\Model\DataModelTrait;
use Pagekit\Database\ORM\ModelTrait;
use Pagekit\Formmaker\Submission\Fieldsubmission;
use Pagekit\Formmaker\Submission\MailHelper;

/**
 * @Entity(tableClass="@formmaker_submission")
 */
class Submission implements \JsonSerializable {
	use DataModelTrait, ModelTrait;

	const STATUS_ARCHIVED = 0;
	const STATUS_ACTIVE = 1;
	const STATUS_EXPORTED = 2;

	/** @Column(type="integer") @Id */
	public $id;

	/** @Column(type="integer") */
	public $status;

	/** @Column(type="integer") */
	public $form_id;

	/** @Column(type="string") */
	public $email;

	/** @Column(type="string") */
	public $ip;

	/** @Column(type="datetime") */
	public $created;

	/**
	 * @BelongsTo(targetEntity="Form", keyFrom="form_id")
	 * @var Form
	 */
	public $form;
	/**
	 * @var Fieldsubmission[]
	 */
	public $fieldsubmissions;

	/** @var array */
	protected static $properties = [
		'redirect' => 'getRedirect',
		'thankyou' => 'getThankyou',
		'form_title' => 'getFormtitle'
	];

	public static function getStatuses () {
		return [
			self::STATUS_ACTIVE => __('Active'),
			self::STATUS_EXPORTED => __('Exported'),
			self::STATUS_ARCHIVED => __('Archived')
		];
	}

	public function getRedirect () {
		return $this->form->get('afterSubmit') == 'redirect' ? App::url($this->form->get('redirect'), [], true) : false;
	}

	public function getFormtitle () {
		return $this->form->title;
	}

	public function getThankyou () {
		if ($this->form->get('afterSubmit') == 'thankyou') {
			$thankyou = (new MailHelper($this))->replaceString($this->form->get('thankyou'));;
			return App::content()->applyPlugins($thankyou, ['submission' => $this, 'markdown' => $this->form->get('thankyou_markdown')]);
		}
		return '';
	}

	public function getUserEmail () {
		//todo
		return '';
	}

	public function setFieldsubmissions () {
		if (!isset($this->fieldsubmissions)) {
			$fields = $this->form->getFields();
			foreach ($this->data as $submissionvalue) {

				if (isset($fields[$submissionvalue['field_id']])) {

					$field = $fields[$submissionvalue['field_id']];

				} else {

					//field might be deleted from form
					$field = Field::create();
					$field->setType($submissionvalue['type']);
				}

				$this->fieldsubmissions[$field->slug] = (new Fieldsubmission($field, $submissionvalue))->toFormattedArray();
			}
		}
		return $this->fieldsubmissions;
	}

	/**
	 * {@inheritdoc}
	 */
	public function jsonSerialize () {
		return $this->toArray();
	}

}
