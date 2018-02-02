<template>
    <div>
        <div class="uk-modal-spinner" v-if="!loaded"></div>
        <form v-else id="field-edit" class="uk-form"
              name="fieldform" v-validator="form"
              @submit.prevent="save | valid">

            <div class="uk-margin uk-flex uk-flex-space-between uk-flex-wrap" data-uk-margin>
                <div data-uk-margin>

                    <h2 class="uk-margin-remove" v-if="field.id">{{ 'Edit' | trans }} {{ type.label }} <em>{{
                    field.label | trans }}</em></h2>

                    <h2 class="uk-margin-remove" v-if="!field.id">{{ 'Add' | trans }} {{ type.label }} <em>{{
                    field.label | trans }}</em></h2>

                </div>
                <div data-uk-margin>

                    <a class="uk-button uk-margin-small-right uk-modal-close">{{ field.id ? 'Close' :
                    'Cancel' | trans }}</a>
                    <button class="uk-button uk-button-primary" type="submit">{{ 'Save' | trans }}</button>

                </div>
            </div>

            <ul class="uk-tab" data-uk-tab="connect:'#field-edit-switcher'">
                <li><a>{{ type.label | trans }}</a></li>
                <li v-if="type.hasOptions"><a>{{ 'Options' | trans }}</a></li>
                <li><a>{{ 'Appearance' | trans }}</a></li>
            </ul>

            <div id="field-edit-switcher" class="uk-switcher uk-margin">
                <div>
                    <field-basic :field.sync="field" :type.sync="type" :roles="roles" :form="form"></field-basic>
                </div>
                <div v-if="type.hasOptions">
                    <field-options :field.sync="field" :form="form"></field-options>
                </div>
                <div>
                    <field-appearance :field.sync="field" :form="form"></field-appearance>
                </div>
            </div>

        </form>
    </div>


</template>

<script>
import FieldBasic from './field-basic.vue';
import FieldOptions from './field-options.vue';
import FieldAppearance from './field-appearance.vue';

export default {

    name: 'FieldEdit',

    components: {
        'field-basic': FieldBasic,
        'field-options': FieldOptions,
        'field-appearance': FieldAppearance,
    },

    props: {'formitem': Object, 'form': Object, 'fieldid': [Number, String,],},

    data: () => ({
        loaded: false,
        type: {
            label: '',
        },
        field: {
            label: '',
            type: '',
            priority: 0,
            form_id: 0,
            data: {
                value: [],
                data: {},
                classSfx: '',
                help_text: '',
                help_show: '',
            },
        },
        roles: [],
    }),

    created() {
        this.Fields = this.$resource('api/formmaker/field/edit');
        this.Field = this.$resource('api/formmaker/field{/id}');
    },

    ready() {
        this.Fields.query({id: this.fieldid,}).then(res => {
            this.$set('field',res.data.field);
            this.$set('type', res.data.type);
            this.$set('roles', res.data.roles);
            this.field.form_id = this.formitem.id;

            this.loaded = true;
        });
    },

    beforeDestroy() {
        this.$dispatch('close.editmodal');
    },

    methods: {

        save() {

            const data = {field: this.field,};

            this.$broadcast('save', data);

            this.Field.save({id: this.field.id,}, data).then(res => {

                this.$set('field', res.data.field);

                this.$notify(this.$trans('%type% saved.', {type: this.type.label,}));

            }, res => this.$notify(res.data.message || res.data, 'danger'));
        },

        formFieldInvalid(fieldname) {
            console.log(this.$parent);
            console.log(this.$validator.validators);

        },

    },

};

</script>
