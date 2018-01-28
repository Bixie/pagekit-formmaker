/*global _, Vue, UIkit*/
import FormBasic from '../../components/form-basic.vue';
import FormFields from '../../components/form-fields.vue';
import FormAppearance from '../../components/form-appearance.vue';
import FormSubmission from '../../components/form-submission.vue';
import FormEmail from '../../components/form-email.vue';
import FieldEdit from '../../components/field-edit.vue';

const vm = {

    el: '#form-edit',

    name: 'form-edit',

    components: {
        'form-basic': FormBasic,
        'form-fields': FormFields,
        'form-appearance': FormAppearance,
        'form-submission': FormSubmission,
        'form-emailsettings': FormEmail,
        'field-edit': FieldEdit,
    },

    data() {
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
                    formStyle: 'uk-form-stacked',
                },
            },
            editid: '',
            form: {},
        }, window.$data);
    },

    computed: {
        formfields() {
            return this.$refs.formfields ? this.$refs.formfields.fields : [];
        },
    },

    events: {
        'close.editmodal': function () {
            this.$refs.formfields.load();
        },
    },

    ready() {
        this.Forms = this.$resource('api/formmaker/form{/id}');
        this.tab = UIkit.tab(this.$els.tab, {connect: this.$els.content,});
    },

    methods: {

        save() {

            let data = {formitem: this.formitem,};

            this.$broadcast('save', data);

            this.Forms.save({id: this.formitem.id,}, data).then(function (res) {
                data = res.data;
                if (!this.formitem.id) {
                    window.history.replaceState({}, '', this.$url.route('admin/formmaker/form/edit', {id: data.formitem.id,}));
                }

                this.$set('formitem', data.formitem);

                this.$notify(this.$trans('Form %title% saved.', {title: this.formitem.title,}));

            }, function (data) {
                this.$notify(data, 'danger');
            });
        },

        editFormField(id) {
            this.editid = id;
            this.$refs.editmodal.open();
        },

    },

};

import filters from '../../lib/filters';

filters(Vue);
Vue.ready(vm);

export default vm;
