<template>

    <div class="uk-form-row">
        <label for="form-link-formmaker" class="uk-form-label">{{ 'View' | trans }}</label>
        <div class="uk-form-controls">
            <select id="form-link-formmaker" class="uk-width-1-1" v-model="link">
                <option value="@formmaker">{{ 'User Profile' | trans}}</option>
                <option value="@formmaker/registration">{{ 'User Registration' | trans}}</option>
            </select>
        </div>
    </div>

</template>

<script>

    module.exports = {

        link: {
            label: 'Formmaker'
        },

        props: ['link'],

        ready: function () {
            this.$set('link', '@formmaker');
        }

    };

    window.Links.components['formmaker'] = module.exports;

</script>
