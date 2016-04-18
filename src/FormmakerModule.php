<?php

namespace Bixie\Formmaker;

use Bixie\Formmaker\Model\Submission;
use Pagekit\Application as App;
use Bixie\Formmaker\Plugin\FormmakerPlugin;
use Pagekit\Module\Module;
use Bixie\Formmaker\Model\Form;

class FormmakerModule extends Module {
	/**
	 * @var \Bixie\Framework\FrameworkModule
	 */
	protected $framework;
	/**
	 * @var array
	 */
	protected $fieldTypes;

	/**
	 * {@inheritdoc}
	 */
	public function main (App $app) {

		$app->on('boot', function () use ($app) {
			$this->framework = $app->module('bixie/framework');
		});

		$app->subscribe(
			new FormmakerPlugin()
		);

	}

	/**
	 * @param  string $type
	 * @return \Bixie\Framework\FieldType\FieldTypeBase
	 */
	public function getFieldType ($type) {
		$types = $this->getFieldTypes();

		return isset($types[$type]) ? $types[$type] : null;
	}

	/**
	 * @return array
	 */
	public function getFieldTypes () {
		if (!$this->fieldTypes) {
			$this->fieldTypes = $this->framework->getFieldTypes('bixie/formmaker');
		}

		return $this->fieldTypes;
	}

	public function renderForm (App $app, $form_id, $options = [], $view = null) {

		$user = $app->user();
		/** @var Form $form */
		if (!$form = Form::where(['id = ?'], [$form_id])->where(function ($query) use ($user) {
			if (!$user->isAdministrator()) $query->where('status = 1');
		})->related('fields')->first()
		) {
			throw new App\Exception('Form not found', 404) ;
		}
		foreach ($options as $key => $value) {
			$form->set($key, $value);
		}

		$form->prepareView($app, $this);

		return $app->view($view ?: 'bixie/formmaker/form.php');
	}

	/**
	 * public accessable config
	 * @return array
	 */
	public function publicConfig () {
		$config = static::config();
		unset($config['recaptha_secret_key']);
		return $config;
	}
}
