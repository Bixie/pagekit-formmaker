<template>

    <div class="uk-form-horizontal uk-margin">

        <div class="uk-form-row">
            <label for="form-label" class="uk-form-label">{{ 'Label' | trans }}</label>

            <div class="uk-form-controls">
                <input id="form-label" class="uk-form-width-large" type="text" name="label"
                       v-model="field.label" v-valid="required">
            </div>
            <p class="uk-form-help-block uk-text-danger" v-show="form.label.invalid">{{ 'Please enter a label' | trans }}</p>
        </div>

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
                    <label><input type="checkbox" value="{{ role.id }}" v-checkbox="field.roles"> {{ role.name
                        }}</label>
                </p>
            </div>
        </div>

        <input type="hidden" v-model="field.priority"/>
    </div>

</template>

<script>

    module.exports = {

        inherit: true,

        props: ['field']

    };

</script>
