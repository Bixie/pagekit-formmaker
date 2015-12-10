<?php

namespace Bixie\Formmaker;

use Pagekit\Application as App;
use Bixie\Formmaker\Plugin\FormmakerPlugin;
use Pagekit\Module\Module;
use Bixie\Formmaker\Model\Form;
use Bixie\Formmaker\Model\Field;

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
	 * @return array
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
			$paths = glob(App::locator()->get('bixie/formmaker:app/fields') . '/*.php', GLOB_NOSORT) ?: [];
			$app = App::getInstance(); //available for type.php files
			foreach ($paths as $p) {
				$package = array_merge([
					'id' => '',
					'hasOptions' => 0,
					'required' => 0,
					'multiple' => 0,
					'dependancies' => [],
					'style' => [],
					'prepareValue' => function (Field $field, $value) {
						return $value;
					},
					'formatValue' => function (Field $field, $value) {
						if (count($field->getOptions())) {
							$options = $field->getOptionsRef();
							if (is_array($value) && count($value)) {
								return array_map(function ($val) use ($options) {
									return isset($options[$val]) ? $options[$val] : $val;
								}, $value);
							} else {
								return $value ? isset($options[$value]) ? [$options[$value]] : [$value] : ['-'];
							}
						} else {
							return is_array($value) ? count($value) ? $value : ['-'] : [$value ?: '-'];
						}
					}
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
		$this->types[$package['id']] = $package;
	}

	public function typeStyles ($styles) {
		//todo this should be prettier
		foreach ($this->getTypes() as $type) {
			if (isset($type['style'])) {
				foreach ($type['style'] as $name => $source) {
					$styles->add($name, $source);
				}
			}
		}
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
