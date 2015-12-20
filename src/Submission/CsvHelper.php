<?php

namespace Bixie\Formmaker\Submission;

use Pagekit\Application as App;
use Pagekit\Util\ArrObject;
use Bixie\Formmaker\Model\Form;
use Bixie\Formmaker\Model\Submission;

class CsvHelper {

	const CSV_SEPARATOR = ';';

	const CSV_ENCLOSER = '';

	const CSV_VALUESEP = ',';

	const CSV_NEWLINE = "\n";

	/**
	 * @var Submission[]
	 */
	protected $submissions;

	/**
	 * @var Form
	 */
	protected $form;

	/**
	 * @var ArrObject
	 */
	protected $options;

	/**
	 * CsvHelper constructor.
	 * @param Submission[] $submissions
	 * @param  Form        $form
	 * @param  ArrObject   $options
	 */
	public function __construct ($submissions, $form, ArrObject $options) {
		$this->submissions = $submissions;
		$this->form = $form;
		$this->form->fields = $form->getFields();
		$this->options = $options;
	}

	/**
	 * @return string
	 */
	public function toCsv () {
		$output = [$this->getHeaders()];
		foreach ($this->submissions as $submission) {
			$submission->form = $this->form;
			if (!$submission->fieldsubmissions) {
				$submission->getFieldsubmissions();
			}
			$arrData = $submission->toArray();
			$data = [];
			//todo error checking and cleaning values
			foreach ($this->options->get('datafields', []) as $datafield) {
				$data[] = $arrData[$datafield];
			}
			foreach ($this->options->get('field_ids', []) as $field_id) {
				if (isset($this->form->fields[$field_id])) {
					$slug = $this->form->fields[$field_id]->slug;
					$data[] = implode(self::CSV_VALUESEP, isset($arrData['fieldsubmissions'][$slug]) ? $arrData['fieldsubmissions'][$slug]['value'] : []);
				} else {
					//try to add data non-existing fieldtype
					$data[] = implode(self::CSV_VALUESEP, $submission->get($field_id) ?: []);
				}
			}

			$output[] = $this->csvString($data);
		}

		return implode(self::CSV_NEWLINE, $output);
	}

	/**
	 * @return string
	 */
	protected function getHeaders () {
		$headers = [];
		foreach ($this->options->get('datafields', []) as $datafield) {
			$headers[] = __($datafield);
		}
		//todo error checking
		foreach ($this->options->get('field_ids', []) as $field_id) {
			$headers[] = isset($this->form->fields[$field_id]) ? __($this->form->fields[$field_id]->label) : "Field $field_id";
		}
		return $this->csvString($headers);
	}

	/**
	 * @return string
	 */
	protected function csvString ($data) {
		return self::CSV_ENCLOSER . implode(self::CSV_ENCLOSER . self::CSV_SEPARATOR . self::CSV_ENCLOSER, $data) . self::CSV_ENCLOSER;
	}

}