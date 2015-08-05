<?php

namespace Pagekit\Formmaker\Controller;

use Pagekit\Application as App;
use Pagekit\Formmaker\FormmakerExtension;
use Pagekit\Formmaker\Model\Form;

class SiteController
{
    /**
     * @var FormmakerExtension
     */
    protected $formmaker;

    /**
     * Constructor.
     */
    public function __construct()
    {
        $this->formmaker = App::module('formmaker');
    }

    /**
     * @Route("/{id}", name="id")
     */
    public function formAction($id = 0)
    {
        if (!$form = Form::where(['id = ?', 'status = ?'], [$id, 1])->related('fields')->first()) {
            App::abort(404, __('Form not found!'));
        }

		if (!App::node()->hasAccess(App::user())) {
			App::abort(403, __('Insufficient User Rights.'));
		}

		return [
			'$view' => [
				'title' => __($form->title),
				'name' => 'formmaker:views/form.php'
			],
			'$data' => [
				'formitem' => $form,
				'fields' => array_values($form->fields)
			]
		];

    }

}
