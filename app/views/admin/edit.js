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

    events: {
        'close.editmodal': function () {
            this.$refs.formfields.load();
        }
    },

    ready: function () {
        this.Forms = this.$resource('api/formmaker/form/:id');
        this.tab = UIkit.tab(this.$els.tab, {connect: this.$els.content});
    },

    computed: {
        formfields: function () {
            return this.$refs.formfields ? this.$refs.formfields.fields : [];
        }
    },

    methods: {

        save: function () {

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

        editFormField: function (id) {
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

Vue.field.templates.formrow = require('../../templates/formrow.html');
Vue.field.templates.raw = require('../../templates/raw.html');
Vue.field.types.text = '<input type="text" v-bind="attrs" v-model="value">';
Vue.field.types.textarea = '<textarea v-bind="attrs" v-model="value"></textarea>';
Vue.field.types.select = '<select v-bind="attrs" v-model="value"><option v-for="option in options" :value="option">{{ $key }}</option></select>';
Vue.field.types.radio = '<p class="uk-form-controls-condensed"><label v-for="option in options"><input type="radio" :value="option" v-model="value"> {{ $key | trans }}</label></p>';
Vue.field.types.checkbox = '<p class="uk-form-controls-condensed"><label><input type="checkbox" v-bind="attrs" v-model="value" v-bind:true-value="1" v-bind:false-value="0" number> {{ optionlabel | trans }}</label></p>';
Vue.field.types.number = '<input type="number" v-bind="attrs" v-model="value" number>';
Vue.field.types.title = '<h3 v-bind="attrs">{{ title | trans }}</h3>';
Vue.field.types.editor = '<v-editor :value.sync="value" :options="{markdown : field.markdown}" v-bind="attrs"></v-editor>';

Vue.ready(module.exports);
