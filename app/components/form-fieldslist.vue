<template>

    <h3>{{ 'Available variables' | trans }}</h3>
    <ul class="uk-list uk-list-line">
        <li v-for="field in fields">
            <kbd>{{ field.slug | shortcode 'label' }}</kbd><br>
            <kbd>{{ field.slug | shortcode 'value' }}</kbd>
        </li>

        <li>
            <kbd v-for="key in ['id', 'form_id', 'email', 'ip', 'created']"
                 class="uk-display-block uk-margin-small-bottom">
                {{ 'submission' | shortcode key }}</kbd>
        </li>
    </ul>

</template>

<script>

    module.exports = {

        props: ['fields']

    };

</script>
