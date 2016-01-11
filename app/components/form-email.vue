<template>

    <div class="uk-form-horizontal uk-margin">

        <div class="uk-grid">
            <div class="uk-width-medium-3-4">
                <div class="uk-form-row">
                    <label for="form-user_email_field" class="uk-form-label">{{ 'User email field' | trans }}</label>

                    <div class="uk-form-controls">
                        <select id="form-user_email_field" class="uk-form-width-medium" v-model="formitem.data.user_email_field">
                            <option value="">{{ 'Select a field' | trans }}</option>
                            <option v-for="field in formfields | filterBy 'email' in 'type'" :value="field.slug">{{ field.label }}</option>
                        </select>
                    </div>
                </div>

                <div class="uk-alert" v-show="formitem.data.user_email_field">
                    {{ 'Email address from field "%field%" will be used to confirm submission to the user.' | trans {field:formitem.data.user_email_field} }}</div>
                <div class="uk-alert uk-alert-warning" v-show="!formitem.data.user_email_field">
                    {{ 'No email field is selected for user confirmation mail.' | trans }}</div>

                <div class="uk-form-row">
                    <label for="form-submitemail" class="uk-form-label">{{ 'Email copy of submission to' | trans }}</label>

                    <div class="uk-form-controls">
                        <input id="form-submitemail" class="uk-form-width-large" type="text" name="submitemail"
                               v-model="formitem.data.submitEmail" v-validate:email v-validate:required="!!formitem.data.user_email_field">
                    <!-- //todo fix req message -->
                    <p class="uk-form-help-block uk-text-danger" v-show="form.submitemail.invalid">{{ 'Please enter valid email address' | trans }}</p>

                    <p class="uk-form-help-block uk-text-danger" v-show="formitem.data.user_email_field && !formitem.data.submitEmail">
                        {{ 'No email will be sent to the user when no address is entered here!' | trans }}</p>
                </div>
            </div>


                <div class="uk-form-row">
                    <label for="form-emailsubject" class="uk-form-label">{{ 'Email subject' | trans }}</label>

                    <div class="uk-form-controls">
                        <input id="form-emailsubject" class="uk-form-width-large" type="text" name="emailsubject"
                               v-model="formitem.data.email_subject">
                    </div>

                </div>

                <div class="uk-form-row">
                    <v-editor id="formitem-emailbody" :value.sync="formitem.data.email_body"
                              :options="{markdown : formitem.data.email_body_markdown}"></v-editor>
                    <p>
                        <label><input type="checkbox" v-model="formitem.data.email_body_markdown"> {{ 'Enable Markdown' | trans }}</label>
                    </p>
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
