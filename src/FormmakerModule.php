<?php

namespace Bixie\Formmaker;

use Pagekit\Application as App;
use Bixie\Formmaker\Plugin\FormmakerPlugin;
use Pagekit\Module\Module;
use Bixie\Formmaker\Model\Form;
use Bixie\Formmaker\Model\Field;
use Bixie\Formmaker\Type\TypeBase;

class FormmakerModule extends Module {
	/**
	 * @var array
	 */
	protected $types;

	/**
	 * {@inheritdoc}
	 */
	public function main (App $app) {
		$app->subscribe(
			new FormmakerPlugin()
		);

		$app['field'] = function ($app) {
			if ($id = $app['request']->attributes->get('_field') and $field = Form::find($id)) {
				return $field;
			}

			return new Form;
		};
	}

	/**
	 * @param  string $type
	 * @return TypeBase
	 */
	public function getType ($type) {
		$types = $this->getTypes();

		return isset($types[$type]) ? $types[$type] : null;
	}

	/**
	 * @return array
	 */
	public function getTypes () {
		//todo cache this
		if (!$this->types) {

			$this->types = [];
			$app = App::getInstance(); //available for type.php files
			$paths = [];

			foreach (App::module() as $module) {
				if ($module->get('formmakerfields')) {
					$paths = array_merge($paths, glob(sprintf('%s/%s/*/index.php', $module->path, $module->get('formmakerfields')), GLOB_NOSORT) ?: []);
				}
			}

			foreach ($paths as $p) {
				$package = array_merge([
					'id' => '',
					'class' => '\Bixie\Formmaker\Type\Type',
					'resource' => 'bixie/formmaker:app/bundle',
					'config' => [
						'hasOptions' => 0,
						'required' => 0,
						'multiple' => 0,
					],
					'dependancies' => [],
					'styles' => [],
					'getOptions' => '',
					'prepareValue' => '',
					'formatValue' => ''
				], include($p));
				$this->registerType($package);
			}

		}

		return $this->types;
	}

	/**
	 * Register a field type.
	 * @param array $package
	 */
	public function registerType ($package) {
		$this->types[$package['id']] = new $package['class']($package);
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
