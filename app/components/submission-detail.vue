<template>
    <div class="uk-modal-spinner" v-if="!loaded"></div>
    <div v-show="loaded">
        <h2 class="uk-margin-top-remove">{{ 'Submission for form "%formtitle%"' | trans {formtitle:submission.form_title} }}</h2>
        <dl class="uk-description-list uk-description-list-horizontal">
            <dt>{{ 'Submission date' | trans}}</dt><dd>{{ submission.created | datetime }}</dd>
            <dt>{{ 'Submission status' | trans}}</dt><dd>{{ getStatusText(submission) | trans }}</dd>
            <dt>{{ 'Remote IP address' | trans}}</dt><dd>{{ submission.ip }}</dd>
            <dt>{{ 'Email sent to' | trans}}</dt><dd>{{ submission.email || 'No email provided' | trans }}</dd>
        </dl>
        <h3>{{ 'Submission data' | trans }}</h3>
        <dl class="uk-description-list uk-description-list-horizontal">
            <template v-repeat="fieldsubmission: submission.fieldsubmissions">
                <dt>{{ fieldsubmission.field.label}}</dt>
                <dd v-repeat="fieldsubmission.value">{{ $value }}</dd>
            </template>
        </dl>

        <p class="uk-text-right">
            <button class="uk-button uk-modal-close">{{ 'Close' | trans}}</button>
        </p>

    </div>

</template>

<script>

    module.exports = {
        data: function () {
            return {
                submission: {},
                loaded: false
            };
        },

        inherit: true,

        props: ['submissionid'],

        created: function () {
            
            this.resource = this.$resource('api/formmaker/submission/detail');

        },

        ready: function () {
            this.resource.query({id: this.submissionid}, function (data) {
                this.$set('submission', data);
                this.loaded = true;
            });

        }

    };

</script>
