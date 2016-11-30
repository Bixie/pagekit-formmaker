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

        save() {

            var data = {submission: this.submission};

            this.$set('message', '');
            this.$set('error', '');

            this.$broadcast('submit', data);

            this.$http.post('api/formmaker/submission', data)
                .then(res => {
                    data = res.data;
                    this.message = data.message;
                    if (data.submission.thankyou) {
                        this.$set('thankyou', data.submission.thankyou);
                    }
                    if (this.formitem.data.google_datalayer) {
                        var dataLayer = window.dataLayer || [];
                        dataLayer.push({'event': 'form-' + this.formitem.slug});
                    }
                    if (data.submission.redirect) {
                        window.location.replace(data.submission.redirect);
                    }
                }, res => this.error = this.$trans(res.data.message || res.data));
        }

    },

    components: {
        recaptcha: require('../components/recaptcha.vue')
    }

};

Vue.ready(() => {
    window.Formmaker = new Vue(module.exports);
});
