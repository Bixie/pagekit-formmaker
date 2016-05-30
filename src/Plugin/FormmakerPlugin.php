<?php

namespace Bixie\Formmaker\Plugin;

use Pagekit\Application as App;
use Pagekit\Content\Event\ContentEvent;
use Pagekit\Event\EventSubscriberInterface;

class FormmakerPlugin implements EventSubscriberInterface
{

    /**
     * Content plugins callback.
     *
     * @param ContentEvent $event
     */
    public function onContentPlugins(ContentEvent $event)
    {
        $event->addPlugin('formmaker', [$this, 'applyPlugin']);
    }

    /**
     * Defines the plugins callback.
     *
     * @param  array $options
     * @return string|null
     */
    public function applyPlugin(array $options)
    {
        if (!isset($options['id'])) {
            return;
        }
		$formmaker = App::module('bixie/formmaker');
		$app = App::getInstance();
		$form_id = $options['id'];
		unset($options['id']);

		try {

			return $formmaker->renderForm($app, $form_id, $options);

		} catch (App\Exception $e) {
			return $e->getMessage();
		}
	}

    /**
     * {@inheritdoc}
     */
    public function subscribe()
    {
        return [
            'content.plugins' => ['onContentPlugins', 25],
        ];
    }
}
