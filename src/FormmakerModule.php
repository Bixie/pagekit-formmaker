<?php

namespace Bixie\Formmaker;

use Bixie\Formmaker\Model\Submission;
use Pagekit\Application as App;
use Bixie\Formmaker\Plugin\FormmakerPlugin;
use Pagekit\Module\Module;
use Bixie\Formmaker\Model\Form;

class FormmakerModule extends Module {
    /**
     * Bixie Framework Module version
     */
    const REQUIRED_FRAMEWORK_VERSION = '0.1.6';
	/**
	 * @var \Bixie\PkFramework\FrameworkModule
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
			$this->framework = $app->module('bixie/pk-framework');
		});

		$app->subscribe(
			new FormmakerPlugin()
		);

	}

	/**
	 * @param  string $type
	 * @return \Bixie\PkFramework\FieldType\FieldTypeBase
	 */
	public function getFieldType ($type) {
		$types = $this->getFieldTypes();

		return isset($types[$type]) ? $types[$type] : null;
	}

	/**
	 * @return array
	 */
	public function getFieldTypes () {
        if (!$this->framework) {
            return [];
        }
		if (!$this->fieldTypes) {
			$this->fieldTypes = $this->framework->getFieldTypes('bixie/formmaker');
		}

		return $this->fieldTypes;
	}

    /**
     * @param App   $app
     * @param int   $form_id
     * @param array $options
     * @param null  $view
     * @return mixed
     */
	public function renderForm (App $app, $form_id, $options = [], $view = null) {

        if (!$this->framework) {
            throw new App\Exception('Bixie Framework Extension required!');
        }
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
		return array_intersect_key(static::config(), array_flip(['recaptha_sitekey']));
	}

    /**
     * @return bool|string
     */
    public function checkFramework () {
        if (!$package = App::package('bixie/pk-framework')) {
            return __('Please install the Bixie Framework.');
        }
        if (!$module = App::module('bixie/pk-framework')) {
            return __('Please enable the Bixie Framework.');
        }
        if (version_compare(self::REQUIRED_FRAMEWORK_VERSION, $package->get('version')) == 1) {
            return __('Please update the Bixie Framework to version %version%.', ['%version%' => self::REQUIRED_FRAMEWORK_VERSION]);
        }
        return true;
    }
}
