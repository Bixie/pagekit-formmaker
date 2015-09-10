<template>

    <div class="uk-alert" v-show="!formitem.id">{{ 'Save form before adding fields.' | trans }}</div>

    <div class="uk-margin uk-flex uk-flex-space-between uk-flex-wrap" data-uk-margin v-show="formitem.id">
        <div class="uk-flex uk-flex-middle uk-flex-wrap" data-uk-margin>

            <div class="uk-margin-left" v-show="selected.length">
                <ul class="uk-subnav pk-subnav-icon">
                    <li><a class="pk-icon-delete pk-icon-hover" title="{{ 'Delete' | trans }}"
                           data-uk-tooltip="{delay: 500}" v-on="click: removeFields"
                           v-confirm="'Delete field?' | trans"></a>
                    </li>
                </ul>
            </div>

        </div>
        <div class="uk-position-relative" data-uk-margin>

            <div data-uk-dropdown="{ mode: 'click' }">
                <a class="uk-button uk-button-primary" v-on="click: $event.preventDefault()">{{ 'Add Field' | trans
                    }}</a>

                <div class="uk-dropdown uk-dropdown-small uk-dropdown-flip">
                    <ul class="uk-nav uk-nav-dropdown">
                        <li v-repeat="type: types | orderBy 'label'"><a
                                v-on="click: editFormField(type.id)">{{ type.label }}</a></li>
                    </ul>
                </div>
            </div>

        </div>
    </div>

    <div class="uk-overflow-container">

        <div class="pk-table-fake pk-table-fake-header" v-class="pk-table-fake-border: !fields || !fields.length">
            <div class="pk-table-width-minimum pk-table-fake-nestable-padding">
                <input type="checkbox" v-check-all="selected: input[name=id]"><!-- //todo fix this! -->
            </div>
            <div class="pk-table-min-width-100">{{ 'Label' | trans }}</div>
            <div class="pk-table-width-100 uk-text-center">{{ 'Required' | trans }}</div>
            <div class="pk-table-width-150">{{ 'Type' | trans }}</div>
        </div>

        <ul class="uk-nestable uk-margin-remove" v-el="nestable" v-show="fields.length">
            <field v-repeat="field: fields | orderBy 'priority'"></field>

        </ul>

    </div>

    <h3 class="uk-h1 uk-text-muted uk-text-center" v-show="fields && !fields.length">{{ 'No fields found.' | trans
        }}</h3>

    <script id="field" type="text/template">
        <li class="uk-nestable-item" v-class="uk-active: isSelected(field)" data-id="{{ field.id }}">

            <div class="uk-nestable-panel pk-table-fake uk-form uk-visible-hover">
                <div class="pk-table-width-minimum pk-table-collapse">
                    <div class="uk-nestable-toggle" data-nestable-action="toggle"></div>
                </div>
                <div class="pk-table-width-minimum"><input type="checkbox" name="id" value="{{ field.id }}"
                    v-on="click: toggleSelect(field)"></div>
                <div class="pk-table-min-width-100">
                    <a v-on="click: editFormField(field.id)">{{ field.label }}</a><br/>
                    <small class="uk-text-muted">{{ field.slug }}</small>
                </div>
                <div class="pk-table-width-100 uk-text-center">
                    <td class="uk-text-center">
                        <a v-class="pk-icon-circle-danger: !field.data.required, pk-icon-circle-success: field.data.required"
                           v-on="click: toggleRequired(field)"></a>
                    </td>
                </div>
                <div class="pk-table-width-150 pk-table-max-width-150 uk-text-truncate">
                    {{ type.label }}
                </div>
            </div>


        </li>

    </script>
</template>

<script>

    module.exports = {

        inherit: true,

        data: function () {
            return {
                selected: [],
                editid: ''
            };
        },

        created: function () {
            this.Fields = this.$resource('api/formmaker/field/:id');
            this.load();
            this.$on('close.editmodal', function () {
                this.load();
            });
        },

        methods: {

            load: function () {
                return this.Fields.query({form_id: this.formitem.id}, function (data) {
                    this.$set('fields', data);
                    this.$set('selected', []);
                });
            },

            toggleRequired: function (field) {

                field.data.required = field.data.required ? 0 : 1;

                this.Fields.save({id: field.id}, {field: field}, function () {
                    this.load();
                    this.$notify('Field saved.');
                }, function (message) {
                    this.load();
                    this.$notify(message, 'danger');
                });
            },

            getSelected: function () {
                return this.fields.filter(function (field) {
                    return this.isSelected(field);
                }, this);
            },

            isSelected: function (field) {
                return this.selected.indexOf(field.id.toString()) !== -1;
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

            removeFields: function () {

                this.Fields.delete({id: 'bulk'}, {ids: this.selected}, function () {
                    this.load();
                    this.$notify('Field(s) deleted.');
                });
            }


        },

        components: {

            field: {

                inherit: true,
                template: '#field',

                computed: {
                    type: function () {
                        return this.getType(this.field);
                    }

                }
            }

        },

        watch: {

            fields: function () {

                var vm = this;

                // TODO this is still buggy
                UIkit.nestable(this.$$.nestable, {
                    maxDepth: 1,
                    group: 'userprofile.fields'
                }).off('change.uk.nestable').on('change.uk.nestable', function (e, nestable, el, type) {

                    if (type && type !== 'removed') {

                        vm.Fields.save({id: 'updateOrder'}, {fields: nestable.list()}, function () {

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
                            this.$notify('Reorder failed.', 'danger');
                        });
                    }
                });
            }
        },

        mixins: [window.Formmakerfields]

    };

</script>
