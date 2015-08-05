module.exports = {

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
        this.Forms = this.$resource('api/formmaker/form/:id');
        this.load();
    },

    methods: {

        load: function () {
            return this.Forms.query(function (data) {
                this.$set('forms', data);
            });
        },

        toggleStatus: function (formitem) {

            formitem.status = formitem.status ? 0 : 1;

            this.Forms.save({id: formitem.id}, {formitem: formitem}, function () {
                this.load();
                UIkit.notify('Form saved.');
            }, function (message) {
                this.load();
                UIkit.notify(message, {status: 'danger'});
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

            return this.selected.indexOf(field.id.toString()) !== -1 && (!children || !this.tree[field.id] || this.isSelected(this.tree[field.id], true));
        },

        toggleSelect: function (field) {

            var index = this.selected.indexOf(field.id.toString());

            if (index == -1) {
                this.selected.push(field.id.toString());
            } else {
                this.selected.splice(index, 1);
            }
        },

        getType: function (field) {
            return _.find(this.types, 'id', field.type);
        },

        removeForms: function () {

            this.Forms.delete({id: 'bulk'}, {ids: this.selected}, function () {
                this.load();
                UIkit.notify('Forms(s) deleted.');
            });
        }

    },

    components: {

        formitem: {

            inherit: true,
            template: '#formitem',

            computed: {
                type: function () {
                    return this.getType(this.field);
                }

            }
        }

    },

    watch: {

        forms: function () {

            var vm = this;

            // TODO this is still buggy
            UIkit.nestable(this.$$.nestable, {
                maxDepth: 1,
                group: 'formmaker.forms'
            }).off('change.uk.nestable').on('change.uk.nestable', function (e, nestable, el, type) {

                if (type && type !== 'removed') {

                    vm.Forms.save({id: 'updateOrder'}, {forms: nestable.list()}, function () {

                        // @TODO reload everything on reorder really needed?
                        vm.load().success(function () {

                            // hack for weird flickr bug
                            if (el.parent()[0] === nestable.element[0]) {
                                setTimeout(function () {
                                    el.remove();
                                }, 50);
                            }
                        });

                    }).error(function () {
                        UIkit.notify(this.$trans('Reorder failed.'), 'danger');
                    });
                }
            });
        }
    }

};

$(function () {

    new Vue(module.exports).$mount('#formmaker-forms');

});

