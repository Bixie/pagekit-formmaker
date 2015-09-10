<?php

namespace Pagekit\Formmaker\Console\Commands;

use Pagekit\Application\Console\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class FormmakerTranslateCommand extends Command
{
    /**
     * {@inheritdoc}
     */
    protected $name = 'formmaker:translate';

    /**
     * {@inheritdoc}
     */
    protected $description = 'Generates extension\'s translation .php file from .pot';

    /**
     * {@inheritdoc}
     */
    protected function configure()
    {
        $this->addArgument('locale', InputArgument::OPTIONAL, 'Locale code (en_US)');
    }

    /**
     * {@inheritdoc}
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $locale = $this->argument('locale') ?: 'en_US';
		$extension = 'formmaker';

		$filename = $this->container->path() . '/packages/bixie/'.$extension.'/languages/'.$locale.'/messages.php';
		if (!is_dir(dirname($filename))) {
			mkdir(dirname($filename), 0755, true);
		}
		//get existing translations
		$system = include($this->container->path() . '/app/system/languages/'.$locale.'/messages.php');
		$existing = [];
		if(file_exists($filename)) {
			$existing = include($filename);
		}

		//get strings
		$potString = file_get_contents($this->container->path() . '/packages/bixie/'.$extension.'/languages/messages.pot');
		$potString = str_replace(['\"%', '%\"', '\"'], ["'%", "%'", '_QQ_'], $potString); //avoid nasty regex
		$pattern = '/msgid\s\"(.*?)\"/';
		preg_match_all($pattern, $potString, $matches);

		//create translations
		$translations = [];
		foreach ($matches[1] as $string) {
			$string = str_replace('_QQ_', '"', $string);
			if (!$string || isset($system[$string])) continue;
			$translations[$string] = $locale != 'en_US' && isset($existing[$string])? $existing[$string] : $string;
		}

		// Write translation file
		$content  = sprintf('<?php return %s;', var_export($translations, true));
		file_put_contents($filename, $content);

		$this->line(sprintf("Extension %s: %d strings saved", $extension, count($translations)));

    }

}