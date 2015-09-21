<?php
$view->script('formmaker', 'bixie/formmaker:app/bundle/formmaker.js', ['vue', 'formmaker-formmakerfields']);
?>

<form id="formmaker-form" class="uk-form {{ formitem.data.formStyle }} {{ formitem.data.classSfx }}"
	  name="form" v-on="valid: submit" v-cloak>

	<h1 class="uk-article-title" v-if="!formitem.data.hide_title">{{ formitem.title }}</h1>

	<div class="uk-alert uk-alert-success" v-show="message" data-uk-alert>
		<a href="" class="uk-alert-close uk-close"></a>
		{{ message | trans }}</div>
	<div class="uk-alert uk-alert-danger" v-show="error" data-uk-alert>
		<a href="" class="uk-alert-close uk-close"></a>
		{{ error | trans }}</div>

	<div v-show="thankyou">{{{ thankyou }}}</div>

	<div v-show="!thankyou">
		<formmakerfields fields="{{@ fields}}"></formmakerfields>

		<recaptcha v-ref="grecaptcha" v-if="formitem.data.recaptcha" sitekey="{{ config.recaptha_sitekey }}" formitem="{{ formitem }}"></recaptcha>

		<div class="uk-form-row">
			<button class="uk-button uk-button-primary" type="submit">{{ formitem.data.submitButton | trans }}</button>
		</div>
	</div>

</form>
