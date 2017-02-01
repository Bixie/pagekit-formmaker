<template>

    <div class="uk-form-horizontal">

        <div class="uk-form-row">
            <span class="uk-form-label">{{ 'Manage options' | trans }}</span>

            <div class="uk-form-controls uk-form-controls-text">
                <ul v-if="type.optionTypeEmail" class="uk-nestable uk-margin-remove" v-el:options-nestable v-show="field.options.length">
                    <selectoption-email v-for="selectoption in field.options"
                                  :selectoption.sync="selectoption"
                                  :read-only="readOnly"></selectoption-email>
                </ul>
                <ul v-else class="uk-nestable uk-margin-remove" v-el:options-nestable v-show="field.options.length">
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

        props: ['field', 'form', 'type'],

        methods: {
            addFieldoption() {
                var options = {
                    value: '',
                    text: '',
                    attachValue: true,
                    invalid: false
                };
                if(this.type.optionTypeEmail) {
                    options['email'] = '';
                }
                this.field.options.push(options);
                this.$nextTick(() => $(this.$els.optionsNestable).find('input:last').focus());
            },
            deleteFieldoption(idx) {
                this.field.options.$remove(idx);
                this.checkDuplicates();
            },
            checkDuplicates() {
                var current, dups = [];
                _.sortBy(this.field.options, 'value').forEach(option => {
                    if (current && current === option.value) {
                        dups.push(option.value);
                    }
                    current = option.value;
                });
                this.field.options.forEach(option => {
                    option.invalid = dups.indexOf(option.value) > -1 ? 'Duplicate value' : false;
                });
            }
        },

        ready() {
            if (!this.readOnly) {
                var vm = this;
                UIkit.nestable(this.$els.optionsNestable, {
                    maxDepth: 1,
                    handleClass: 'uk-nestable-handle',
                    group: 'formmaker.selectoptions'
                }).on('change.uk.nestable', (e, nestable, el, type) => {
                    if (type && type !== 'removed') {

                        var options = [];
                        _.forEach(nestable.list(),option => {
                            //todo can't reorder options with empty value
                            options.push(_.find(vm.field.options, 'value', option.value));
                        });

                        vm.$set('field.options', options);

                    }
                });
            }

        },

        computed: {
            readOnly() {
                return !!this.field.data.readonlyOptions;
            }
        },

        components: {

            selectoption: {

                template: '<li class="uk-nestable-item" data-value="{{ selectoption.value }}">\n    <div v-if="!readOnly" class="uk-nestable-panel uk-visible-hover uk-form uk-flex uk-flex-middle">\n        <div class="uk-flex-item-1">\n            <div class="uk-form-row">\n                <small class="uk-form-label uk-text-muted uk-text-truncate" style="text-transform: none"\n                       v-show="selectoption.attachValue"\n                       :class="{\'uk-text-danger\': selectoption.invalid}">{{ selectoption.value }}</small>\n                <span class="uk-form-label" v-show="!selectoption.attachValue">\n                    <input type="text" class="uk-form-small"\n                           @keyup="safeValue(true)"\n                           :class="{\'uk-text-danger\': selectoption.invalid}"\n                           v-model="selectoption.value"/></span>\n                <div class="uk-form-controls">\n                    <input type="text" class="uk-form-width-large" v-model="selectoption.text"/>\n                </div>\n                <p class="uk-form-help-block uk-text-danger" v-show="selectoption.invalid">{{ selectoption.invalid | trans }}</p>\n            </div>\n        </div>\n        <div class="">\n            <ul class="uk-subnav pk-subnav-icon">\n                <li><a class="uk-icon uk-margin-small-top pk-icon-hover uk-invisible"\n                       data-uk-tooltip="{delay: 500}" :title="\'Link/Unlink value from label\' | trans"\n                       :class="{\'uk-icon-link\': !selectoption.attachValue, \'uk-icon-chain-broken\': selectoption.attachValue}"\n                       @click.prevent="selectoption.attachValue = !selectoption.attachValue"></a></li>\n                <li><a class="pk-icon-delete pk-icon-hover uk-invisible" @click="$parent.deleteFieldoption(selectoption)"></a></li>\n                <li><a class="pk-icon-move pk-icon-hover uk-invisible uk-nestable-handle"></a></li>\n            </ul>\n        </div>\n    </div>\n    <div v-else>\n        {{ selectoption.text }}\n    </div>\n</li>\n',

                props: ['selectoption', 'readOnly'],

                methods: {
                    safeValue(checkDups) {
                        this.selectoption.value = _.escape(_.snakeCase(this.selectoption.value));
                        if (checkDups) {
                            this.$parent.checkDuplicates();
                        }
                    }
                },

                watch: {
                    "selectoption.text"(value) {
                        if (this.selectoption.attachValue) {
                            this.selectoption.value = _.escape(_.snakeCase(value));
                        }
                        this.$parent.checkDuplicates();
                    }

                }
            },

            'selectoption-email': {

                template: '<li v-validator="validateSelectoption" class="uk-nestable-item" data-value="{{ selectoption.value }}">\n    <div v-if="!readOnly" class="uk-nestable-panel uk-visible-hover uk-form uk-flex uk-flex-middle">\n        <div class="uk-flex-item-1">\n            <div class="uk-form-row">\n                <span class="uk-form-label">{{ "Value" | trans }}</span>\n                <div class="uk-form-controls">\n                    <input :disabled="selectoption.attachValue" type="text" class="uk-form-width-large" @keyup="safeValue(true)" :class="{\'uk-text-danger\': selectoption.invalid}" v-model="selectoption.value"/>\n                <p class="uk-form-help-block uk-text-danger" v-show="selectoption.invalid">{{ selectoption.invalid | trans }}</p>\n                </div>\n                <span class="uk-form-label">{{ "Label" | trans }}</span>\n                <div class="uk-form-controls">                    <input type="text" class="uk-form-width-large" v-model="selectoption.text"/>\n                    </div>\n                <span class="uk-form-label">{{ "Email" | trans }}</span>\n                <div class="uk-form-controls">\n                    <input name="email" type="email" class="uk-form-width-large" v-model="selectoption.email" :class="{\'uk-text-danger\': invalidEmail}" v-validate:required="true" v-validate:email/>\n                    <p class="uk-form-help-block uk-text-danger" v-show="invalidEmail">{{ invalidEmail | trans }}</p>\n                </div>\n            </div>\n        </div>\n        <div class="">\n            <ul class="uk-subnav pk-subnav-icon">\n                <li><a class="uk-icon uk-margin-small-top pk-icon-hover uk-invisible" data-uk-tooltip="{delay: 500}" :title="\'Link/Unlink value from label\' | trans" :class="{\'uk-icon-link\': !selectoption.attachValue, \'uk-icon-chain-broken\': selectoption.attachValue}" @click.prevent="toggleAttachValue()"></a></li>\n                <li><a class="pk-icon-delete pk-icon-hover uk-invisible" @click="$parent.deleteFieldoption(selectoption)"></a></li>\n                <li><a class="pk-icon-move pk-icon-hover uk-invisible uk-nestable-handle"></a></li>\n            </ul>\n        </div>\n    </div>\n    <div v-else>\n        {{ selectoption.text }}\n    </div>\n</li>\n',

                props: ['selectoption', 'readOnly'],

                methods: {
                    safeValue(checkDups) {
                        this.selectoption.value = _.escape(_.snakeCase(this.selectoption.value));
                        if (checkDups) {
                            this.$parent.checkDuplicates();
                        }
                    },
                    checkAttachValue() {
                        if (this.selectoption.attachValue) {
                            this.selectoption.value = this.selectoption.text;
                        }
                        this.safeValue(true);
                    },
                    toggleAttachValue() {
                        this.selectoption.attachValue = !this.selectoption.attachValue;
                        this.checkAttachValue();
                    }
                },

                computed: {
                    invalidEmail: function() {
                        if(this.validateSelectoption) {
                            return this.validateSelectoption.email.invalid ? 'Please enter a valid email address' : false;
                        }
                        return false;
                    }
                },

                watch: {
                    "selectoption.text"(value) {
                        this.checkAttachValue();
                    }
                }
            }

        }
    };

</script>
