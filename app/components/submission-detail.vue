<template>
    <div class="uk-modal-spinner" v-if="!loaded"></div>
    <div v-show="loaded">
        <div class="uk-grid">
            <div class="uk-width-medium-3-4">

                <h2 class="uk-margin-top-remove">{{ 'Submission for form "%formtitle%"' | trans {formtitle:submission.form_title} }}</h2>
                <dl class="uk-description-list uk-description-list-horizontal">
                    <dt>{{ 'Submission date' | trans }}</dt><dd>{{ submission.created | datetime }}</dd>
                    <dt>{{ 'Submission status' | trans }}</dt><dd :class="{'uk-text-danger': submission.status == 0,
							  'uk-text-primary': submission.status == 1,
							  'uk-text-success': submission.status == 2}">{{ $root.getStatusText(submission) | trans }}</dd>
                    <dt>{{ 'Remote IP address' | trans }}</dt><dd>{{ submission.ip }}</dd>
                    <dt>{{ 'Email sent to' | trans }}</dt>
                    <dd>
                        <a v-if="submission.email" href="mailto:{{ submission.email }}">{{ submission.email }}</a>
                        <span v-else>{{ 'No email provided' | trans }}</span>
                    </dd>
                </dl>
                <h3>{{ 'Submission data' | trans }}</h3>
                <dl class="uk-description-list uk-description-list-horizontal">
                    <template v-for="fieldsubmission in submission.fieldsubmissions">
                        <dt>{{ fieldsubmission.field.label}}</dt>
                        <dd v-for="value in fieldsubmission.formatted">{{{ value }}}</dd>
                    </template>
                </dl>

            </div>
            <div class="uk-width-medium-1-4 uk-form">

               <div class="uk-form-row">
                    <label for="form-status" class="uk-form-label">{{ 'Status' | trans }}</label>

                    <div class="uk-form-controls">
                        <select id="form-status" class="uk-width-1-1" v-model="submission.status" number>
                            <option v-for="option in $root.statuses" :value="$key">{{ option }}</option>
                        </select>
                    </div>
                </div>

            </div>
        </div>

    </div>

    <div class="uk-modal-footer uk-text-right">
        <button type="button" class="uk-button uk-modal-close">{{ 'Close' | trans }}</button>
    </div>

</template>

<script>

    module.exports = {
        data: function () {
            return {
                submission: {status: null},
                loaded: false
            };
        },

        props: ['submissionid'],

        created: function () {

            this.$root.resource.query({id: 'detail', submission_id: this.submissionid}).then(function (res) {
                this.$set('submission', res.data);
                this.loaded = true;
            }.bind(this));

        },

        beforeDestroy: function () {
            this.$dispatch('close.submissionmodal');
        },

        watch: {
            'submission.status': function (value, oldValue) {
                if (oldValue !== null && oldValue !== value) {
                    this.$root.status(value, [this.submission])
                }
            }
        }
    };

</script>
