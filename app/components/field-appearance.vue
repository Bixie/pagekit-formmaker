<template>

    <div class="uk-form-horizontal">

        <partial name="fieldtype-appearance"></partial>

        <fields :config="appearanceSettings" :model.sync="field.data" template="formrow"></fields>

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
