<template>

    <div class="uk-form-horizontal">

        <partial name="fieldtype-appearance"></partial>

        <bixie-fields v-if="hasAppearanceSettings" :config="appearanceSettings" :values.sync="field.data"></bixie-fields>

    </div>

</template>

<script>

    module.exports = {

        props: ['field', 'form'],

        computed: {
            hasAppearanceSettings() {
                return _.size(this.appearanceSettings) > 0;
            },
            appearanceSettings() {
                return this.field.type ? BixieFieldtypes.components[this.field.type].appearance || BixieFieldtypes.components[this.field.type].options.appearance : {};
            }
        }

    };

</script>
