module.exports = {

    el: '#formmaker-form',

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
        },
        form: {}
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

        save: function () {

            var vm = this, data = {submission: this.submission};

            this.$set('message', '');
            this.$set('error', '');

            this.$broadcast('submit', data);

            this.$http.post('api/formmaker/submission', data)
                .then(function (res) {
                    data = res.data;
                    this.message = data.message;
                    if (data.submission.thankyou) {
                        vm.$set('thankyou', data.submission.thankyou);
                    }
                    if (data.submission.redirect) {
                        window.location.replace(data.submission.redirect);
                    }
                }, function (error) {
                    this.error = this.$trans(error);
                });
        }

    },

    components: {
        recaptcha: require('../components/recaptcha.vue')
    }

};

Vue.ready(function () {
    window.Formmaker = new Vue(module.exports);
});
