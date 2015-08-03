<template>

    <component v-if="!isAdmin" v-repeat="field: forms | orderBy 'priority'" is="{{ field.type }}"></component>

    <component v-if="isAdmin" is="{{ editField }}" is-admin="true"></component>

</template>

<script>
var fieldOptions;
window.Formmakerfields = module.exports = {

    props: ['fields', 'editField'],

    inherit: true,

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

