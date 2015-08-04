<?php

namespace Pagekit\Formmaker;

use Pagekit\Application as App;
use Pagekit\Module\Module;
use Pagekit\Formmaker\Model\Form;

class FormmakerExtension extends Module {
	/**
	 * @var array
	 */
	protected $types;

	/**
	 * {@inheritdoc}
	 */
	public function main (App $app) {
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
			$paths = glob(App::locator()->get('formmaker:app/fields') . '/*.json', GLOB_NOSORT) ?: [];

			foreach ($paths as $p) {
				$package = json_decode(file_get_contents($p), true);
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
		$package['label'] = __($package['id']);
		$this->types[$package['id']] = $package;
	}
}
