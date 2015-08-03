<?php
$view->script('formmaker', 'formmaker:app/bundle/formmaker.js', ['vue', 'formmaker-formmakerfields', 'uikit-form-password']);
?>

<form id="formmaker-profile" class="uk-article uk-form uk-form-stacked" name="form" v-on="valid: save">
	<div class="uk-grid">
		<div class="uk-width-medium-3-4">
			<h1 class="uk-article-title">{{ 'Your Profile' | trans }}</h1>

			<div class="uk-alert uk-alert-success" v-show="message">{{ message }}</div>
			<div class="uk-alert uk-alert-danger" v-show="error">{{ error }}</div>

			<div class="uk-form-row">
				<label for="form-name" class="uk-form-label">{{ 'Name' | trans }}</label>

				<div class="uk-form-controls">
					<input id="form-name" class="uk-form-width-large" type="text" name="name" v-model="user.name"
						   v-valid="required">

					<p class="uk-form-help-block uk-text-danger" v-show="form.name.invalid">{{ 'Name cannot be blank.' |
						trans }}</p>
				</div>
			</div>

			<div class="uk-form-row">
				<label for="form-email" class="uk-form-label">{{ 'Email' | trans }}</label>

				<div class="uk-form-controls">
					<input id="form-email" class="uk-form-width-large" type="text" name="email" v-model="user.email"
						   v-valid="email, required">

					<p class="uk-form-help-block uk-text-danger" v-show="form.email.invalid">{{ 'Invalid Email.' | trans
						}}</p>
				</div>
			</div>

			<div class="uk-form-row">
				<a href="#" data-uk-toggle="{ target: '.js-password' }">{{ 'Change password' | trans }}</a>
			</div>

			<div class="uk-form-row js-password uk-hidden">
				<label for="form-password-old" class="uk-form-label">{{ 'Current Password' | trans }}</label>

				<div class="uk-form-controls">
					<div class="uk-form-password">
						<input id="form-password-old" class="uk-form-width-large" type="password" value=""
							   v-model="user.password_old">
						<a href="" class="uk-form-password-toggle"
						   data-uk-form-password="{ lblShow: '{{ 'Show' | trans }}', lblHide: '{{ 'Hide' | trans }}' }">{{
							'Show' | trans }}</a>
					</div>
				</div>
			</div>

			<div class="uk-form-row js-password uk-hidden">
				<label for="form-password-new" class="uk-form-label">{{ 'New Password' | trans }}</label>

				<div class="uk-form-controls">
					<div class="uk-form-password">
						<input id="form-password-new" class="uk-form-width-large" type="password" value=""
							   v-model="user.password_new">
						<a href="" class="uk-form-password-toggle"
						   data-uk-form-password="{ lblShow: '{{ 'Show' | trans }}', lblHide: '{{ 'Hide' | trans }}' }">{{
							'Show' | trans }}</a>
					</div>
				</div>
			</div>

			<formmakerfields forms="{{@ forms}}"></formmakerfields>

			<div class="uk-form-row">
				<button class="uk-button uk-button-primary" type="submit">{{ 'Save' | trans }}</button>
			</div>

		</div>
		<div class="uk-width-medium-1-4">

			<div class="uk-panel uk-panel-box uk-text-center" v-show="user.username">

				<div class="uk-panel-teaser">
					<img height="280" width="280" v-attr="alt: user.username" v-gravatar="user.email">
				</div>

				<h3 class="uk-panel-title uk-margin-bottom-remove">{{ user.username }}</h3>

			</div>

		</div>
	</div>

</form>
