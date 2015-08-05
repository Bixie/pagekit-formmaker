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
            <label for="form-mail-address" class="uk-form-label">{{ 'Default mail address' | trans }}</label>

            <div class="uk-form-controls">
                <input id="form-mail-address" class="uk-form-width-large" type="text" name="fromAddress"
                       v-model="package.config.from_address" v-valid="email">
            </div>
        </div>

        <div class="uk-form-row">
            <label class="uk-form-label">{{ 'Submissions per page' | trans }}</label>
            <div class="uk-form-controls uk-form-controls-text">
                <p class="uk-form-controls-condensed">
                    <input type="number" step="10" v-model="package.config.submissions_per_page" class="uk-form-width-small">
                </p>
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
