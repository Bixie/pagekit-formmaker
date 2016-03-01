<?php
/**
 * Create .pot file:
 *  `php ./pagekit extension:translate bixie/formmaker`
 * Create .php files
 *  `php ./pagekit formmaker:translate [en_US]`
 */
namespace Bixie\Formmaker\Console\Commands;

use Pagekit\Application\Console\Command;
use Symfony\Component\Console\Helper\ProgressBar;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Finder\Finder;

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
				$this->line(sprintf("Add %s", $p));
				$existing = array_merge($existing, include($p));
			}
		}
		//own translations
		if(file_exists($filename)) {
			$existing = array_merge($existing, include($filename));
		}

		//create translations
		$translations = [];
		//get fieldtypes strings
		$this->getFieldStrings($translations);
		//insert extra strings
		if (file_exists($rootpath . '/packages/bixie/' . $this->extension . '/languages/base.php')) {
			$extraStrings = include($rootpath . '/packages/bixie/' . $this->extension . '/languages/base.php');
			foreach ($extraStrings as $string) {
				$translations[$string] = $locale != 'en_US' && isset($existing[$string])? $existing[$string] : $string;
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
		asort($translations);
		// Write translation file
		$content  = sprintf('<?php return %s;', var_export($translations, true));
		file_put_contents($filename, $content);

		$this->line(sprintf("Extension %s: %d strings saved", $this->extension, count($translations)));

	}

	/**
	 * @param $translations
	 */
	protected function getFieldStrings (&$translations) {

		$files = Finder::create()->files();
		$settingsPath = $this->container->path() . '/packages/bixie/' . $this->extension . '/app/settings';
		$fieldtypesPath = $this->container->path() . '/packages/bixie/' . $this->extension . '/fieldtypes';
		if (is_dir($settingsPath)) {
			$files->in($settingsPath);
		}
		if (is_dir($fieldtypesPath)) {
			$files->in($fieldtypesPath);
		}

		$fieldfiles = $files->name('*.{vue,js}');
		if (!$count = count($fieldfiles)) {
			return;
		}
		$this->line("Traversing field files.");
		$i = 0;

		$progress = new ProgressBar($this->output, $count);
		$progress->start();
		foreach ($fieldfiles as $fieldfile) {
			$content = file_get_contents($fieldfile);

			// field matches (optionlabel|label|title|tip): 'foo',
			preg_match_all('/\s.(?:optionlabel|label|title|tip)(\:\s*)(\'|")((?:(?!\2).)+)\2\s*/', $content, $matches);
			foreach ($matches[3] as $string) {
				$translations[$string] = $string;
				$i++;
			}

			// options matches 'foo': 'value', /*trans*/
			preg_match_all('/(\'|")((?:(?!\1).)+)\1(\:\s*),*\s*(\'|")((?:(?!\4).)+)\4,?\s*\/\*trans\*\//', $content, $matches);
			foreach ($matches[2] as $string) {
				$translations[$string] = $string;
				$i++;
			}
			$progress->advance();
		}

		$progress->finish();
		$this->line("\n");
		$this->line(sprintf("%d strings added from fields", $i));
		$this->line("\n");
	}

}