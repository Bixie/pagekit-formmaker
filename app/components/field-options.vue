<template>

    <div class="uk-form-horizontal">

        <div class="uk-form-row">
            <span class="uk-form-label">{{ 'Manage options' | trans }}</span>

            <div class="uk-form-controls uk-form-controls-text">
                <ul class="uk-nestable uk-margin-remove" v-el:options-nestable v-show="field.options.length">
                    <selectoption v-for="selectoption in field.options"
                                  :selectoption.sync="selectoption"
                                  :read-only="readOnly"></selectoption>
                </ul>
                <button v-if="!readOnly" type="button" class="uk-button uk-button-primary uk-button-small uk-margin"
                        @click="addFieldoption">{{ 'Add option' | trans }}
                </button>
            </div>
        </div>

    </div>
</template>

<script>

    module.exports = {

        props: ['field', 'form'],

        methods: {
            addFieldoption: function () {
                this.field.options.push({
                    value: '',
                    text: '',
                    attachValue: true,
                    invalid: false
                });
                this.$nextTick(function () {
                    $(this.$els.optionsNestable).find('input:last').focus();
                });
            },
            deleteFieldoption: function (idx) {
                this.field.options.$remove(idx);
                this.checkDuplicates();
            },
            checkDuplicates: function () {
                var current, dups = [];
                _.sortBy(this.field.options, 'value').forEach(function (option) {
                    if (current && current === option.value) {
                        dups.push(option.value);
                    }
                    current = option.value;
                });
                this.field.options.forEach(function (option) {
                    option.invalid = dups.indexOf(option.value) > -1 ? 'Duplicate value' : false;
                });
            }
        },

        ready: function () {
            if (!this.readOnly) {
                var vm = this;
                UIkit.nestable(this.$els.optionsNestable, {
                    maxDepth: 1,
                    handleClass: 'uk-nestable-handle',
                    group: 'formmaker.selectoptions'
                }).on('change.uk.nestable', function (e, nestable, el, type) {
                    if (type && type !== 'removed') {

                        var options = [];
                        _.forEach(nestable.list(), function (option) {
                            //todo can't reorder options with empty value
                            options.push(_.find(vm.field.options, 'value', option.value));
                        });

                        vm.$set('field.options', options);

                    }
                });
            }

        },

        computed: {
            readOnly: function () {
                return !!this.field.data.readonlyOptions;
            }
        },

        components: {

            selectoption: {

                template: '<li class="uk-nestable-item" data-value="{{ selectoption.value }}">\n    <div v-if="!readOnly" class="uk-nestable-panel uk-visible-hover uk-form uk-flex uk-flex-middle">\n        <div class="uk-flex-item-1">\n            <div class="uk-form-row">\n                <small class="uk-form-label uk-text-muted uk-text-truncate" style="text-transform: none"\n                       v-show="selectoption.attachValue"\n                       :class="{\'uk-text-danger\': selectoption.invalid}">{{ selectoption.value }}</small>\n                <span class="uk-form-label" v-show="!selectoption.attachValue">\n                    <input type="text" class="uk-form-small"\n                           @keyup="safeValue(true)"\n                           :class="{\'uk-text-danger\': selectoption.invalid}"\n                           v-model="selectoption.value"/></span>\n                <div class="uk-form-controls">\n                    <input type="text" class="uk-form-width-large" v-model="selectoption.text"/></div>\n                <p class="uk-form-help-block uk-text-danger" v-show="selectoption.invalid">{{ selectoption.invalid | trans }}</p>\n\n            </div>\n        </div>\n        <div class="">\n            <ul class="uk-subnav pk-subnav-icon">\n                <li><a class="uk-icon uk-margin-small-top pk-icon-hover uk-invisible"\n                       data-uk-tooltip="{delay: 500}" :title="\'Link/Unlink value from label\' | trans"\n                       :class="{\'uk-icon-link\': !selectoption.attachValue, \'uk-icon-chain-broken\': selectoption.attachValue}"\n                       @click.prevent="selectoption.attachValue = !selectoption.attachValue"></a></li>\n                <li><a class="pk-icon-delete pk-icon-hover uk-invisible" @click="$parent.deleteFieldoption(selectoption)"></a></li>\n                <li><a class="pk-icon-move pk-icon-hover uk-invisible uk-nestable-handle"></a></li>\n            </ul>\n        </div>\n    </div>\n    <div v-else>\n        {{ selectoption.text }}\n    </div>\n</li>   \n',

                props: ['selectoption', 'readOnly'],

                methods: {
                    safeValue: function (checkDups) {
                        this.selectoption.value = _.escape(_.snakeCase(this.selectoption.value));
                        if (checkDups) {
                            this.$parent.checkDuplicates();
                        }
                    }
                },

                watch: {
                    "selectoption.text": function (value) {
                        if (this.selectoption.attachValue) {
                            this.selectoption.value = _.escape(_.snakeCase(value));
                        }
                        this.$parent.checkDuplicates();
                    }

                }
            }

        }
    };

</script>
