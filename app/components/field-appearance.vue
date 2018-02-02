<template>

    <div class="uk-form-horizontal">

        <partial name="fieldtype-appearance"></partial>

        <bixie-fields v-if="hasAppearanceSettings" :config="appearanceSettings" :values.sync="field.data"></bixie-fields>

    </div>

</template>

<script>
/*global _ */
export default {

    name: 'FieldAppearance',

    props: {'field': Object, 'form': Object,},

    computed: {
        hasAppearanceSettings() {
            return _.size(this.appearanceSettings) > 0;
        },
        appearanceSettings() {
            return this.field.type ? window.BixieFieldtypes.components[this.field.type].appearance ||
                    window.BixieFieldtypes.components[this.field.type].options.appearance : {};
        },
    },

};

</script>
