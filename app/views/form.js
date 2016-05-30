module.exports = {

    el: '#formmaker-form',

    data: _.assign({
        formitem: {},
        fields: [],
        message: '',
        error: '',
        thankyou: '',
        submission: {},
        form: {}
    }, window.$formmaker),

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
                    if (this.formitem.data.google_datalayer) {
                        var dataLayer = window.dataLayer || [];
                        dataLayer.push({'event': 'form-' + this.formitem.slug});
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
