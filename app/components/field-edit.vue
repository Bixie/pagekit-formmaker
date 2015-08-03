<template>
 hoi {{formitem.title }}

</template>

<script>

    module.exports = {
        data: function () {
            return _.merge({
                formitem: {
                    data: {
                        classSfx: '',
                        required: false
                    }
                }
            }, window.$data);
        },

        props: ['formitem'],

        created: function () {
            this.Fields = this.$resource('api/formmaker/field/:id');
            this.$on('fieldedit', function (e, id) {
                console.log(e);
                console.log(id);
            });
        },

        ready: function () {
            this.Forms = this.$resource('api/formmaker/form/:id');
            this.tab = UIkit.tab(this.$$.tab, {connect: this.$$.content});
        }

    };

</script>
