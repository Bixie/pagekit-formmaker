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

    /**
     * @Route("/feed")
     * @Route("/feed/{type}")
     */
    public function feedAction($type = '')
    {
        if (!App::node()->hasAccess(App::user())) {
            App::abort(403, __('Insufficient User Rights.'));
        }

        $site = App::module('system/site');
        $feed = App::feed()->create($type ?: $this->blog->config('feed.type'), [
            'title' => $site->config('title'),
            'link' => App::url('@blog', [], true),
            'description' => $site->config('description'),
            'element' => ['language', App::module('system/locale')->config('locale')],
            'selfLink' => App::url('@blog/feed', [], true)
        ]);

        if ($last = Post::where(['status = ?', 'date < ?'], [Post::STATUS_PUBLISHED, new \DateTime])->limit(1)->orderBy('modified', 'DESC')->first()) {
            $feed->setDate($last->getModified());
        }

        foreach (Post::where(['status = ?', 'date < ?'], [Post::STATUS_PUBLISHED, new \DateTime])->related('user')->limit($this->blog->config('feed.limit'))->orderBy('date', 'DESC')->get() as $post) {
            $feed->addItem(
                $feed->createItem([
                    'title' => $post->title,
                    'link' => App::url('@blog/id', ['id' => $post->id], true),
                    'description' => App::content()->applyPlugins($post->content, ['post' => $post, 'markdown' => $post->get('markdown'), 'readmore' => true]),
                    'date' => $post->date,
                    'author' => [$post->user->name, $post->user->email],
                    'id' => App::url('@blog/id', ['id' => $post->id], true)
                ])
            );
        }

        return App::response($feed->generate(), 200, ['Content-Type' => $feed->getMIMEType()]);
    }
}
