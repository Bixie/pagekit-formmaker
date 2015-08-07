<template>

    <div v-if="isAdmin" class="uk-form-row">
        <label for="form-placeholder" class="uk-form-label">{{ 'Placeholder' | trans }}</label>

        <div class="uk-form-controls">
            <input id="form-placeholder" class="uk-form-width-large" type="text" v-model="field.data.placeholder">
        </div>
    </div>

    <div v-show="isAdmin" class="uk-form-row">
        <label for="form-rows" class="uk-form-label">{{ 'Rows textarea' | trans }}</label>

        <div class="uk-form-controls">
            <input id="form-rows" class="uk-form-width-small uk-text-right" type="number"
                   min="2" v-model="field.data.rows" number>
        </div>
    </div>

    <div v-show="isAdmin" class="uk-form-row">
        <span class="uk-form-label">{{ 'Min / Max length input' | trans }}</span>

        <div class="uk-form-controls uk-flex uk-flex-middle uk-flex-space-between">
            <label for="form-min-length">{{ 'Min' | trans }}</label>
            <input id="form-min-length" class="uk-form-width-small uk-text-right" type="number"
                   min="0" v-model="field.data.minLength" number>
            <label for="form-max-length">{{ 'Max' | trans }}</label>
            <input id="form-max-length" class="uk-form-width-small uk-text-right" type="number"
                   min="0" v-model="field.data.maxLength" number>
        </div>
    </div>

    <div class="uk-form-row {{field.data.classSfx}}">
        <label for="{{ fieldid }}" class="uk-form-label" v-show="!field.data.hide_label">{{ fieldLabel | trans
            }}</label>

        <div class="uk-form-controls">
            <textarea class="uk-form-width-large" placeholder="{{ field.data.placeholder || '' | trans }}"
                   v-attr="name: fieldid, id: fieldid, rows: field.data.rows"
                   v-model="dataObject.value"
                   v-valid="required: fieldRequired"></textarea>

            <p class="uk-form-help-block uk-text-danger" v-show="fieldInvalid(form)">{{ field.data.requiredError ||
                'Please enter a value' | trans }}</p>
        </div>
    </div>

</template>

<script>
    var formmakerfieldMixin = require('../mixins/formmakerfield.js');

    module.exports = {

        inherit: true,

        mixins: [formmakerfieldMixin],

        data: function () {
            return {
                fieldid: _.uniqueId('formmakerfield_')
            };
        },

        created: function () {
            this.$set('dataObject', this.getDataObject(this.field.data.value || ''));
            //defaults admin
            this.field.data.rows = this.field.data.rows || 4;
            this.field.data.minLength = this.field.data.minLength || 0;
            this.field.data.maxLength = this.field.data.maxLength || 0;
        }

    };

    window.Formmakerfields.components['textbox'] = module.exports;

</script>
