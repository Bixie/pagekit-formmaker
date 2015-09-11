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
    }, window.$formmaker),

    created: function () {
        //prepare submission
        this.submission.form_id = this.formitem.id;
        this.fields.forEach(function (field) {
            this.submission.data[field.id] = {
                field_id: field.id,
                slug: field.slug,
                type: field.type,
                label: null,
                value: null
            };
        }.bind(this));
    },

    methods: {

        submit: function (e) {
            e.preventDefault();

            var vm = this, data = {submission: this.submission};

            this.$set('message', '');
            this.$set('error', '');

            this.$broadcast('submit', data);

            this.$http.post('api/formmaker/submission', data, function (data) {
                this.message = data.message;
                if (data.submission.thankyou) {
                    vm.$set('thankyou', data.submission.thankyou);
                }
                if (data.submission.redirect) {
                    window.location.replace(data.submission.redirect);
                }
            }).error(function (error) {
                this.error = this.$trans(error);
            });
        }

    },

    components: {
        recaptcha: require('../components/recaptcha.vue')
    }

};

$(function () {

    window.Formmaker = new Vue(module.exports).$mount('#formmaker-form');

});
