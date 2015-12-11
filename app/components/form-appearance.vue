<template>

    <div class="uk-form-horizontal">

        <div class="uk-form-row">
            <span class="uk-form-label">{{ 'Title' | trans }}</span>

            <div class="uk-form-controls uk-form-controls-text">
                <label><input type="checkbox" value="hide-title" v-model="formitem.data.hide_title"> {{ 'Hide Title' |
                    trans }}</label>
            </div>
        </div>

        <div class="uk-form-row">
            <label for="form-formstyle" class="uk-form-label">{{ 'Form style' | trans }}</label>

            <div class="uk-form-controls">
                <select id="form-formstyle" class="uk-form-width-large" v-model="formitem.data.formStyle">
                    <option value="uk-form-stacked">{{ 'Form stacked' | trans }}</option>
                    <option value="uk-form-horizontal">{{ 'Form horizontal' | trans }}</option>
                </select>
            </div>
        </div>

        <div class="uk-form-row">
            <label for="form-class" class="uk-form-label">{{ 'Class suffix' | trans }}</label>

            <div class="uk-form-controls">
                <input id="form-class" class="uk-form-width-large" type="text" v-model="formitem.data.classSfx">
            </div>
        </div>

        <div class="uk-form-row">
            <label for="form-submit-button" class="uk-form-label">{{ 'Text submit button' | trans }}</label>

            <div class="uk-form-controls">
                <input id="form-submit-button" class="uk-form-width-large" type="text" v-model="formitem.data.submitButton">
            </div>
        </div>

        <div class="uk-form-row" v-show="formitem.data.required">
            <label for="form-required-error" class="uk-form-label">{{ 'Required error message' | trans }}</label>

            <div class="uk-form-controls">
                <input id="form-required-error" class="uk-form-width-large" type="text"
                       v-model="formitem.data.requiredError">
            </div>
        </div>

        <div class="uk-margin" v-show="formitem.data.recaptcha">
            <div class="uk-form-row">
                <label for="form-recaptcha_label" class="uk-form-label">{{ 'reCAPTCHA label' | trans }}</label>

                <div class="uk-form-controls">
                    <input id="form-recaptcha_label" class="uk-form-width-large" type="text" name="recaptcha_label"
                           v-model="formitem.data.recaptcha_label" placeholder="{{ 'Empty for no label' | trans }}">
                </div>
            </div>

            <div class="uk-form-row">
                <label for="form-recaptcha_label" class="uk-form-label">{{ 'reCAPTCHA setup' | trans }}</label>

                <div class="uk-form-controls">
                    <select class="uk-form-width-small" v-model="formitem.data.recaptcha_theme">
                        <option v-for="option in recaptcha_themes" :value="option.value">{{ option.text }}</option>
                    </select>
                    <select class="uk-form-width-small" v-model="formitem.data.recaptcha_type">
                        <option v-for="option in recaptcha_types" :value="option.value">{{ option.text }}</option>
                    </select>
                    <select class="uk-form-width-small" v-model="formitem.data.recaptcha_size">
                        <option v-for="option in recaptcha" :value="option.value">{{ option.text }}</option>
                    </select>
                </div>
            </div>

        </div>

    </div>

</template>

<script>

    module.exports = {

        props: ['formitem', 'form'],

        data: function () {
            return {
                recaptcha_themes: [
                    {value: '', text: this.$trans('- Style -')},
                    {value: 'light', text: this.$trans('Light')},
                    {value: 'dark', text: this.$trans('Dark')}
                ],
                recaptcha_types: [
                    {value: '', text: this.$trans('- Type -')},
                    {value: 'image', text: this.$trans('Image')},
                    {value: 'audio', text: this.$trans('Audio')}
                ],
                recaptcha_sizes: [
                    {value: '', text: this.$trans('- Size -')},
                    {value: 'normal', text: this.$trans('Normal')},
                    {value: 'compact ', text: this.$trans('Compact')}
                ]
            }
        },

        created: function () {
            this.formitem.data.recaptcha_theme =  this.formitem.data.recaptcha_theme || '';
            this.formitem.data.recaptcha_type =  this.formitem.data.recaptcha_type || '';
            this.formitem.data.recaptcha_size =  this.formitem.data.recaptcha_size || '';
        }

    };

</script>
