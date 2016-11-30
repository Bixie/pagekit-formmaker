module.exports = {

    el: '#form-edit',

    data: function () {
        return _.merge({
            formitem: {
                data: {
                    value: '',
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
            editid: '',
            form: {}
        }, window.$data);
    },

    ready() {
        this.Forms = this.$resource('api/formmaker/form{/id}');
        this.tab = UIkit.tab(this.$els.tab, {connect: this.$els.content});
    },

    events: {
        'close.editmodal': function () {
            this.$refs.formfields.load();
        }
    },

    computed: {
        formfields() {
            return this.$refs.formfields ? this.$refs.formfields.fields : [];
        }
    },

    methods: {

        save() {

            var data = {formitem: this.formitem};

            this.$broadcast('save', data);

            this.Forms.save({id: this.formitem.id}, data).then(function (res) {
                data = res.data;
                if (!this.formitem.id) {
                    window.history.replaceState({}, '', this.$url.route('admin/formmaker/form/edit', {id: data.formitem.id}));
                }

                this.$set('formitem', data.formitem);

                this.$notify(this.$trans('Form %title% saved.', {title: this.formitem.title}));

            }, function (data) {
                this.$notify(data, 'danger');
            });
        },

        editFormField(id) {
            this.editid = id;
            this.$refs.editmodal.open();
//                this.$nextTick(function () {
//                    //todo close dropdown ;~!
//                    $(this.$.editmodal.$el).find('.uk-modal-dialog').focus();
//                });
        }

    },

    components: {

        formbasic: require('../../components/form-basic.vue'),
        formfields: require('../../components/form-fields.vue'),
        appearance: require('../../components/form-appearance.vue'),
        submission: require('../../components/form-submission.vue'),
        emailsettings: require('../../components/form-email.vue'),
        fieldedit: require('../../components/field-edit.vue')

    }

};

require('../../lib/filters')(Vue);

Vue.ready(module.exports);
