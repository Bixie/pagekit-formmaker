<template>

    <h3>{{ 'Available variables' | trans}}</h3>
    <ul class="uk-list uk-list-line">
        <li v-repeat="field: fields">
            <kbd>{{ shortcode('label', field) }}</kbd><br>
            <kbd>{{ shortcode('value', field) }}</kbd>
        </li>
    </ul>

</template>

<script>

    module.exports = {

        props: ['fields'],

        methods: {
            shortcode: function (key, field) {
                return '$$ ' + field.slug + ':' + key + ' $$';
            }
        }

    };

</script>
