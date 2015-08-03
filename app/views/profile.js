module.exports = {

    data: window.$data,

    methods: {

        save: function (e) {
            e.preventDefault();

            this.$set('message', '');
            this.$set('error', '');

            this.$http.post('user/profile/save', {user: this.user, profilevalues: this.profilevalues}, function () {
                //todo return new profilevalues ids
                this.message = this.$trans('Profile Updated');
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

    new Vue(module.exports).$mount('#formmaker-profile');

});
