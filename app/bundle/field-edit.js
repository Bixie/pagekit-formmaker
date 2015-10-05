var Forms =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = Vue.extend({

	    data: function () {
	        return _.merge({
	            field: {
	                data: {
	                    classSfx: '',
	                    required: false
	                }
	            }
	        }, window.$data);
	    },

	    created: function () {
	        if (this.type.required !== -1) this.field.data.required = this.type.required;
	        if (this.type.multiple !== -1) this.field.data.multiple = this.type.multiple;
	    },

	    ready: function () {
	        this.Forms = this.$resource('api/formmaker/field/:id');
	        this.tab = UIkit.tab(this.$$.tab, {connect: this.$$.content});
	    },

	    computed: {
	    },

	    methods: {

	        save: function (e) {

	            e.preventDefault();

	            var data = {field: this.field};

	            this.$broadcast('save', data);

	            this.Forms.save({id: this.field.id}, data, function (data) {

	                if (!this.field.id) {
	                    window.history.replaceState({}, '', this.$url.route('admin/formmaker/edit', {id: data.field.id}))
	                }

	                this.$set('field', data.field);

	                this.$notify(this.$trans('%type% saved.', {type: this.type.label}));

	            }, function (data) {
	                this.$notify(data, 'danger');
	            });
	        }

	    },

	    components: {

	        fieldbasic: __webpack_require__(1),
	        fieldoptions: __webpack_require__(2),
	        appearance: __webpack_require__(3)

	    }

	});

	$(function () {

	    (new module.exports()).$mount('#field-edit');

	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	var __vue_template__ = "<div class=\"uk-form-horizontal uk-margin\">\n\n        <div class=\"uk-form-row\">\n            <label for=\"form-label\" class=\"uk-form-label\">{{ 'Label' | trans }}</label>\n\n            <div class=\"uk-form-controls\">\n                <input id=\"form-label\" class=\"uk-form-width-large\" type=\"text\" name=\"label\" v-model=\"field.label\" v-validate=\"required\">\n            </div>\n            <p class=\"uk-form-help-block uk-text-danger\" v-show=\"form.label.invalid\">{{ 'Please enter a label' | trans }}</p>\n        </div>\n\n        <div v-if=\"type.required < 0\" class=\"uk-form-row\">\n            <span class=\"uk-form-label\">{{ 'Field required' | trans }}</span>\n\n            <div class=\"uk-form-controls uk-form-controls-text\">\n                <label><input type=\"checkbox\" value=\"required\" v-model=\"field.data.required\"> {{ 'Required' | trans\n                    }}</label>\n            </div>\n        </div>\n\n        <div v-if=\"type.multiple < 0\" class=\"uk-form-row\">\n            <span class=\"uk-form-label\">{{ 'Multiple values' | trans }}</span>\n\n            <div class=\"uk-form-controls uk-form-controls-text\">\n                <label><input type=\"checkbox\" value=\"multiple\" v-model=\"field.data.multiple\"> {{ 'Multiple' | trans\n                    }}</label>\n            </div>\n        </div>\n\n        <div class=\"uk-form-row\">\n            <span class=\"uk-form-label\">{{ 'Restrict Access' | trans }}</span>\n\n            <div class=\"uk-form-controls uk-form-controls-text\">\n                <p v-repeat=\"role: roles\" class=\"uk-form-controls-condensed\">\n                    <label><input type=\"checkbox\" value=\"{{ role.id }}\" v-checkbox=\"field.roles\"> {{ role.name\n                        }}</label>\n                </p>\n            </div>\n        </div>\n\n        <input type=\"hidden\" v-model=\"field.priority\">\n    </div>";
	module.exports = {

	        inherit: true,

	        props: ['field']

	    };
	;(typeof module.exports === "function"? module.exports.options: module.exports).template = __vue_template__;


/***/ },
/* 2 */
/***/ function(module, exports) {

	var __vue_template__ = "<div class=\"uk-form-horizontal\">\n\n        <div class=\"uk-form-row\">\n            <span class=\"uk-form-label\">{{ 'Manage options' | trans }}</span>\n\n            <div class=\"uk-form-controls uk-form-controls-text\">\n                <ul class=\"uk-nestable uk-margin-remove\" v-el=\"optionsNestable\" v-show=\"field.options.length\">\n                    <selectoption v-repeat=\"selectoption: field.options\"></selectoption>\n                </ul>\n                <button type=\"button\" class=\"uk-button uk-button-primary uk-button-small uk-margin\" v-on=\"click: addFieldoption\">{{ 'Add option' | trans}}\n                </button>\n            </div>\n        </div>\n\n    </div>";
	module.exports = {

	        props: ['field'],

	        methods: {
	            addFieldoption: function () {
	                this.field.options.push({
	                    value: '',
	                    text: '',
	                    attachValue: true,
	                    invalid: false
	                });
	                this.$nextTick(function () {
	                    $(this.$$.optionsNestable).find('input:last').focus();
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
	            var vm = this;
	            UIkit.nestable(this.$$.optionsNestable, {
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

	        },

	        components: {

	            selectoption: {

	                template: '<li class="uk-nestable-item" data-value="{{ selectoption.value }}">\n    <div class="uk-nestable-panel uk-visible-hover uk-form uk-flex uk-flex-middle">\n        <div class="uk-flex-item-1">\n            <div class="uk-form-row">\n                <small class="uk-form-label uk-text-muted uk-text-truncate" style="text-transform: none"\n                       v-show="selectoption.attachValue"\n                       v-class="uk-text-danger: selectoption.invalid">{{ selectoption.value }}</small>\n                <span class="uk-form-label" v-show="!selectoption.attachValue">\n                    <input type="text" class="uk-form-small"\n                           v-on="keyup: safeValue(true)"\n                           v-class="uk-text-danger: selectoption.invalid"\n                           v-model="selectoption.value"/></span>\n                <div class="uk-form-controls">\n                    <input type="text" class="uk-form-width-large" v-model="selectoption.text"/></div>\n                <p class="uk-form-help-block uk-text-danger" v-show="selectoption.invalid">{{ selectoption.invalid | trans }}</p>\n\n            </div>\n        </div>\n        <div class="">\n            <ul class="uk-subnav pk-subnav-icon">\n                <li><a class="uk-icon uk-margin-small-top pk-icon-hover uk-invisible"\n                       data-uk-tooltip="{delay: 500}" title="{{ \'Link/Unlink value from label\' | trans}}"\n                       v-class="uk-icon-link: !selectoption.attachValue, uk-icon-chain-broken: selectoption.attachValue"\n                       v-on="click: selectoption.attachValue = !selectoption.attachValue"></a></li>\n                <li><a class="pk-icon-delete pk-icon-hover uk-invisible" v-on="click: deleteFieldoption($index)"></a></li>\n                <li><a class="pk-icon-move pk-icon-hover uk-invisible uk-nestable-handle"></a></li>\n            </ul>\n        </div>\n    </div>\n</li>   \n',

	                inherit: true,

	                methods: {
	                    safeValue: function (checkDups) {
	                        this.selectoption.value = _.escape(_.snakeCase(this.selectoption.value));
	                        if (checkDups) {
	                            this.checkDuplicates();
	                        }
	                    }
	                },

	                watch: {
	                    "selectoption.text": function (value) {
	                        if (this.selectoption.attachValue) {
	                            this.selectoption.value = _.escape(_.snakeCase(value));
	                        }
	                        this.checkDuplicates();
	                    }

	                }
	            }

	        }
	    };
	;(typeof module.exports === "function"? module.exports.options: module.exports).template = __vue_template__;


/***/ },
/* 3 */
/***/ function(module, exports) {

	var __vue_template__ = "<div class=\"uk-form-horizontal\">\n\n        <div class=\"uk-form-row\">\n            <span class=\"uk-form-label\">{{ 'Label' | trans }}</span>\n\n            <div class=\"uk-form-controls uk-form-controls-text\">\n                <label><input type=\"checkbox\" value=\"hide-label\" v-model=\"field.data.hide_label\"> {{ 'Hide Label' |\n                    trans }}</label>\n            </div>\n        </div>\n\n        <div class=\"uk-form-row\">\n            <label for=\"form-class\" class=\"uk-form-label\">{{ 'Class suffix' | trans }}</label>\n\n            <div class=\"uk-form-controls\">\n                <input id=\"form-class\" class=\"uk-form-width-large\" type=\"text\" v-model=\"field.data.classSfx\">\n            </div>\n        </div>\n\n        <div class=\"uk-form-row\" v-show=\"field.data.required\">\n            <label for=\"form-required-error\" class=\"uk-form-label\">{{ 'Required error message' | trans }}</label>\n\n            <div class=\"uk-form-controls\">\n                <input id=\"form-required-error\" class=\"uk-form-width-large\" type=\"text\" v-model=\"field.data.requiredError\">\n            </div>\n        </div>\n\n    </div>";
	module.exports = {

	        inherit: true,

	        props: ['field']

	    };
	;(typeof module.exports === "function"? module.exports.options: module.exports).template = __vue_template__;


/***/ }
/******/ ]);