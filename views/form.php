<?php
$view->script('formmaker', 'bixie/formmaker:app/bundle/formmaker.js', ['bixie-fieldtypes']);
?>

<form id="formmaker-form" class="uk-form {{ formitem.data.formStyle }} {{ formitem.data.classSfx }}"
	  v-validator="form" @submit.prevent="save | valid" v-cloak>

	<h1 class="uk-article-title" v-if="!formitem.data.hide_title">{{ formitem.title }}</h1>

	<div class="uk-alert uk-alert-success" v-if="message" data-uk-alert>
		<a href="" class="uk-alert-close uk-close"></a>
		{{ message | trans }}</div>
	<div class="uk-alert uk-alert-danger" v-if="error" data-uk-alert>
		<a href="" class="uk-alert-close uk-close"></a>
		{{ error | trans }}</div>


	<div v-if="!thankyou">
		<fieldtypes :fields="fields"
					:model.sync="submission.data"
					:form="form"></fieldtypes>

		<recaptcha v-ref:grecaptcha v-if="formitem.data.recaptcha" :sitekey="config.recaptha_sitekey" :formitem="formitem" class="uk-margin"></recaptcha>

		<div class="uk-margin">
			<button class="uk-button uk-button-primary" type="submit">{{ formitem.data.submitButton | trans }}</button>
		</div>
	</div>
	<div v-else>{{{ thankyou }}}</div>

</form>
