module.exports = {

    props: ['isAdmin'],

    methods: {
        getDataObject: function (defaultValue) {
            if (this.isAdmin) {
                this.field.data.value = this.field.data.value || defaultValue;
                return this.field.data;
            }
            this.submission.data[this.field.id].type = this.field.type;
            this.submission.data[this.field.id].label = this.field.label;
            this.submission.data[this.field.id].value = defaultValue;
            return this.submission.data[this.field.id];
        },
        fieldInvalid: function (form) {
            return form[this.fieldid].invalid;
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