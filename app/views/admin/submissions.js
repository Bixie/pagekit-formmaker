module.exports = {

    data: function () {
        return _.merge({
            submissions: false,
            submissionID: 0,
            pages: 0,
            count: '',
            selected: []
        }, window.$data);
    },

    created: function () {
        this.resource = this.$resource('api/formmaker/submission/:id');
        this.config.filter = _.extend({ status: '', form: '', order: 'created desc'}, this.config.filter);

    },

    watch: {

        'config.page': 'load',

        'config.filter': {
            handler: function () { this.load(0); },
            deep: true
        }

    },

    computed: {

        statusOptions: function () {

            var options = _.map(this.$data.statuses, function (status, id) {
                return { text: status, value: id };
            });

            return [{ text: this.$trans('Status'), value: '' }, { label: this.$trans('Filter by'), options: options }];
        },

        formOptions: function () {

            var options = _.map(this.$data.forms, function (form) {
                return { text: form.title, value: form.id };
            });

            return [{ text: this.$trans('Form'), value: '' }, { label: this.$trans('Filter by'), options: options }];
        }

    },

    methods: {

        load: function (page) {

            page = page !== undefined ? page : this.config.page;

            this.resource.query({ filter: this.config.filter, page: page }, function (data) {
                this.$set('submissions', data.submissions);
                this.$set('pages', data.pages);
                this.$set('count', data.count);
                this.$set('config.page', page);
                this.$set('selected', []);
            });
        },

        active: function (submission) {
            return this.selected.indexOf(submission.id.toString()) !== -1;
        },

        getSelected: function () {
            return this.submissions.filter(function(submission) { return this.selected.indexOf(submission.id.toString()) !== -1; }, this);
        },

        getStatusText: function (submission) {
            return this.statuses[submission.status];
        },

        removeForms: function () {

            this.Forms.delete({id: 'bulk'}, {ids: this.selected}, function () {
                this.load();
                UIkit.notify('Forms(s) deleted.');
            });
        },

        submissionDetails: function (submission) {
            this.submissionID = submission.id;
            this.$.submissionmodal.open();
        },

        formatValue: function (fieldvalue) {
            if (window.Formmakerfields.components[fieldvalue.type] && typeof window.Formmakerfields.components[fieldvalue.type].formatValue === 'function') {
                console.log(fieldvalue.value);
                return window.Formmakerfields.components[fieldvalue.type].formatValue.apply(this, [fieldvalue]);
            }
            return typeof fieldvalue.value === 'string' ? [fieldvalue.value] : fieldvalue.value;
        }

    },

    filters: {
        datetime: function (date) {
            return date ? this.$date(date, 'full') : '';
            //todo datetime grr
            if (typeof date === 'string') {
                date = new Date(date);
            }
            return Globalize.formatDate(date, {skeleton: 'yMdhm'});
        }
    },

    components: {
        'submissiondetail': require('../../components/submission-detail.vue')
    }

};

$(function () {

    new Vue(module.exports).$mount('#formmaker-submissions');

});

