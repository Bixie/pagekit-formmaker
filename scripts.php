<?php

return [

    'install' => function ($app) {

		$util = $app['db']->getUtility();

		if ($util->tableExists('@formmaker_field') === false) {
			$util->createTable('@formmaker_field', function ($table) {
				$table->addColumn('id', 'integer', ['unsigned' => true, 'length' => 10, 'autoincrement' => true]);
				$table->addColumn('form_id', 'integer', ['unsigned' => true, 'length' => 10]);
				$table->addColumn('priority', 'integer', ['default' => 0]);
				$table->addColumn('type', 'string', ['length' => 255]);
				$table->addColumn('label', 'string', ['length' => 255]);
				$table->addColumn('slug', 'string', ['length' => 255]);
				$table->addColumn('options', 'json_array', ['notnull' => false]);
				$table->addColumn('roles', 'simple_array', ['notnull' => false]);
				$table->addColumn('data', 'json_array', ['notnull' => false]);
				$table->setPrimaryKey(['id']);
				$table->addIndex(['form_id'], 'FORMMAKER_FIELD_FORMID');
			});
		}

		if ($util->tableExists('@formmaker_form') === false) {
			$util->createTable('@formmaker_form', function ($table) {
				$table->addColumn('id', 'integer', ['unsigned' => true, 'length' => 10, 'autoincrement' => true]);
				$table->addColumn('status', 'smallint');
				$table->addColumn('title', 'string', ['length' => 255]);
				$table->addColumn('slug', 'string', ['length' => 255]);
				$table->addColumn('data', 'json_array', ['notnull' => false]);
				$table->setPrimaryKey(['id']);
			});
		}

		if ($util->tableExists('@formmaker_submission') === false) {
			$util->createTable('@formmaker_submission', function ($table) {
				$table->addColumn('id', 'integer', ['unsigned' => true, 'length' => 10, 'autoincrement' => true]);
				$table->addColumn('status', 'smallint');
				$table->addColumn('form_id', 'integer', ['unsigned' => true, 'length' => 10]);
				$table->addColumn('email', 'string', ['length' => 255, 'notnull' => false]);
				$table->addColumn('ip', 'string', ['length' => 255]);
				$table->addColumn('created', 'datetime');
				$table->addColumn('data', 'json_array', ['notnull' => false]);
				$table->setPrimaryKey(['id']);
			});
		}

    },

    'enable' => function ($app) {
		if (!$app->module('bixie/framework')) {
			if (!$package = $app->package('bixie/framework')) {
				throw new \RuntimeException('Bixie Framework required for Formmaker');
			}
			$app->module()->load($package->get('module'));
			if (!$module = $app->module($package->get('module'))) {
				throw new \RuntimeException('Unable to activate Bixie Framework');
			}
			(new \Pagekit\Installer\Package\PackageManager())->enable($package);
		}
    },

    'uninstall' => function ($app) {

        $util = $app['db']->getUtility();

        if ($util->tableExists('@formmaker_field')) {
            $util->dropTable('@formmaker_field');
        }

        if ($util->tableExists('@formmaker_form')) {
            $util->dropTable('@formmaker_form');
        }

        if ($util->tableExists('@formmaker_submission')) {
            $util->dropTable('@formmaker_submission');
        }

		// remove the config
		$app['config']->remove('bixie/formmaker');

	},

	'updates' => [

		'1.1.0' => function ($app) {
			//convert config to new module name
			$app['config']->set('bixie/formmaker', $app->config('formmaker')->toArray());
			$app['config']->remove('formmaker');
		}

	]

];