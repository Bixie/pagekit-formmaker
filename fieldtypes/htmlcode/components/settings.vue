<template>

    <div class="uk-form-row">

        <v-editor :value.sync="field.data.value" :options="{markdown : field.data.markdown}"></v-editor>
        <p>
            <label><input type="checkbox" v-model="field.data.markdown"> {{ 'Enable Markdown' | trans }}</label>
        </p>

    </div>

</template>

<script>

    module.exports = {

        created: function () {
            this.field.data = _.merge({
                'markdown': false
            }, this.field.data);
        }

    };

</script>
