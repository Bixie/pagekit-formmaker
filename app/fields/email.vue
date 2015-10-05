<template>

    <div v-if="isAdmin" class="uk-form-row">
        <label for="form-placeholder" class="uk-form-label">{{ 'Placeholder' | trans }}</label>

        <div class="uk-form-controls">
            <input id="form-placeholder" class="uk-form-width-large" type="text" v-model="field.data.placeholder">
        </div>
    </div>

    <div v-if="isAdmin" class="uk-form-row">
        <span class="uk-form-label">{{ 'Submission email' | trans }}</span>

        <div class="uk-form-controls uk-form-controls-text">
            <label><input type="checkbox" value="required" v-model="field.data.user_email">
                {{ 'Send submission confirmation to this address' | trans }}</label>
        </div>
    </div>

    <div class="uk-form-row {{field.data.classSfx || ''}}">
        <label for="{{ fieldid }}" class="uk-form-label" v-show="!field.data.hide_label">{{ fieldLabel | trans
            }}</label>

        <div class="uk-form-controls">
            <input type="email" class="uk-form-width-large" placeholder="{{ field.data.placeholder || '' | trans }}"
                   v-attr="name: fieldid, id: fieldid"
                   v-model="dataObject.value"
                   v-validate="required: fieldRequired"/>

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
        },

        watch: {
            'field.data.user_email': function (value) {
                this.formitem.data.user_email_field = value ? this.field.slug: false;
            }
        }

    };

    window.Formmakerfields.components['email'] = module.exports;

</script>
