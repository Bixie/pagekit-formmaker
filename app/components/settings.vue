<template>

    <div class="uk-form uk-form-horizontal">

        <div class="uk-margin uk-flex uk-flex-space-between uk-flex-wrap" data-uk-margin>
            <div data-uk-margin>

                <h2 class="uk-margin-remove">{{ 'Formmaker Settings' | trans }}</h2>

            </div>
            <div data-uk-margin>

                <button class="uk-button uk-button-primary" @click="save">{{ 'Save' | trans }}</button>

            </div>
        </div>

        <div class="uk-form-row">
            <label for="form-mail-address" class="uk-form-label">{{ 'Default mail address' | trans }}</label>

            <div class="uk-form-controls">
                <input id="form-mail-address" class="uk-form-width-large" type="text" name="fromAddress"
                       v-model="package.config.from_address" v-validate:email>
            </div>
        </div>

        <div class="uk-form-row">
            <label for="form-recaptha_sitekey" class="uk-form-label">{{ 'Google reCAPTCHA sitekey' | trans }}</label>

            <div class="uk-form-controls">
                <input id="form-recaptha_sitekey" class="uk-form-width-large" type="text" name="recaptha_sitekey"
                       v-model="package.config.recaptha_sitekey">
            </div>
        </div>

        <div class="uk-form-row">
            <label for="form-recaptha_secret_key" class="uk-form-label">{{ 'Google reCAPTCHA secret key' | trans }}</label>

            <div class="uk-form-controls">
                <input id="form-recaptha_secret_key" class="uk-form-width-large" type="text" name="recaptha_secret_key"
                       v-model="package.config.recaptha_secret_key">
            </div>
            <p class="uk-form-help-block">
                <a href="https://www.google.com/recaptcha/admin" class="uk-link-muted" target="_blank">
                    <i class="uk-icon-external-link uk-margin-small-right"></i>{{ 'Setup your reCaptcha keys at Google Recaptcha' | trans }}</a>
            </p>
        </div>

        <div class="uk-form-row">
            <label class="uk-form-label">{{ 'Submissions per page' | trans }}</label>
            <div class="uk-form-controls uk-form-controls-text">
                <p class="uk-form-controls-condensed">
                    <input type="number" step="10" v-model="package.config.submissions_per_page" class="uk-form-width-small">
                </p>
            </div>
        </div>

    </div>

</template>

<script>

    module.exports = {

        props: ['package'],

        settings: true,

        methods: {

            save: function () {
                this.$http.post('admin/system/settings/config', {
                    name: 'bixie/formmaker',
                    config: this.package.config
                }, function () {
                    this.$notify('Settings saved.', '');
                }).error(function (data) {
                    this.$notify(data, 'danger');
                }).always(function () {
                    this.$parent.close();
                });
            }

        }

    };

    window.Extensions.components['settings-formmaker'] = module.exports;

</script>
