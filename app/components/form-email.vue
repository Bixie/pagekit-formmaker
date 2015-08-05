<template>

    <div class="uk-form-horizontal uk-margin">

        <div class="uk-form-row">
            <label for="form-submitemail" class="uk-form-label">{{ 'Email submission to' | trans }}</label>

            <div class="uk-form-controls">
                <input id="form-submitemail" class="uk-form-width-large" type="text" name="submitemail"
                       v-model="formitem.data.submitEmail" v-valid="email">
            </div>
            <!-- //todo fix req message -->
            <p class="uk-form-help-block uk-text-danger" v-show="formform.submitemail.invalid">{{ 'Please enter valid email address' | trans }}</p>
        </div>

        <div class="uk-form-row">
            <label for="form-emailsubject" class="uk-form-label">{{ 'Email subject' | trans }}</label>

            <div class="uk-form-controls">
                <input id="form-emailsubject" class="uk-form-width-large" type="text" name="emailsubject"
                       v-model="formitem.data.email_subject">
            </div>
            <!-- //todo fix req message -->
            <p class="uk-form-help-block uk-text-danger" v-show="formform.submitemail.invalid">{{ 'Please enter valid email address' | trans }}</p>
        </div>

        <div class="uk-form-row">
            <v-editor id="formitem-emailbody" value="{{@ formitem.data.email_body }}"
                      options="{{ {markdown : formitem.data.email_body_markdown} }}"></v-editor>
            <p>
                <label><input type="checkbox" v-model="formitem.data.email_body_markdown"> {{ 'Enable Markdown' | trans }}</label>
            </p>
        </div>



    </div>

</template>

<script>

    module.exports = {

        inherit: true

    };

</script>
