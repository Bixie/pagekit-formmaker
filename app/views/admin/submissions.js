/*global _, Vue*/
import SubmissionDetail from '../../components/submission-detail.vue';
import SubmissionCsv from '../../components/submission-csv.vue';

// @vue/component
const vm = {

    el: '#formmaker-submissions',

    name: 'FormmakerSubmissions',

    components: {
        'submission-detail': SubmissionDetail,
        'submission-csv': SubmissionCsv,
    },

    data: () => _.assign({
        submissions: false,
        submissionID: 0,
        pages: 0,
        count: '',
        selected: [],
    }, window.$data),

    computed: {

        statusOptions() {
            const options = _.map(this.statuses, (status, id) => {
                return {text: status, value: id,};
            });

            return [{text: this.$trans('Status'), value: '',}, {
                text: this.$trans('Show all'),
                value: 'all',
            }, {label: this.$trans('Filter by'), options: options,},];
        },

        formOptions() {
            const options = _.map(this.forms, form => {
                return {text: form.title, value: form.id,};
            });

            return [{text: this.$trans('Form'), value: '',}, {label: this.$trans('Filter by'), options: options,},];
        },

    },

    events: {
        'close.submissionmodal': function () {
            if (this.$url.current.hash) {
                window.history.replaceState({}, '', this.$url.current.href.replace('#' + this.$url.current.hash, ''));
                this.$url.current.hash = '';
            }
        },
        'close.csvmodal': function () {
            this.load();
        },
    },

    watch: {

        'config.page': 'load',

        'config.filter': {
            handler: function () {
                this.load(0);
            },
            deep: true,
        },

    },

    created() {
        this.resource = this.$resource('api/formmaker/submission{/id}', {}, {
            'export': {
                method: 'post',
                url: 'api/formmaker/submission/csv',
            },
        });
        this.config.filter = _.extend({status: '', form: '', order: 'created desc',}, this.config.filter);
    },

    methods: {

        load(page) {

            page = page !== undefined ? page : this.config.page;

            this.resource.query({filter: this.config.filter, page: page,}).then(res => {
                this.$set('submissions', res.data.submissions);
                this.$set('pages', res.data.pages);
                this.$set('count', res.data.count);
                this.$set('config.page', page);
                this.$set('selected', []);
                this.checkDetailHash();
            });
        },

        checkDetailHash() {
            if (this.$url.current.hash) {
                const id = parseInt(this.$url.current.hash, 10),
                    submission = _.find(this.submissions, submission => submission.id === id);
                if (submission) {
                    this.submissionDetails(submission);
                }
            }
        },

        active(submission) {
            return this.selected.indexOf(submission.id) !== -1;
        },

        getSelected() {
            return this.submissions.filter(submission => this.selected.indexOf(submission.id) !== -1);
        },

        getStatusText(submission) {
            return this.statuses[submission.status];
        },

        status(status, submissions) {

            submissions = submissions || this.getSelected();

            submissions.forEach(submission => submission.status = status);

            this.resource.save({id: 'bulk',}, {submissions,}).then(() => {
                this.load();
                this.$notify('Submission(s) saved.');
            });
        },

        toggleStatus(submission) {
            submission.status = submission.status === 2 ? 0 : submission.status + 1;
            this.resource.save({id: submission.id,}, {submission,}).then(() => {
                this.load();
                this.$notify('Submission saved.');
            });
        },

        removeSubmissions() {

            this.resource.delete({id: 'bulk',}, {ids: this.selected,}).then(() => {
                this.load();
                this.$notify('Submission(s) deleted.');
            });
        },

        submissionDetails(submission) {
            window.history.replaceState({}, '', this.$url.current.href.replace('#' + this.$url.current.hash, '') + '#' + submission.id);
            this.$url.current.hash = '#' + submission.id;
            this.submissionID = submission.id;
            this.$refs.submissionmodal.open();
        },

        formatValue(fieldvalue) {
            if (window.Formmakerfields.components[fieldvalue.type] && typeof window.Formmakerfields.components[fieldvalue.type].formatValue === 'function') {
                return window.Formmakerfields.components[fieldvalue.type].formatValue.apply(this, [fieldvalue,]);
            }
            return typeof fieldvalue.value === 'string' ? [fieldvalue.value,] : fieldvalue.value;
        },

    },

};

import filters from '../../lib/filters';

filters(Vue);
Vue.ready(vm);

