<template>

    <div class="uk-grid pk-grid-large pk-width-sidebar-large" data-uk-grid-margin>
        <div class="pk-width-content uk-form-horizontal">

            <div class="uk-form-row">
                <label for="form-title" class="uk-form-label">{{ 'Title' | trans }}</label>
                <div class="uk-form-controls">
                    <input id="form-title" class="uk-form-width-large" type="text" name="title" v-model="widget.title" v-validate:required>
                    <p class="uk-form-help-block uk-text-danger" v-show="form.title.invalid">{{ 'Title cannot be blank.' | trans }}</p>
                </div>
            </div>

            <div class="uk-form-row">
                <label for="form-link-formmaker" class="uk-form-label">{{ 'Form' | trans }}</label>
                <div class="uk-form-controls">
                    <select id="form-link-formmaker" class="uk-form-width-large" v-model="widget.data.form_id">
                        <option v-for="form in forms" :value="form.id">{{ form.title }}</option>
                    </select>
                </div>
            </div>

            <div class="uk-form-row">
                <span class="uk-form-label">{{ 'Form title' | trans }}</span>

                <div class="uk-form-controls uk-form-controls-text">
                    <label><input type="checkbox" value="hide-title" v-model="widget.data.hide_title"> {{ 'Hide form title' |
                        trans }}</label>
                </div>
            </div>


            <div class="uk-form-row">
                <label for="form-formstyle" class="uk-form-label">{{ 'Form style' | trans }}</label>

                <div class="uk-form-controls">
                    <select id="form-formstyle" class="uk-form-width-large" v-model="widget.data.formStyle">
                        <option value="uk-form-stacked">{{ 'Form stacked' | trans }}</option>
                        <option value="uk-form-horizontal">{{ 'Form horizontal' | trans }}</option>
                    </select>
                </div>
            </div>


        </div>
        <div class="pk-width-sidebar">

            <partial name="settings"></partial>

        </div>
    </div>

</template>

<script>

    module.exports = {

        section: {
            label: 'Settings'
        },

        replace: false,

        props: ['widget', 'config', 'form'],

        data: function () {
            return {
                forms: []
            }
        },

        created: function () {
            this.$options.partials = this.$parent.$options.partials;
            //TODO don't retrieve entire form objects
            this.$resource('api/formmaker/form').get().then(function (res) {
                this.forms = res.data;
                if (res.data.length) {
                    this.widget.data.form_id = this.widget.data.form_id || res.data[0].id;
                }
            });
            this.widget.data = _.assign({form_id: 0, formStyle: 'uk-form-stacked'}, this.widget.data);
        }
    };

    window.Widgets.components['bixie-siteform:settings'] = module.exports;

</script>
