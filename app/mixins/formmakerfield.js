module.exports = window.FormmakerfieldMixin = {

    props: ['isAdmin', 'submission', 'field', 'form'],

    methods: {
        getDataObject: function (defaultValue) {
            if (this.isAdmin) {
                this.field.data.value = this.field.data.value || defaultValue;
                return this.field.data;
            }
            this.submission.data[this.field.id].type = this.field.type;
            this.submission.data[this.field.id].label = this.field.label;
            this.submission.data[this.field.id].value = defaultValue;
            this.submission.data[this.field.id].prepared = this.field.prepared;
            return this.submission.data[this.field.id];
        },
        fieldInvalid: function (form) {
            return form && form[this.fieldid] ? form[this.fieldid].invalid : false;
        }

    },

    computed: {
        fieldRequired: function () {
            return this.field.data.required && !this.isAdmin ? true : false;
        },
        fieldLabel: function () {
            return this.isAdmin ? 'Default value' : this.field.label;
        }
    }

};