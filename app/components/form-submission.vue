<template>

    <div class="uk-form-horizontal uk-margin">

        <div class="uk-form-row">
            <label for="form-formstyle" class="uk-form-label">{{ 'After submit' | trans }}</label>

            <div class="uk-form-controls">
                <select id="form-formstyle" class="uk-form-width-large"
                        options="afterSubmitOptions" v-model="formitem.data.afterSubmit"></select>
            </div>
        </div>
        <!-- //todo focus/ show contents -->
        <div class="uk-form-row" v-show="formitem.data.afterSubmit == 'thankyou'">
            <v-editor id="formitem-thankyou" value="{{@ formitem.data.thankyou }}" options="{{ {markdown : formitem.data.thankyou_markdown} }}"></v-editor>
            <p>
                <label><input type="checkbox" v-model="formitem.data.thankyou_markdown"> {{ 'Enable Markdown' | trans }}</label>
            </p>
        </div>

        <div class="uk-form-row" v-show="formitem.data.afterSubmit == 'redirect'">
            <label class="uk-form-label">{{ 'Redirect' | trans }}</label>
            <div class="uk-form-controls">
                <input-link class="uk-form-width-large" link="{{@ formitem.data.redirect}}"></input-link>
            </div>
        </div>


    </div>

</template>

<script>

    module.exports = {

        inherit: true

    };

</script>
