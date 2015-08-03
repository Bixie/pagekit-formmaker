module.exports = Vue.extend({

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

    created: function () {

    },

    ready: function () {
        this.Forms = this.$resource('api/formmaker/form/:id');
        this.tab = UIkit.tab(this.$$.tab, {connect: this.$$.content});
    },

    computed: {
    },

    methods: {

        save: function (e) {

            e.preventDefault();

            var data = {formitem: this.formitem};

            this.$broadcast('save', data);

            this.Forms.save({id: this.formitem.id}, data, function (data) {

                if (!this.formitem.id) {
                    window.history.replaceState({}, '', this.$url('admin/formmaker/edit', {id: data.formitem.id}))
                }

                this.$set('formitem', data.formitem);

                UIkit.notify(this.$trans('%type% saved.', {type: this.type.label}));

            }, function (data) {
                UIkit.notify(data, 'danger');
            });
        },

        editField: function (id) {

            this.$broadcast('editfield', id);

            this.$.fieldEdit.open();

        }

    },

    components: {

        formbasic: require('../../components/form-basic.vue'),
        formfields: require('../../components/form-fields.vue'),
        appearance: require('../../components/form-appearance.vue'),
        fieldedit: require('../../components/field-edit.vue')

    }

});

$(function () {

    (new module.exports()).$mount('#form-edit');

});
