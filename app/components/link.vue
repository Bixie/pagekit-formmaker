<template>

    <div class="uk-form-row">
        <label for="form-link-formmaker" class="uk-form-label">{{ 'Form' | trans }}</label>
        <div class="uk-form-controls">
            <select id="form-link-formmaker" class="uk-width-1-1" v-model="formid" options="formOptions"></select>
        </div>
    </div>

</template>

<script>

    module.exports = {

        link: {
            label: 'Formmaker'
        },

        props: ['link'],

        data: function () {
            return {
                forms: [],
                formid: ''
            }
        },

        created: function () {
            //TODO don't retrieve entire form objects
            this.$resource('api/formmaker/form').get(function (forms) {
                this.forms = forms;
                if (forms.length) {
                    this.formid = forms[0].id;
                }
            });
        },

        watch: {

            formid: function (formid) {
                this.link = '@formmaker/form?id=' + formid;
            }

        },

        computed: {

            formOptions: function () {
                return _.map(this.forms, function (form) {
                    return {text: form.title, value: form.id};
                });
            }

        }

    };

    window.Links.components['formmaker'] = module.exports;

</script>
