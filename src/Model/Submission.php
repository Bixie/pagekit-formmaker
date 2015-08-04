<?php

namespace Pagekit\Formmaker\Model;

use Pagekit\Application as App;
use Pagekit\System\Model\DataModelTrait;

/**
 * @Entity(tableClass="@formmaker_submission")
 */
class Submission implements \JsonSerializable {
	use DataModelTrait, SubmissionModelTrait;

	/** @Column(type="integer") @Id */
	public $id;

	/** @Column(type="integer") */
	public $form_id;

	/** @Column(type="string") */
	public $email;

	/** @Column(type="string") */
	public $ip;

	/** @Column(type="datetime") */
	public $created;

	/** @BelongsTo(targetEntity="Form", keyFrom="form_id") */
	public $form;

	/** @var array */
	protected static $properties = [
		'redirect' => 'getRedirect',
		'thankyou' => 'getThankyou'
	];

	public function getRedirect () {
		return $this->form->get('afterSubmit') == 'redirect' ? App::url($this->form->get('redirect'), [], true) : false;
	}

	public function getThankyou () {
		return $this->form->get('afterSubmit') == 'thankyou' ? App::content()->applyPlugins($this->form->get('thankyou'), ['form' => $this->form, 'markdown' => $this->form->get('thankyou_markdown')]) : false;
	}

	/**
	 * {@inheritdoc}
	 */
	public function jsonSerialize () {

		return $this->toArray();
	}

}
