module.exports = {

    el: '#formmaker-forms',

    data: function () {
        return _.merge({
            forms: false,
            pages: 0,
            count: '',
            types: [],
            selected: []
        }, window.$data);
    },

    created: function () {
        this.Forms = this.$resource('api/formmaker/form{/id}');
        this.load();
    },

    methods: {

        load: function () {
            return this.Forms.query().then(function (res) {
                this.$set('forms', res.data);
            });
        },

        toggleStatus: function (formitem) {

            formitem.status = formitem.status ? 0 : 1;

            this.Forms.save({id: formitem.id}, {formitem: formitem}).then(function () {
                this.load();
                this.$notify('Form saved.');
            }, function (message) {
                this.load();
                this.$notify(message, 'danger');
            });
        },

        getSelected: function () {
            return this.forms.filter(function (field) {
                return this.isSelected(field);
            }, this);
        },

        isSelected: function (field, children) {

            if (_.isArray(field)) {
                return _.every(field, function (field) {
                    return this.isSelected(field, children);
                }, this);
            }

            return this.selected.indexOf(field.id) !== -1;
        },

        getFieldType: function (field) {
            return _.find(this.types, 'id', field.type);
        },

        removeForms: function () {

            this.Forms.delete({id: 'bulk'}, {ids: this.selected}).then(function () {
                this.load();
                this.$notify('Forms(s) deleted.');
            });
        }

    },

    components: {

        formitem: {

            props: ['formitem'],

            template: '#formitem',

            computed: {
                type: function () {
                    return this.getFieldType(this.field);
                }

            }
        }

    },

    watch: {

        forms: function () {

            var vm = this;

            // TODO this is still buggy
            UIkit.nestable(this.$els.nestable, {
                maxDepth: 1,
                group: 'formmaker.forms'
            }).off('change.uk.nestable').on('change.uk.nestable', function (e, nestable, el, type) {

                if (type && type !== 'removed') {

                    vm.Forms.save({id: 'updateOrder'}, {forms: nestable.list()}).then(function () {

                        // @TODO reload everything on reorder really needed?
                        vm.load().success(function () {

                            // hack for weird flickr bug
                            if (el.parent()[0] === nestable.element[0]) {
                                setTimeout(function () {
                                    el.remove();
                                }, 50);
                            }
                        });

                    }, function () {
                        this.$notify('Reorder failed.', 'danger');
                    });
                }
            });
        }
    }

};

Vue.ready(module.exports);

