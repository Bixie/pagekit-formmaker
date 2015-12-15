<template>

    <div :class="classes(['uk-form-row'], field.data.classSfx)">
        <label :for="fieldid" class="uk-form-label" v-show="!field.data.hide_label">{{ fieldLabel | trans }}</label>

        <div class="uk-form-controls">
            <input type="email" class="uk-form-width-large" placeholder="{{ field.data.placeholder || '' | trans }}"
                   :name="fieldid" :id="fieldid"
                   v-model="dataObject.value"
                   v-validate:required="fieldRequired" v-validate:email/>

            <p class="uk-form-help-block uk-text-danger" v-show="fieldInvalid(form)">{{ field.data.requiredError ||
                'Please enter a value' | trans }}</p>
        </div>
    </div>

</template>

<script>

    module.exports = {

        mixins: [FormmakerfieldMixin],

        settings: {
            'placeholder': {
                type: 'text',
                label: 'Placeholder',
                attrs: {'class': 'uk-form-width-large'}
            }
        },

        appearance: {},

        data: function () {
            return {
                dataObject: {},
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
