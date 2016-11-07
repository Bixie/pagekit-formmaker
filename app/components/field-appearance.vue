<template>

    <div class="uk-form-horizontal">

        <partial name="fieldtype-appearance"></partial>

        <bixie-fields :config="appearanceSettings" :values.sync="field.data"></bixie-fields>

    </div>

</template>

<script>

    module.exports = {

        props: ['field', 'form'],

        computed: {
            appearanceSettings: function () {
                return this.field.type ? BixieFieldtypes.components[this.field.type].appearance || BixieFieldtypes.components[this.field.type].options.appearance : {};
            }
        }

    };

</script>
