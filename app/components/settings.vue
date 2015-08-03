<template>

    <div class="uk-form uk-form-horizontal">

        <div class="uk-margin uk-flex uk-flex-space-between uk-flex-wrap" data-uk-margin>
            <div data-uk-margin>

                <h2 class="uk-margin-remove">{{ 'Formmaker Settings' | trans }}</h2>

            </div>
            <div data-uk-margin>

                <button class="uk-button uk-button-primary" v-on="click: save">{{ 'Save' | trans }}</button>

            </div>
        </div>

        <div class="uk-form-row">
            <span class="uk-form-label">{{ 'Redirect' | trans }}</span>

            <div class="uk-form-controls uk-form-controls-text">
                <label><input type="checkbox" value="override_registration" v-model="package.config.override_registration">
                    {{ 'Redirect Pagekit registration page' | trans }}</label>
            </div>
        </div>

    </div>

</template>

<script>

    module.exports = {

        props: ['package'],

        settings: true,

        methods: {

            save: function () {
                this.$http.post('admin/system/settings/config', {
                    name: this.package.name.replace('pagekit/', ''),
                    config: this.package.config
                }, function () {
                    UIkit.notify(this.$trans('Settings saved.'), '');
                }).error(function (data) {
                    UIkit.notify(data, 'danger');
                }).always(function () {
                    this.$parent.close();
                });
            }

        }

    };

    window.Extensions.components['settings-formmaker'] = module.exports;

</script>
