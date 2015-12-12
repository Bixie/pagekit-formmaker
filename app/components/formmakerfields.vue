<template>

    <div>
        <component v-for="field in fields | orderBy 'priority'"
                   :is="field.type"
                   :is-admin="isAdmin"
                   :submission="submission"
                   :field="field"
                   :form="form"></component>
    </div>

</template>

<script>
var fieldOptions;//??
window.Formmakerfields = module.exports = {

    props: ['fields', 'field', 'submission', 'editType', 'form'],

    computed: {
        isAdmin: function () {
            return !!this.editType
        }
    },

    components: {}

};

Vue.component('formmakerfields', function (resolve) {
    resolve(module.exports);
});

</script>

