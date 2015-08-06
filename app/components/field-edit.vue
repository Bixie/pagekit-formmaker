<template>
    <div class="uk-modal-spinner" v-if="!loaded"></div>
    <form id="field-edit" class="uk-form" name="form" v-on="valid: save" v-show="loaded">

        <div class="uk-margin uk-flex uk-flex-space-between uk-flex-wrap" data-uk-margin>
            <div data-uk-margin>

                <h2 class="uk-margin-remove" v-if="field.id">{{ 'Edit' | trans }} {{ type.label }} <em>{{
                    field.label | trans}}</em></h2>

                <h2 class="uk-margin-remove" v-if="!field.id">{{ 'Add' | trans }} {{ type.label }} <em>{{
                    field.label | trans}}</em></h2>

            </div>
            <div data-uk-margin>

                <a class="uk-button uk-margin-small-right uk-modal-close">{{ field.id ? 'Close' :
                    'Cancel' | trans }}</a>
                <button class="uk-button uk-button-primary" type="submit">{{ 'Save' | trans }}</button>

            </div>
        </div>

        <ul class="uk-tab" v-el="tab">
            <li><a>{{ type.label | trans }}</a></li>
            <li v-show="type.hasOptions"><a>{{ 'Options' | trans }}</a></li>
            <li><a>{{ 'Appearance' | trans }}</a></li>
        </ul>

        <div class="uk-switcher uk-margin" v-el="content">
            <div>
                <fieldbasic field="{{@ field }}"></fieldbasic>
                <div class="uk-form-horizontal uk-margin" v-show="!type.hasOptions || field.options.length">
                    <formmakerfields edit-field="{{@ field.type }}"></formmakerfields>
                </div>
            </div>
            <div>
                <fieldoptions v-show="type.hasOptions" field="{{@ field }}"></fieldoptions>
            </div>
            <div>
                <appearance field="{{@ field }}"></appearance>
            </div>
        </div>

    </form>

</template>

<script>

    module.exports = {
        data: function () {
            return {
                loaded: false,
                type: {
                    label: ''
                },
                field: {
                    label: '',
                    form_id: 0,
                    data: {}
                }
            };
        },

        props: ['formitem', 'fieldid'],

        created: function () {
            this.Fields = this.$resource('api/formmaker/field/edit');
            this.Field = this.$resource('api/formmaker/field/:id');
        },

        ready: function () {
            this.Fields.query({id: this.fieldid}, function (data) {
                this.$set('field', data.field);
                this.$set('type', data.type);
                this.$set('roles', data.roles);
                this.field.form_id = this.formitem.id;

                UIkit.tab(this.$$.tab, {connect: this.$$.content});
                this.loaded = true;
            });


        },

        beforeDestroy: function () {
            this.$dispatch('close.editmodal');
        },

        methods: {

            save: function (e) {

                e.preventDefault();

                var data = {field: this.field};

                this.$broadcast('save', data);

                this.Field.save({id: this.field.id}, data, function (data) {

                    this.$set('field', data.field);

                    UIkit.notify(this.$trans('%type% saved.', {type: this.type.label}));

                }, function (data) {
                    UIkit.notify(data, 'danger');
                });
            }

        },

        components: {

            fieldbasic: require('./field-basic.vue'),
            fieldoptions: require('./field-options.vue'),
            appearance: require('./field-appearance.vue')

        }

    };

</script>
