<?php

namespace Bixie\Formmaker\Type;


use Bixie\Formmaker\Model\Field;

interface TypeInterface  {

	/**
	 * @return string
	 */
	public function getLabel ();

	/**
	 * @param Field $field
	 * @param array $value
	 * @return array
	 */
	public function prepareValue (Field $field, $value);

	/**
	 * @param Field $field
	 * @param array $value
	 * @return array
	 */
	public function formatValue (Field $field, $value);

	/**
	 * @param \Pagekit\View\Asset\AssetManager $scripts
	 */
	public function registerScripts ($scripts);

	/**
	 * @param \Pagekit\View\Asset\AssetManager $styles
	 */
	public function addStyles ($styles);

	/**
	 * @return array
	 */
	public function toArray();
}