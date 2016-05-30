<template>

    <form class="pk-panel-teaser uk-form uk-form-stacked" v-if="editing">

        <div class="uk-form-row ">
            <span class="uk-form-label">{{ 'Filter forms' | trans }}</span>

            <div class="uk-form-controls uk-form-controls-text">
                <p class="uk-form-controls-condensed">
                    <label><input type="checkbox" value="all" v-model="widget.form"> {{ 'Show all' | trans }}</label>
                </p>
                <p v-for="form in forms" class="uk-form-controls-condensed">
                    <label><input type="checkbox" :value="form.id" v-model="widget.form"> {{ form.title }}</label>
                </p>
            </div>
        </div>

        <div class="uk-form-row">
            <span class="uk-form-label">{{ 'Done submissions' | trans }}</span>

            <div class="uk-form-controls uk-form-controls-text">
                <p class="uk-form-controls-condensed">
                    <label><input type="radio" value="1" v-model="widget.done"> {{ 'Show' | trans }}</label>
                </p>

                <p class="uk-form-controls-condensed">
                    <label><input type="radio" value="" v-model="widget.done"> {{ 'Hide' | trans }}</label>
                </p>
            </div>
        </div>

        <div class="uk-form-row">
            <label class="uk-form-label" for="form-submissions-number">{{ 'Number of submissions' | trans }}</label>

            <div class="uk-form-controls">
                <select id="form-submissions-number" class="uk-width-1-1" v-model="widget.count" number>
                    <option value="6">6</option>
                    <option value="12">12</option>
                    <option value="18">16</option>
                </select>
            </div>
        </div>

    </form>

    <div v-show="!loading">
        <div class="pk-text-large">{{ count }}</div>

        <h3 class="uk-panel-title" v-show="!widget.done">{{ '{0} Active submissions|{1} Active submission|]1,Inf[ Active submissions' | transChoice count}}</h3>

        <h3 class="uk-panel-title" v-else>{{ '{0} Submissions|{1} Submission|]1,Inf[ Submissions' | transChoice count}}</h3>

        <ul v-show="submissions.length" class="uk-list uk-list-line">
            <li class="" v-for="submission in submissions | orderBy 'status ASC, created DESC'">
            <span class="uk-float-right" :class="{'pk-icon-circle-danger': !submission.status,
							  'pk-icon-circle-primary': submission.status == 1,
							  'pk-icon-circle-success': submission.status == 2}"></span>

                <a :href="$url.route('admin/formmaker/submissions#' + submission.id )">{{ submission.created | datetime
                    }}</a>
                <div class="uk-text-truncate uk-text-muted">
                    {{ submission.form_title }}<span v-if="submission.email"> | {{ submission.email }}</span>
                </div>
            </li>
        </ul>
    </div>


</template>

<script>
    require('../lib/filters')(Vue);

    module.exports = {

        type: {

            id: 'formmaker',
            label: 'New form submissions',
            description: function () {

            },
            defaults: {
                form: ['all'],
                done: false,
                count: 12
            }

        },

        replace: false,

        props: ['widget', 'editing'],

        data: function () {
            return {
                loading: false,
                submissions: [],
                count: 0
            };
        },

        watch: {

            'widget.form': {
                handler: 'load',
                immediate: true
            },

            'editing': 'loadForms',

            'widget.count': 'load',

            'widget.done': 'load'

        },

        methods: {

            load: function () {

                var filter = {
                    status: 1,
                    limit: this.widget.count
                };
                this.loading = true;

                if (this.$get('widget.form').indexOf('all') === -1) {
                    filter['form'] = this.$get('widget.form');
                }

                if (this.$get('widget.done')) {
                    filter['status'] = '';
                }

                this.$resource('api/formmaker/submission{/id}').query({filter: filter}).then(function (res) {

                    this.$set('count', res.data.count);
                    this.$set('submissions', res.data.submissions);
                    this.loading = false;

                });
            },

            loadForms: function (editing) {
                if (editing && !this.$get('forms')) {

                    this.$resource('api/formmaker/form{/id}').query().then(function (res) {
                        this.$set('forms', res.data);
                    });

                }
            }

        }

    };

    window.Dashboard.components['formmaker'] = module.exports;

</script>
