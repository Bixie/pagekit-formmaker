<template>

    <div class="uk-margin">

        <div class="uk-grid">
            <div class="uk-width-medium-3-4 uk-form-horizontal">
                <div class="uk-form-row">
                    <label for="form-label" class="uk-form-label">{{ 'Label' | trans }}</label>

                    <div class="uk-form-controls">
                        <input id="form-label" class="uk-form-width-large" type="text" name="label"
                               v-model="field.label" v-valid="required">
                    </div>
                    <!-- //todo fix req message -->
                    <p class="uk-form-help-block uk-text-danger" v-show="formform.label.invalid">{{ 'Please enter a label' | trans }}</p>
                </div>
                <div class="uk-form-row">
                    <label for="form-slug" class="uk-form-label">{{ 'Slug' | trans }}</label>

                    <div class="uk-form-controls">
                        <input id="form-slug" class="uk-form-width-large" type="text" v-model="field.slug">
                    </div>
                </div>

                <formmakerfields v-show="!type.hasOptions || field.options.length" edit-field="{{@ field.type }}"></formmakerfields>

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
                        <p v-repeat="role: roles" class="uk-form-controls-condensed">
                            <label><input type="checkbox" value="{{ role.id }}" v-checkbox="field.roles" number> {{ role.name
                                }}</label>
                        </p>
                    </div>
                </div>

            </div>
        </div>
    </div>

</template>

<script>

    module.exports = {

        inherit: true,

        props: ['field', 'type']

    };

</script>
