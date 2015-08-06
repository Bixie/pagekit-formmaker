<template>
    <div class="uk-modal-spinner" v-if="!loaded"></div>
    <div v-show="loaded">
        <div class="uk-grid">
            <div class="uk-width-medium-3-4">

                <h2 class="uk-margin-top-remove">{{ 'Submission for form "%formtitle%"' | trans {formtitle:submission.form_title} }}</h2>
                <dl class="uk-description-list uk-description-list-horizontal">
                    <dt>{{ 'Submission date' | trans}}</dt><dd>{{ submission.created | datetime }}</dd>
                    <dt>{{ 'Submission status' | trans}}</dt><dd v-class="uk-text-danger: submission.status == 0,
							  uk-text-primary: submission.status == 1,
							  uk-text-success: submission.status == 2">{{ getStatusText(submission) | trans }}</dd>
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

            </div>
            <div class="uk-width-medium-1-4 uk-form">

               <div class="uk-form-row">
                    <label for="form-status" class="uk-form-label">{{ 'Status' | trans }}</label>

                    <div class="uk-form-controls">
                        <select id="form-status" class="uk-width-1-1" options="submissionStatuses" v-model="submission.status"></select>
                    </div>
                </div>

            </div>
        </div>

    </div>

    <p class="uk-text-right">
        <button class="uk-button uk-modal-close">{{ 'Close' | trans}}</button>
    </p>

</template>

<script>

    module.exports = {
        data: function () {
            return {
                submission: {status: null},
                loaded: false
            };
        },

        inherit: true,

        props: ['submissionid'],

        created: function () {

            this.resource.query({id: 'detail', submission_id: this.submissionid}, function (data) {
                this.$set('submission', data);
                this.loaded = true;
            }.bind(this));

        },

        computed: {
            submissionStatuses: function () {

                return _.map(this.statuses, function (status, id) {
                    return { text: status, value: id };
                });

            }
        },

        watch: {
            'submission.status': function (value, oldValue) {
                if (oldValue !== null && oldValue !== value) {
                    this.status(value, [this.submission])
                }
            }
        }

    };

</script>
