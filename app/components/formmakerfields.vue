<template>

    <component v-if="!isAdmin" v-for="field in fields | orderBy 'priority'"
               :is="field.type"
               :submission="submission"
               :field="field"
               :form="form"></component>

    <component v-if="isAdmin" :is="editField"
               :is-admin="true"
               :editField="editField"
               :field="field"
               :form="form"></component>

</template>

<script>
var fieldOptions;//??
window.Formmakerfields = module.exports = {

    props: ['fields', 'field', 'submission', 'editField', 'form'],

    components: {},

    computed: {
        isAdmin: function () {
            return !!this.editField
        }
    }

};

Vue.component('formmakerfields', function (resolve) {
    resolve(module.exports);
});

</script>

