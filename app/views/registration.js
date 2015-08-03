module.exports = {

    data: window.$data,

    methods: {

        save: function (e) {
            e.preventDefault();

            this.$set('error', '');

            this.$http.post('user/registration/register', {
                user: this.user,
                profilevalues: this.profilevalues
            }, function (data) {
                window.location.replace(data.redirect);
            }).error(function (error) {
                this.error = error;
            });
        }

    },

    components: {
    },

    computed: {}

};

$(function () {

    new Vue(module.exports).$mount('#formmaker-registration');

});
