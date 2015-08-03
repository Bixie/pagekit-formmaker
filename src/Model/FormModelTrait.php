<?php

namespace Pagekit\Formmaker\Model;

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

    /**
     * @Deleting
     */
    public static function deleting($event, Form $form)
    {
        foreach (self::where('field_id = ?', [$form->id])->get() as $field) {
			$field->delete();
        }
    }
}
