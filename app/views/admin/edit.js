module.exports = Vue.extend({

    data: function () {
        return _.merge({
            formitem: {
                data: {
                    classSfx: '',
                    user_email_field: false,
                    submitEmail: window.$data.config.from_address,
                    email_subject: this.$trans('Thank you for your submission'),
                    thankyou_markdown: true,
                    email_body_markdown: true,
                    afterSubmit: 'thankyou',
                    submitButton: this.$trans('Submit'),
                    formStyle: 'uk-form-stacked'
                }
            },
            editid: ''
        }, window.$data);
    },

    created: function () {
        this.$on('close.editmodal', function () {
            this.$.formfields.load();
        });
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
        },
        formfields: function () {
            return this.$.formfields.fields;
        }
    },

    methods: {

        save: function (e) {

            e.preventDefault();

            var data = {formitem: this.formitem};

            this.$broadcast('save', data);

            this.Forms.save({id: this.formitem.id}, data, function (data) {

                if (!this.formitem.id) {
                    window.history.replaceState({}, '', this.$url.route('admin/formmaker/edit', {id: data.formitem.id}))
                }

                this.$set('formitem', data.formitem);

                this.$notify(this.$trans('Form %title% saved.', {title: this.formitem.title}));

            }, function (data) {
                this.$notify(data, 'danger');
            });
        },

        editFormField: function (id) {
            this.editid = id;
            this.$.editmodal.open();
//                this.$nextTick(function () {
//                    //todo close dropdown ;~!
//                    $(this.$.editmodal.$el).find('.uk-modal-dialog').focus();
//                });
        }
    },

    components: {

        formbasic: require('../../components/form-basic.vue'),
        formfields: require('../../components/form-fields.vue'),
        formfieldslist: require('../../components/form-fieldslist.vue'),
        appearance: require('../../components/form-appearance.vue'),
        submission: require('../../components/form-submission.vue'),
        emailsettings: require('../../components/form-email.vue'),
        fieldedit: require('../../components/field-edit.vue')

    }

});

require('../../lib/filters')(Vue);

$(function () {

    (new module.exports()).$mount('#form-edit');

});
