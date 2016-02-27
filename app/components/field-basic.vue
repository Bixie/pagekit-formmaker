<template>

    <div class="uk-margin">

        <div class="uk-grid">
            <div class="uk-width-medium-3-4 uk-form-horizontal">

                <partial name="fieldtype-basic"></partial>

                <fieldtypes class="uk-margin" v-show="!type.hasOptions || field.options.length"
                            v-ref:fieldtypes
                            :edit-type="field.type"
                            :fields="[field]"
                            :field.sync="field"
                            :form="form"></fieldtypes>

                <div id="type-settings" class="uk-margin"
                     :data-object.sync="field.data"
                     :field.sync="field"
                     :form="form"></div>

            </div>
            <div class="uk-width-medium-1-4 uk-form-stacked">

                <partial name="fieldtype-settings"></partial>

            </div>
        </div>

    </div>

</template>

<script>

    module.exports = {

        props: ['field', 'type', 'roles', 'form'],

        computed: {
            fieldSettings: function () {
                var settings = this.field.type ? BixieFieldtypes.components[this.field.type].settings || BixieFieldtypes.components[this.field.type].options.settings : {},
                        parent = this;
                if (settings.template !== undefined) {
                    new Vue(_.merge({
                        'el': '#type-settings',
                        'name': 'type-settings',
                        'parent': parent,
                        'data': _.merge({
                            'field': parent.field,
                            'form': parent.form
                        }, settings.data),
                    }, settings));
                    return false;
                }
                return settings;
            }
        }

    };
</script>
