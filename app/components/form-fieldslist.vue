<template>

    <h3>{{ 'Available variables' | trans}}</h3>
    <ul class="uk-list uk-list-line">
        <li v-repeat="field: fields">
            <kbd>{{ field.slug | shortcode 'label' }}</kbd><br>
            <kbd>{{ field.slug | shortcode 'value' }}</kbd>
        </li>
    </ul>

</template>

<script>

    module.exports = {

        props: ['fields']

    };

</script>
