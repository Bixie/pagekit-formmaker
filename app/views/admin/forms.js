module.exports = {

    el: '#formmaker-forms',

    data() {
        return _.merge({
            forms: false,
            pages: 0,
            count: '',
            types: [],
            selected: []
        }, window.$data);
    },

    created() {
        this.Forms = this.$resource('api/formmaker/form{/id}');
        this.load();
    },

    methods: {

        load() {
            return this.Forms.query().then(res => {
                this.$set('forms', res.data);
            });
        },

        toggleStatus(formitem) {

            formitem.status = formitem.status ? 0 : 1;

            this.Forms.save({id: formitem.id}, {formitem: formitem}).then(res => {
                this.load();
                this.$notify('Form saved.');
            }, res => {
                this.load();
                this.$notify(res.data.message || res.data, 'danger');
            });
        },

        getSelected() {
            return this.forms.filter(field => this.isSelected(field));
        },

        isSelected(field, children) {

            if (_.isArray(field)) {
                return field.forEach(field => this.isSelected(field, children));
            }

            return this.selected.indexOf(field.id) !== -1;
        },

        getFieldType(field) {
            return _.find(this.types,{id: field.type});
        },

        removeForms() {

            this.Forms.delete({id: 'bulk'}, {ids: this.selected}).then(() => {
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
                type() {
                    return this.getFieldType(this.field);
                }

            }
        }

    },

    watch: {

        forms() {

            var vm = this;

            // TODO this is still buggy
            UIkit.nestable(this.$els.nestable, {
                maxDepth: 1,
                group: 'formmaker.forms'
            }).off('change.uk.nestable').on('change.uk.nestable', (e, nestable, el, type) => {

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

                    }, () => this.$notify('Reorder failed.', 'danger'));
                }
            });
        }
    }

};

Vue.ready(module.exports);

