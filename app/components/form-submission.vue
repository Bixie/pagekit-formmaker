<template>

    <div class="uk-form-horizontal uk-margin">

        <div class="uk-grid">
            <div class="uk-width-medium-3-4">

                <div class="uk-form-row">
                    <label for="form-formstyle" class="uk-form-label">{{ 'After submit' | trans }}</label>

                    <div class="uk-form-controls">
                        <select id="form-formstyle" class="uk-form-width-large" v-model="formitem.data.afterSubmit">
                            <option value="thankyou">{{ 'Show Thank you message' | trans }}</option>
                            <option value="redirect">{{ 'Redirect to page' | trans }}</option>
                        </select>
                    </div>
                </div>

                <div class="uk-form-row" v-show="formitem.data.afterSubmit == 'thankyou'">
                    <v-editor id="formitem-thankyou" :value.sync="formitem.data.thankyou" :options="{markdown : formitem.data.thankyou_markdown}"></v-editor>
                    <p>
                        <label><input type="checkbox" v-model="formitem.data.thankyou_markdown"> {{ 'Enable Markdown' | trans }}</label>
                    </p>
                </div>

                <div class="uk-form-row" v-show="formitem.data.afterSubmit == 'redirect'">
                    <label class="uk-form-label">{{ 'Redirect' | trans }}</label>
                    <div class="uk-form-controls">
                        <input-link class="uk-form-width-large" :link.sync="formitem.data.redirect"></input-link>
                    </div>
                </div>

                <div class="uk-form-row">
                    <span class="uk-form-label">{{ 'Google Datalayer' | trans }}</span>

                    <div class="uk-form-controls uk-form-controls-text">
                        <label><input type="checkbox" v-model="formitem.data.google_datalayer"> {{ 'Push event to Google Datalayer' |
                            trans }}</label>
                    </div>
                </div>

            </div>
            <div class="uk-width-medium-1-4">

                <formfieldslist :fields="formfields"></formfieldslist>

            </div>
        </div>

    </div>

</template>

<script>

    module.exports = {

        props: ['formitem', 'formfields', 'form'],

        components: {
            formfieldslist: require('./form-fieldslist.vue')
        }
    };

</script>
