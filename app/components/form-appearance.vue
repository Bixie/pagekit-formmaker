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
                <select id="form-formstyle" class="uk-form-width-large"
                        options="['uk-form-stacked', 'uk-form-horizontal']"
                        v-model="formitem.data.formStyle"></select>
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

    </div>

</template>

<script>

    module.exports = {

        inherit: true

    };

</script>
