<template>

    <div :class="['uk-form-row', isAdmin ? 'uk-hidden' : '', field.data.classSfx || '']">

        {{{ dataObject.prepared }}}

    </div>

</template>

<script>

    module.exports = {

        mixins: [FormmakerfieldMixin],

        settings: require('./components/settings.vue'),

        appearance: {},

        data: function () {
            return {
                dataObject: {},
                fieldid: _.uniqueId('formmakerfield_')
            };
        },

        created: function () {
            this.$set('dataObject', this.getDataObject(this.field.data.value || ''));
        }

    };

    window.Formmakerfields.components['htmlcode'] = module.exports;

</script>
