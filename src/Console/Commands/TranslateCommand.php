<?php

namespace Bixie\Formmaker\Console\Commands;

use Pagekit\Application\Console\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class TranslateCommand extends Command
{
    /**
     * {@inheritdoc}
     */
    protected $name = 'formmaker:translate';

	/**
	 * {@inheritdoc}
	 */
	protected $extension = 'formmaker';

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
		$rootpath = $this->container->path();

		$filename = $rootpath . '/packages/bixie/'.$this->extension.'/languages/'.$locale.'/messages.php';
		if (!is_dir(dirname($filename))) {
			mkdir(dirname($filename), 0755, true);
		}
		//get existing translations
		$system = include($rootpath . '/app/system/languages/'.$locale.'/messages.php');
		$existing = [];
		//other packages
		$paths = glob($rootpath . '/packages/bixie/*/languages/'.$locale.'/messages.php', GLOB_NOSORT) ?: [];
		foreach ($paths as $p) {
			if ($p != $filename) {
				$existing = array_merge($existing, include($p));
			}
		}
		//own translations
		if(file_exists($filename)) {
			$existing = array_merge($existing, include($filename));
		}

		//create translations
		$translations = [];
		//insert extra strings
		foreach (['base', 'fields'] as $extra) {
			if (file_exists($rootpath . '/packages/bixie/' . $this->extension . '/languages/' . $extra . '.php')) {
				$extraStrings = include($rootpath . '/packages/bixie/' . $this->extension . '/languages/' . $extra . '.php');
				foreach ($extraStrings as $string) {
					$translations[$string] = $locale != 'en_US' && isset($existing[$string])? $existing[$string] : $string;
				}
			}
		}
		//get pot strings
		$potString = file_get_contents($rootpath . '/packages/bixie/'.$this->extension.'/languages/messages.pot');
		$potString = str_replace(['\"%', '%\"', '\"'], ["'%", "%'", '_QQ_'], $potString); //avoid nasty regex
		$pattern = '/msgid\s\"(.*?)\"/';
		preg_match_all($pattern, $potString, $matches);
		foreach ($matches[1] as $string) {
			$string = str_replace('_QQ_', '"', $string);
			if (!$string || isset($system[$string])) continue;
			$translations[$string] = $locale != 'en_US' && isset($existing[$string])? $existing[$string] : $string;
		}

		// Write translation file
		$content  = sprintf('<?php return %s;', var_export($translations, true));
		file_put_contents($filename, $content);

		$this->line(sprintf("Extension %s: %d strings saved", $this->extension, count($translations)));

	}

}