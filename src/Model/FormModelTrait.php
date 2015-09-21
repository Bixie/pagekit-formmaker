<?php

namespace Bixie\Formmaker\Model;

use Pagekit\Application as App;
use Pagekit\Database\ORM\ModelTrait;

trait FormModelTrait
{
    use ModelTrait;

    /**
     * @Saving
     */
    public static function saving($event, Form $form)
    {

        $i  = 2;
        $id = $form->id;

        if (!$form->slug) {
            $form->slug = $form->title;
        }

        while (self::where(['slug = ?'], [$form->slug])->where(function ($query) use ($id) {
            if ($id) $query->where('id <> ?', [$id]);
        })->first()) {
            $form->slug = preg_replace('/-\d+$/', '', $form->slug).'-'.$i++;
        }

    }

}
