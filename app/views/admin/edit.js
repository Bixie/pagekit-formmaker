module.exports = Vue.extend({

    data: function () {
        return _.merge({
            formitem: {
                data: {
                    classSfx: '',
                    submitEmail: window.$data.config.from_address,
                    afterSubmit: 'thankyou',
                    submitButton: 'Submit',
                    formStyle: 'uk-form-stacked'
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
        afterSubmitOptions: function () {
            return [
                { value: 'thankyou', text: this.$trans('Show Thank you message')},
                { value: 'redirect', text: this.$trans('Redirect to page')}
            ];
        }
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

                UIkit.notify(this.$trans('Form %title% saved.', {title: this.formitem.title}));

            }, function (data) {
                UIkit.notify(data, 'danger');
            });
        }
    },

    components: {

        formbasic: require('../../components/form-basic.vue'),
        formfields: require('../../components/form-fields.vue'),
        appearance: require('../../components/form-appearance.vue'),
        submission: require('../../components/form-submission.vue'),
        email: require('../../components/form-email.vue'),
        fieldedit: require('../../components/field-edit.vue')

    }

});

$(function () {

    (new module.exports()).$mount('#form-edit');

});
