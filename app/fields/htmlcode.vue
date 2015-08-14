<template>

    <div v-if="isAdmin" class="uk-form-row">

        <div class="uk-form-row">
            <v-editor id="{{ fieldid }}-html" value="{{@ dataObject.value }}" options="{{ {markdown : field.data.markdown} }}"></v-editor>
            <p>
                <label><input type="checkbox" v-model="field.data.markdown"> {{ 'Enable Markdown' | trans }}</label>
            </p>
        </div>

    </div>

    <div v-if="!isAdmin" class="uk-form-row {{field.data.classSfx || ''}}">

        {{{ dataObject.prepared }}}

    </div>

</template>

<script>
    var formmakerfieldMixin = require('../mixins/formmakerfield.js');

    module.exports = {

        inherit: true,

        mixins: [formmakerfieldMixin],

        data: function () {
            return {
                fieldid: _.uniqueId('formmakerfield_')
            };
        },

        created: function () {
            this.$set('dataObject', this.getDataObject(this.field.data.value || ''));
        }

    };

    window.Formmakerfields.components['htmlcode'] = module.exports;

</script>
