module.exports = {

    data: _.extend({
        formitem: {},
        fields: [],
        message: '',
        error: '',
        thankyou: '',
        submission: {
            form_id: 0,
            status: 1,
            data: {}
        }
    }, window.$data),

    created: function () {
        //prepare submission
        this.submission.form_id = this.formitem.id;
        this.fields.forEach(function (field) {
            this.submission.data[field.id] = {
                field_id: field.id,
                type: field.type,
                label: null,
                value: null
            };
        }.bind(this));
    },

    methods: {

        submit: function (e) {
            e.preventDefault();

            var vm = this;

            this.$set('message', '');
            this.$set('error', '');

            this.$http.post('api/formmaker/submission', {submission: this.submission}, function (data) {
                this.message = data.message;
                if (data.submission.thankyou) {
                    vm.$set('thankyou', data.submission.thankyou);
                }
                if (data.submission.redirect) {
                    window.location.replace(data.submission.redirect);
                }
            }).error(function (error) {
                this.error = error;
            });
        }

    }

};

$(function () {

    new Vue(module.exports).$mount('#formmaker-profile');

});
