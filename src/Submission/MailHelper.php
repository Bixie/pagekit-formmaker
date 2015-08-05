<?php

namespace Pagekit\Formmaker\Submission;

use Pagekit\Application as App;
use Pagekit\Application\Exception;
use Pagekit\Formmaker\Model\Submission;

class MailHelper {

	/**
	 * @var Submission
	 */
	protected $submission;

	/**
	 * MailHelper constructor.
	 * @param Submission $submission
	 */
	public function __construct (Submission $submission) {
		$this->submission = $submission;
	}

	/**
	 * @return string
	 */
	public function sendMail () {
		if (!$adminMail = $this->submission->form->get('submitEmail')) {
			return '';
		}
		$userMail = '';
		$mailSubject = $this->replaceString($this->submission->form->get('email_subject'));
		$mailBody = $this->replaceString($this->submission->form->get('email_body'));
		$mailBody = App::content()->applyPlugins($mailBody, ['submission' => $this->submission, 'markdown' => $this->submission->form->get('email_body_markdown')]);
		try {

			$mail = App::mailer()->create();
			$mail->setTo($adminMail)->setSubject($mailSubject)->setBody(App::view('formmaker:views/mails/template.php', compact('mailBody')), 'text/html')->send();

			if ($userMail) {

				$mail = App::mailer()->create();
				$mail->setTo($userMail)->setSubject($mailSubject)->setBody(App::view('formmaker:views/mails/template.php', compact('mailBody')), 'text/html')->send();
			}

		} catch (\Exception $e) {
			throw new Exception(__('Unable to send confirmation mail.'));
		}

		return $userMail;
	}

	public function replaceString ($string, $arraySeparator = ', ') {
		if (!$this->submission->fieldsubmissions) {
			$this->submission->setFieldsubmissions();
		}
		$string = preg_replace_callback('/\$\$(.+?)\$\$/is', function($matches) use ($arraySeparator) {
			$placeholder = explode(':', trim($matches[1]), 2);
			if (empty($placeholder[1])
				|| !isset($this->submission->fieldsubmissions[$placeholder[0]])
				|| !isset($this->submission->fieldsubmissions[$placeholder[0]][$placeholder[1]])) {
				return '';
			}
			return is_array($this->submission->fieldsubmissions[$placeholder[0]][$placeholder[1]]) ?
				implode($arraySeparator, $this->submission->fieldsubmissions[$placeholder[0]][$placeholder[1]]) :
				$this->submission->fieldsubmissions[$placeholder[0]][$placeholder[1]];
		}, $string);

		return $string;
	}

}