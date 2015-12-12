<template>

    <div :class="classes(['uk-form-row'], field.data.classSfx)">
        <label :for="fieldid" class="uk-form-label" v-show="!field.data.hide_label">{{ fieldLabel | trans }}</label>

        <div class="uk-form-controls">
            <textarea v-if="minLength || maxLength" class="uk-form-width-large"
                   placeholder="{{ field.data.placeholder || '' | trans }}"
                   v-bind="{name: fieldid, id: fieldid, rows: field.data.rows}"
                   v-model="dataObject.value"
                   :required="fieldRequired"
                   v-validate:minLength="minLength"
                   v-validate:max="max"></textarea>

            <textarea v-else class="uk-form-width-large"
                   placeholder="{{ field.data.placeholder || '' | trans }}"
                   v-bind="{name: fieldid, id: fieldid, rows: field.data.rows}"
                   v-model="dataObject.value"
                   :required="fieldRequired"></textarea>

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
            },
            'minLength': {
                type: 'number',
                label: 'Min length input',
                attrs: {'class': 'uk-form-width-small uk-text-right', 'min': 0}
            },
            'maxLength': {
                type: 'number',
                label: 'Max length input',
                attrs: {'class': 'uk-form-width-small uk-text-right', 'min': 0}
            }
        },

        appearance: {
            'rows': {
                type: 'number',
                label: 'Rows textarea',
                attrs: {'class': 'uk-form-width-small uk-text-right', 'min': 0}
            }

        },

        data: function () {
            return {
                dataObject: {},
                fieldid: _.uniqueId('formmakerfield_')
            };
        },

        created: function () {
            this.$set('dataObject', this.getDataObject(this.field.data.value || ''));
            //defaults admin
            this.field.data.rows = this.field.data.rows || 4;
            this.field.data.minLength = this.field.data.minLength || 0;
            this.field.data.maxLength = this.field.data.maxLength || 0;
        },

        computed: {
            minLength: function () {
                return this.field.data.minLength && !this.isAdmin ? this.field.data.minLength : false;
            },
            maxLength: function () {
                return this.field.data.maxLength && !this.isAdmin ? this.field.data.maxLength : false;
            }
        }

    };

    window.Formmakerfields.components['textbox'] = module.exports;

</script>
