<template>

    <div class="uk-margin">

        <div class="uk-grid">
            <div class="uk-width-medium-3-4 uk-form-horizontal">
                <div class="uk-form-row">
                    <label for="form-label" class="uk-form-label">{{ 'Label' | trans }}</label>

                    <div class="uk-form-controls">
                        <input id="form-label" class="uk-form-width-large" type="text" name="label"
                               v-model="field.label" v-validate="required" required>
                    </div>
                    <!-- //todo fix req message form is added to VModel Vue, not the actual parent-->
                    <p class="uk-form-help-block uk-text-danger" v-show="form.label.invalid">{{ 'Please enter a label' | trans }}</p>
                </div>
                <div class="uk-form-row">
                    <label for="form-slug" class="uk-form-label">{{ 'Slug' | trans }}</label>

                    <div class="uk-form-controls">
                        <input id="form-slug" class="uk-form-width-large" type="text" v-model="field.slug">
                    </div>
                </div>

                <div class="uk-margin" v-if="fieldSettings">
                    <fields :config="fieldSettings" :model.sync="field.data" template="formrow"></fields>
                </div>


                <formmakerfields class="uk-margin" v-show="!type.hasOptions || field.options.length"
                                 v-ref:formmakerfields
                                 :edit-type="field.type"
                                 :fields="[field]"
                                 :field.sync="field"
                                 :form="form"></formmakerfields>

                <div id="type-settings" class="uk-margin"
                     :data-object.sync="field.data"
                     :field.sync="field"
                     :form="form"></div>

            </div>
            <div class="uk-width-medium-1-4 uk-form-stacked">

                <div v-if="type.required < 0" class="uk-form-row">
                    <span class="uk-form-label">{{ 'Field required' | trans }}</span>

                    <div class="uk-form-controls uk-form-controls-text">
                        <label><input type="checkbox" value="required" v-model="field.data.required"> {{ 'Required' | trans
                            }}</label>
                    </div>
                </div>

                <div v-if="type.multiple < 0" class="uk-form-row">
                    <span class="uk-form-label">{{ 'Multiple values' | trans }}</span>

                    <div class="uk-form-controls uk-form-controls-text">
                        <label><input type="checkbox" value="multiple" v-model="field.data.multiple"> {{ 'Multiple' | trans
                            }}</label>
                    </div>
                </div>

                <div class="uk-form-row">
                    <span class="uk-form-label">{{ 'Restrict Access' | trans }}</span>

                    <div class="uk-form-controls uk-form-controls-text">
                        <p v-for="role in roles" class="uk-form-controls-condensed">
                            <label><input type="checkbox" :value="role.id" v-model="field.roles" number> {{ role.name }}</label>
                        </p>
                    </div>
                </div>

            </div>
        </div>
    </div>

</template>

<script>

    module.exports = {

        props: ['field', 'type', 'roles', 'form'],

        computed: {
            fieldSettings: function () {
                var settings = this.field.type ? Formmakerfields.components[this.field.type].settings || Formmakerfields.components[this.field.type].options.settings : {},
                        parent = this;
                 if (settings.template !== undefined) {
                     new Vue(_.merge({
                         'el': '#type-settings',
                         'name': 'type-settings',
                         'parent': parent,
                         'data':  _.merge({
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
