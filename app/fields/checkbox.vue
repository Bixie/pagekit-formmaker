<template>

    <div class="uk-form-row {{field.data.classSfx}}">
        <span class="uk-form-label" v-show="!field.data.hide_label">{{ fieldLabel | trans }}</span>

        <div class="uk-form-controls uk-form-controls-text">
            <p v-repeat="option: field.options" class="uk-form-controls-condensed">
                <label><input type="checkbox" value="{{ option.value }}"
                              v-checkbox="dataObject.value"> {{ option.text }}</label>
            </p>
            <p class="uk-form-help-block uk-text-danger" v-show="fieldInvalid(form)">{{ field.data.requiredError ||
                'Please select a value' | trans }}</p>
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
            this.$set('dataObject', this.getDataObject(this.field.data.value || []));
        }

    };

    window.Formmakerfields.components['checkbox'] = module.exports;

</script>
