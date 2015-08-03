<template>

    <div class="uk-form-horizontal uk-margin">

        <div class="uk-form-row">
            <label for="form-title" class="uk-form-label">{{ 'Title' | trans }}</label>

            <div class="uk-form-controls">
                <input id="form-title" class="uk-form-width-large" type="text" name="label"
                       v-model="formitem.title" v-valid="required">
            </div>
            <p class="uk-form-help-block uk-text-danger" v-show="formitem.title.invalid">{{ 'Please enter a title' | trans }}</p>
        </div>
        <div class="uk-form-row">
            <label for="form-slug" class="uk-form-label">{{ 'Slug' | trans }}</label>

            <div class="uk-form-controls">
                <input id="form-slug" class="uk-form-width-large" type="text" v-model="formitem.slug">
            </div>
        </div>

        <div class="uk-form-row">
            <label for="form-status" class="uk-form-label">{{ 'Status' | trans }}</label>

            <div class="uk-form-controls">
                <select id="form-status" class="uk-form-width-large" v-model="formitem.status">
                    <option value="0">{{ 'Disabled' | trans }}</option>
                    <option value="1">{{ 'Enabled' | trans }}</option>
                </select>
            </div>
        </div>


    </div>

</template>

<script>

    module.exports = {

        inherit: true

    };

</script>
