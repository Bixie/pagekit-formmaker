<template>

    <formmakerfields fields="{{@ fields}}"></formmakerfields>

    <p v-show="!fields" class="uk-text-center"><i class="uk-icon-spinner uk-icon-spin"></i></p>

</template>

<script>

    module.exports = {

        section: {
            label: 'Formmaker',
            priority: 200
        },

        inherit: true,

        created: function () {
            this.Fields = this.$resource('api/formmaker/profile/:id');
            this.load();
            this.$on('save', function (data) {
                data.profilevalues = this.profilevalues;
            });
        },

        methods: {

            load: function () {
                return this.Fields.query({id: this.user.id}, function (data) {
                    this.$set('fields', data.fields);
                    this.$set('profilevalues', data.profilevalues);
                }, function (message) {
                    UIkit.notify('Formmaker: ' + message, {status: 'danger'});
                });
            }
        }

    };

    window.Users.components['user-section-formmaker'] = module.exports;

</script>
