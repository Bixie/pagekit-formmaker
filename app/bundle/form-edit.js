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
	        this.Forms = this.$resource('api/formmaker/form{/id}');
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

	        formbasic: __webpack_require__(1),
	        formfields: __webpack_require__(4),
	        appearance: __webpack_require__(7),
	        submission: __webpack_require__(10),
	        emailsettings: __webpack_require__(16),
	        fieldedit: __webpack_require__(19)

	    }

	};

	__webpack_require__(31)(Vue);

	Vue.ready(module.exports);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(2)
	__vue_template__ = __webpack_require__(3)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "C:\\BixieProjects\\pagekit\\pagekit\\packages\\bixie\\formmaker\\app\\components\\form-basic.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	// <template>
	//
	//     <div class="uk-form-horizontal uk-margin">
	//
	//         <div class="uk-form-row">
	//             <label for="form-title" class="uk-form-label">{{ 'Title' | trans }}</label>
	//
	//             <div class="uk-form-controls">
	//                 <input id="form-title" class="uk-form-width-large" type="text" name="title"
	//                        v-model="formitem.title" v-validate:required>
	//             </div>
	//             <p class="uk-form-help-block uk-text-danger" v-show="form.title.invalid">{{ 'Please enter a title' | trans }}</p>
	//         </div>
	//         <div class="uk-form-row">
	//             <label for="form-slug" class="uk-form-label">{{ 'Slug' | trans }}</label>
	//
	//             <div class="uk-form-controls">
	//                 <input id="form-slug" class="uk-form-width-large" type="text" v-model="formitem.slug">
	//             </div>
	//         </div>
	//
	//         <div class="uk-form-row">
	//             <label for="form-status" class="uk-form-label">{{ 'Status' | trans }}</label>
	//
	//             <div class="uk-form-controls">
	//                 <select id="form-status" class="uk-form-width-large" v-model="formitem.status" number>
	//                     <option value="0">{{ 'Disabled' | trans }}</option>
	//                     <option value="1">{{ 'Enabled' | trans }}</option>
	//                 </select>
	//             </div>
	//         </div>
	//
	//         <div class="uk-form-row">
	//             <span class="uk-form-label">{{ 'Google reCAPTCHA' | trans }}</span>
	//
	//             <div class="uk-form-controls uk-form-controls-text">
	//                 <label v-show="config.recaptha_sitekey && config.recaptha_secret_key">
	//                     <input type="checkbox" value="hide-title" v-model="formitem.data.recaptcha"> {{ 'Use reCAPTCHA' |
	//                     trans }}</label>
	//                 <a  v-else class="uk-link-muted" :href="$url.route('admin/system/package/extensions')">{{ 'Enter reCAPTCHA keys in the extension settings' | trans }}</a>
	//             </div>
	//         </div>
	//
	//     </div>
	//
	// </template>
	//
	// <script>

	module.exports = {

	    props: ['formitem', 'config', 'form']

	};

	// </script>
	//

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = "\r\n\r\n    <div class=\"uk-form-horizontal uk-margin\">\r\n\r\n        <div class=\"uk-form-row\">\r\n            <label for=\"form-title\" class=\"uk-form-label\">{{ 'Title' | trans }}</label>\r\n\r\n            <div class=\"uk-form-controls\">\r\n                <input id=\"form-title\" class=\"uk-form-width-large\" type=\"text\" name=\"title\"\r\n                       v-model=\"formitem.title\" v-validate:required>\r\n            </div>\r\n            <p class=\"uk-form-help-block uk-text-danger\" v-show=\"form.title.invalid\">{{ 'Please enter a title' | trans }}</p>\r\n        </div>\r\n        <div class=\"uk-form-row\">\r\n            <label for=\"form-slug\" class=\"uk-form-label\">{{ 'Slug' | trans }}</label>\r\n\r\n            <div class=\"uk-form-controls\">\r\n                <input id=\"form-slug\" class=\"uk-form-width-large\" type=\"text\" v-model=\"formitem.slug\">\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"uk-form-row\">\r\n            <label for=\"form-status\" class=\"uk-form-label\">{{ 'Status' | trans }}</label>\r\n\r\n            <div class=\"uk-form-controls\">\r\n                <select id=\"form-status\" class=\"uk-form-width-large\" v-model=\"formitem.status\" number>\r\n                    <option value=\"0\">{{ 'Disabled' | trans }}</option>\r\n                    <option value=\"1\">{{ 'Enabled' | trans }}</option>\r\n                </select>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"uk-form-row\">\r\n            <span class=\"uk-form-label\">{{ 'Google reCAPTCHA' | trans }}</span>\r\n\r\n            <div class=\"uk-form-controls uk-form-controls-text\">\r\n                <label v-show=\"config.recaptha_sitekey && config.recaptha_secret_key\">\r\n                    <input type=\"checkbox\" value=\"hide-title\" v-model=\"formitem.data.recaptcha\"> {{ 'Use reCAPTCHA' |\r\n                    trans }}</label>\r\n                <a  v-else class=\"uk-link-muted\" :href=\"$url.route('admin/system/package/extensions')\">{{ 'Enter reCAPTCHA keys in the extension settings' | trans }}</a>\r\n            </div>\r\n        </div>\r\n\r\n    </div>\r\n\r\n";

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(5)
	__vue_template__ = __webpack_require__(6)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "C:\\BixieProjects\\pagekit\\pagekit\\packages\\bixie\\formmaker\\app\\components\\form-fields.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	// <template>
	//
	//     <div>
	//         <div class="uk-alert" v-show="!formitem.id">{{ 'Save form before adding fields.' | trans }}</div>
	//
	//         <div class="uk-margin uk-flex uk-flex-space-between uk-flex-wrap" data-uk-margin v-show="formitem.id">
	//             <div class="uk-flex uk-flex-middle uk-flex-wrap" data-uk-margin>
	//
	//                 <div class="uk-margin-left" v-show="selected.length">
	//                     <ul class="uk-subnav pk-subnav-icon">
	//                         <li><a class="pk-icon-delete pk-icon-hover" title="{{ 'Delete' | trans }}"
	//                                data-uk-tooltip="{delay: 500}" @click="removeFields"
	//                                v-confirm="'Delete field?' | trans"></a>
	//                         </li>
	//                     </ul>
	//                 </div>
	//
	//             </div>
	//             <div class="uk-position-relative" data-uk-margin>
	//
	//                 <div data-uk-dropdown="{ mode: 'click' }">
	//                     <a class="uk-button uk-button-primary" @click.prevent="">{{ 'Add Field' | trans
	//                         }}</a>
	//
	//                     <div class="uk-dropdown uk-dropdown-small uk-dropdown-flip">
	//                         <ul class="uk-nav uk-nav-dropdown">
	//                             <li v-for="type in types | orderBy 'label'">
	//                                 <a @click.prevent="$root.editFormField(type.id)">{{ type.label }}</a></li>
	//                         </ul>
	//                     </div>
	//                 </div>
	//
	//             </div>
	//         </div>
	//
	//         <div class="uk-overflow-container">
	//
	//             <div class="pk-table-fake pk-table-fake-header"
	//                  :class="{'pk-table-fake-border': !fields || !fields.length}">
	//                 <div class="pk-table-width-minimum pk-table-fake-nestable-padding">
	//                     <input type="checkbox" v-check-all:selected.literal="input[name=id]">
	//                 </div>
	//                 <div class="pk-table-min-width-100">{{ 'Label' | trans }}</div>
	//                 <div class="pk-table-width-100 uk-text-center">{{ 'Required' | trans }}</div>
	//                 <div class="pk-table-width-150">{{ 'Type' | trans }}</div>
	//             </div>
	//
	//             <ul class="uk-nestable uk-margin-remove" v-el:nestable v-show="fields.length">
	//                 <field v-for="field in fields | orderBy 'priority'" :field="field"></field>
	//
	//             </ul>
	//
	//         </div>
	//
	//         <h3 class="uk-h1 uk-text-muted uk-text-center" v-show="fields && !fields.length">{{ 'No fields found.' | trans
	//             }}</h3>
	//
	//         <script id="field" type="text/template">
	//             <li class="uk-nestable-item" :class="{'uk-active': $parent.isSelected(field)}" data-id="{{ field.id }}">
	//
	//                 <div class="uk-nestable-panel pk-table-fake uk-form uk-visible-hover">
	//                     <div class="pk-table-width-minimum pk-table-collapse">
	//                         <div class="uk-nestable-toggle" data-nestable-action="toggle"></div>
	//                     </div>
	//                     <div class="pk-table-width-minimum"><input type="checkbox" name="id" value="{{ field.id }}"
	//                                                                @click="toggleSelect(field)"></div>
	//                     <div class="pk-table-min-width-100">
	//                         <a v-if="type" @click.prevent="$root.editFormField(field.id)">{{ field.label }}</a>
	//                         <span v-else>{{ field.label }}</span>
	//                         <br/><small class="uk-text-muted">{{ field.slug }}</small>
	//                     </div>
	//                     <div class="pk-table-width-100 uk-text-center">
	//                         <td class="uk-text-center">
	//                             <a :class="{'pk-icon-circle-danger': !field.data.required, 'pk-icon-circle-success': field.data.required}"
	//                                @click.prevent="$parent.toggleRequired(field)"></a>
	//                         </td>
	//                     </div>
	//                     <div class="pk-table-width-150 pk-table-max-width-150 uk-text-truncate">
	//                         <span v-if="type">{{ type.label }}</span>
	//                         <span v-else class="uk-text-danger">{{ field.type }}: {{ 'type not found!' | trans}}</span>
	//                     </div>
	//                 </div>
	//
	//
	//             </li>
	//
	//         </script>
	//     </div>
	//
	//
	// </template>
	//
	// <script>

	module.exports = {

	    props: ['formitem', 'types', 'form'],

	    data: function data() {
	        return {
	            fields: [],
	            selected: [],
	            editid: ''
	        };
	    },

	    created: function created() {
	        this.Fields = this.$resource('api/formmaker/field{/id}');
	        this.load();
	    },

	    ready: function ready() {

	        var vm = this;

	        UIkit.nestable(this.$els.nestable, {
	            maxDepth: 20,
	            group: 'formmaker.fields'
	        }).on('change.uk.nestable', function (e, nestable, el, type) {

	            if (type && type !== 'removed') {

	                vm.Fields.save({ id: 'updateOrder' }, {
	                    fields: nestable.list()
	                }).then(vm.load, function () {
	                    this.$notify('Reorder failed.', 'danger');
	                });
	            }
	        });
	    },

	    methods: {

	        load: function load() {
	            return this.Fields.query({ form_id: this.formitem.id }).then(function (res) {
	                this.$set('fields', res.data);
	                this.$set('selected', []);
	            });
	        },

	        toggleRequired: function toggleRequired(field) {

	            field.data.required = field.data.required ? 0 : 1;

	            this.Fields.save({ id: field.id }, { field: field }).then(function () {
	                this.load();
	                this.$notify('Field saved.');
	            }, function (res) {
	                this.load();
	                this.$notify(res.data, 'danger');
	            });
	        },

	        getSelected: function getSelected() {
	            return this.fields.filter(function (field) {
	                return this.isSelected(field);
	            }, this);
	        },

	        isSelected: function isSelected(field) {
	            return this.selected.indexOf(field.id.toString()) !== -1;
	        },

	        toggleSelect: function toggleSelect(field) {

	            var index = this.selected.indexOf(field.id.toString());

	            if (index == -1) {
	                this.selected.push(field.id.toString());
	            } else {
	                this.selected.splice(index, 1);
	            }
	        },

	        getFieldType: function getFieldType(field) {
	            return _.find(this.types, 'id', field.type);
	        },

	        removeFields: function removeFields() {

	            this.Fields.delete({ id: 'bulk' }, { ids: this.selected }).then(function () {
	                this.load();
	                this.$notify('Field(s) deleted.');
	            });
	        }

	    },

	    components: {

	        field: {

	            props: ['field'],

	            template: '#field',

	            computed: {
	                type: function type() {
	                    return this.$parent.getFieldType(this.field);
	                }

	            }
	        }

	    },

	    mixins: [window.BixieFieldtypes]

	};

	// </script>
	//

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = "\r\n\r\n    <div>\r\n        <div class=\"uk-alert\" v-show=\"!formitem.id\">{{ 'Save form before adding fields.' | trans }}</div>\r\n\r\n        <div class=\"uk-margin uk-flex uk-flex-space-between uk-flex-wrap\" data-uk-margin v-show=\"formitem.id\">\r\n            <div class=\"uk-flex uk-flex-middle uk-flex-wrap\" data-uk-margin>\r\n\r\n                <div class=\"uk-margin-left\" v-show=\"selected.length\">\r\n                    <ul class=\"uk-subnav pk-subnav-icon\">\r\n                        <li><a class=\"pk-icon-delete pk-icon-hover\" title=\"{{ 'Delete' | trans }}\"\r\n                               data-uk-tooltip=\"{delay: 500}\" @click=\"removeFields\"\r\n                               v-confirm=\"'Delete field?' | trans\"></a>\r\n                        </li>\r\n                    </ul>\r\n                </div>\r\n\r\n            </div>\r\n            <div class=\"uk-position-relative\" data-uk-margin>\r\n\r\n                <div data-uk-dropdown=\"{ mode: 'click' }\">\r\n                    <a class=\"uk-button uk-button-primary\" @click.prevent=\"\">{{ 'Add Field' | trans\r\n                        }}</a>\r\n\r\n                    <div class=\"uk-dropdown uk-dropdown-small uk-dropdown-flip\">\r\n                        <ul class=\"uk-nav uk-nav-dropdown\">\r\n                            <li v-for=\"type in types | orderBy 'label'\">\r\n                                <a @click.prevent=\"$root.editFormField(type.id)\">{{ type.label }}</a></li>\r\n                        </ul>\r\n                    </div>\r\n                </div>\r\n\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"uk-overflow-container\">\r\n\r\n            <div class=\"pk-table-fake pk-table-fake-header\"\r\n                 :class=\"{'pk-table-fake-border': !fields || !fields.length}\">\r\n                <div class=\"pk-table-width-minimum pk-table-fake-nestable-padding\">\r\n                    <input type=\"checkbox\" v-check-all:selected.literal=\"input[name=id]\">\r\n                </div>\r\n                <div class=\"pk-table-min-width-100\">{{ 'Label' | trans }}</div>\r\n                <div class=\"pk-table-width-100 uk-text-center\">{{ 'Required' | trans }}</div>\r\n                <div class=\"pk-table-width-150\">{{ 'Type' | trans }}</div>\r\n            </div>\r\n\r\n            <ul class=\"uk-nestable uk-margin-remove\" v-el:nestable v-show=\"fields.length\">\r\n                <field v-for=\"field in fields | orderBy 'priority'\" :field=\"field\"></field>\r\n\r\n            </ul>\r\n\r\n        </div>\r\n\r\n        <h3 class=\"uk-h1 uk-text-muted uk-text-center\" v-show=\"fields && !fields.length\">{{ 'No fields found.' | trans\r\n            }}</h3>\r\n\r\n        <script id=\"field\" type=\"text/template\">\r\n            <li class=\"uk-nestable-item\" :class=\"{'uk-active': $parent.isSelected(field)}\" data-id=\"{{ field.id }}\">\r\n\r\n                <div class=\"uk-nestable-panel pk-table-fake uk-form uk-visible-hover\">\r\n                    <div class=\"pk-table-width-minimum pk-table-collapse\">\r\n                        <div class=\"uk-nestable-toggle\" data-nestable-action=\"toggle\"></div>\r\n                    </div>\r\n                    <div class=\"pk-table-width-minimum\"><input type=\"checkbox\" name=\"id\" value=\"{{ field.id }}\"\r\n                                                               @click=\"toggleSelect(field)\"></div>\r\n                    <div class=\"pk-table-min-width-100\">\r\n                        <a v-if=\"type\" @click.prevent=\"$root.editFormField(field.id)\">{{ field.label }}</a>\r\n                        <span v-else>{{ field.label }}</span>\r\n                        <br/><small class=\"uk-text-muted\">{{ field.slug }}</small>\r\n                    </div>\r\n                    <div class=\"pk-table-width-100 uk-text-center\">\r\n                        <td class=\"uk-text-center\">\r\n                            <a :class=\"{'pk-icon-circle-danger': !field.data.required, 'pk-icon-circle-success': field.data.required}\"\r\n                               @click.prevent=\"$parent.toggleRequired(field)\"></a>\r\n                        </td>\r\n                    </div>\r\n                    <div class=\"pk-table-width-150 pk-table-max-width-150 uk-text-truncate\">\r\n                        <span v-if=\"type\">{{ type.label }}</span>\r\n                        <span v-else class=\"uk-text-danger\">{{ field.type }}: {{ 'type not found!' | trans}}</span>\r\n                    </div>\r\n                </div>\r\n\r\n\r\n            </li>\r\n\r\n        </script>\r\n    </div>\r\n\r\n\r\n";

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(8)
	__vue_template__ = __webpack_require__(9)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "C:\\BixieProjects\\pagekit\\pagekit\\packages\\bixie\\formmaker\\app\\components\\form-appearance.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	// <template>
	//
	//     <div class="uk-form-horizontal">
	//
	//         <div class="uk-form-row">
	//             <span class="uk-form-label">{{ 'Title' | trans }}</span>
	//
	//             <div class="uk-form-controls uk-form-controls-text">
	//                 <label><input type="checkbox" value="hide-title" v-model="formitem.data.hide_title"> {{ 'Hide Title' |
	//                     trans }}</label>
	//             </div>
	//         </div>
	//
	//         <div class="uk-form-row">
	//             <label for="form-formstyle" class="uk-form-label">{{ 'Form style' | trans }}</label>
	//
	//             <div class="uk-form-controls">
	//                 <select id="form-formstyle" class="uk-form-width-large" v-model="formitem.data.formStyle">
	//                     <option value="uk-form-stacked">{{ 'Form stacked' | trans }}</option>
	//                     <option value="uk-form-horizontal">{{ 'Form horizontal' | trans }}</option>
	//                 </select>
	//             </div>
	//         </div>
	//
	//         <div class="uk-form-row">
	//             <label for="form-class" class="uk-form-label">{{ 'Class suffix' | trans }}</label>
	//
	//             <div class="uk-form-controls">
	//                 <input id="form-class" class="uk-form-width-large" type="text" v-model="formitem.data.classSfx">
	//             </div>
	//         </div>
	//
	//         <div class="uk-form-row">
	//             <label for="form-submit-button" class="uk-form-label">{{ 'Text submit button' | trans }}</label>
	//
	//             <div class="uk-form-controls">
	//                 <input id="form-submit-button" class="uk-form-width-large" type="text" v-model="formitem.data.submitButton">
	//             </div>
	//         </div>
	//
	//         <div class="uk-form-row" v-show="formitem.data.required">
	//             <label for="form-required-error" class="uk-form-label">{{ 'Required error message' | trans }}</label>
	//
	//             <div class="uk-form-controls">
	//                 <input id="form-required-error" class="uk-form-width-large" type="text"
	//                        v-model="formitem.data.requiredError">
	//             </div>
	//         </div>
	//
	//         <div class="uk-margin" v-show="formitem.data.recaptcha">
	//             <div class="uk-form-row">
	//                 <label for="form-recaptcha_label" class="uk-form-label">{{ 'reCAPTCHA label' | trans }}</label>
	//
	//                 <div class="uk-form-controls">
	//                     <input id="form-recaptcha_label" class="uk-form-width-large" type="text" name="recaptcha_label"
	//                            v-model="formitem.data.recaptcha_label" placeholder="{{ 'Empty for no label' | trans }}">
	//                 </div>
	//             </div>
	//
	//             <div class="uk-form-row">
	//                 <label for="form-recaptcha_label" class="uk-form-label">{{ 'reCAPTCHA setup' | trans }}</label>
	//
	//                 <div class="uk-form-controls">
	//                     <select class="uk-form-width-small" v-model="formitem.data.recaptcha_theme">
	//                         <option v-for="option in recaptcha_themes" :value="option.value">{{ option.text }}</option>
	//                     </select>
	//                     <select class="uk-form-width-small" v-model="formitem.data.recaptcha_type">
	//                         <option v-for="option in recaptcha_types" :value="option.value">{{ option.text }}</option>
	//                     </select>
	//                     <select class="uk-form-width-small" v-model="formitem.data.recaptcha_size">
	//                         <option v-for="option in recaptcha" :value="option.value">{{ option.text }}</option>
	//                     </select>
	//                 </div>
	//             </div>
	//
	//         </div>
	//
	//     </div>
	//
	// </template>
	//
	// <script>

	module.exports = {

	    props: ['formitem', 'form'],

	    data: function data() {
	        return {
	            recaptcha_themes: [{ value: '', text: this.$trans('- Style -') }, { value: 'light', text: this.$trans('Light') }, { value: 'dark', text: this.$trans('Dark') }],
	            recaptcha_types: [{ value: '', text: this.$trans('- Type -') }, { value: 'image', text: this.$trans('Image') }, { value: 'audio', text: this.$trans('Audio') }],
	            recaptcha_sizes: [{ value: '', text: this.$trans('- Size -') }, { value: 'normal', text: this.$trans('Normal') }, { value: 'compact ', text: this.$trans('Compact') }]
	        };
	    },

	    created: function created() {
	        this.formitem.data.recaptcha_theme = this.formitem.data.recaptcha_theme || '';
	        this.formitem.data.recaptcha_type = this.formitem.data.recaptcha_type || '';
	        this.formitem.data.recaptcha_size = this.formitem.data.recaptcha_size || '';
	    }

	};

	// </script>
	//

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = "\r\n\r\n    <div class=\"uk-form-horizontal\">\r\n\r\n        <div class=\"uk-form-row\">\r\n            <span class=\"uk-form-label\">{{ 'Title' | trans }}</span>\r\n\r\n            <div class=\"uk-form-controls uk-form-controls-text\">\r\n                <label><input type=\"checkbox\" value=\"hide-title\" v-model=\"formitem.data.hide_title\"> {{ 'Hide Title' |\r\n                    trans }}</label>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"uk-form-row\">\r\n            <label for=\"form-formstyle\" class=\"uk-form-label\">{{ 'Form style' | trans }}</label>\r\n\r\n            <div class=\"uk-form-controls\">\r\n                <select id=\"form-formstyle\" class=\"uk-form-width-large\" v-model=\"formitem.data.formStyle\">\r\n                    <option value=\"uk-form-stacked\">{{ 'Form stacked' | trans }}</option>\r\n                    <option value=\"uk-form-horizontal\">{{ 'Form horizontal' | trans }}</option>\r\n                </select>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"uk-form-row\">\r\n            <label for=\"form-class\" class=\"uk-form-label\">{{ 'Class suffix' | trans }}</label>\r\n\r\n            <div class=\"uk-form-controls\">\r\n                <input id=\"form-class\" class=\"uk-form-width-large\" type=\"text\" v-model=\"formitem.data.classSfx\">\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"uk-form-row\">\r\n            <label for=\"form-submit-button\" class=\"uk-form-label\">{{ 'Text submit button' | trans }}</label>\r\n\r\n            <div class=\"uk-form-controls\">\r\n                <input id=\"form-submit-button\" class=\"uk-form-width-large\" type=\"text\" v-model=\"formitem.data.submitButton\">\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"uk-form-row\" v-show=\"formitem.data.required\">\r\n            <label for=\"form-required-error\" class=\"uk-form-label\">{{ 'Required error message' | trans }}</label>\r\n\r\n            <div class=\"uk-form-controls\">\r\n                <input id=\"form-required-error\" class=\"uk-form-width-large\" type=\"text\"\r\n                       v-model=\"formitem.data.requiredError\">\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"uk-margin\" v-show=\"formitem.data.recaptcha\">\r\n            <div class=\"uk-form-row\">\r\n                <label for=\"form-recaptcha_label\" class=\"uk-form-label\">{{ 'reCAPTCHA label' | trans }}</label>\r\n\r\n                <div class=\"uk-form-controls\">\r\n                    <input id=\"form-recaptcha_label\" class=\"uk-form-width-large\" type=\"text\" name=\"recaptcha_label\"\r\n                           v-model=\"formitem.data.recaptcha_label\" placeholder=\"{{ 'Empty for no label' | trans }}\">\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"uk-form-row\">\r\n                <label for=\"form-recaptcha_label\" class=\"uk-form-label\">{{ 'reCAPTCHA setup' | trans }}</label>\r\n\r\n                <div class=\"uk-form-controls\">\r\n                    <select class=\"uk-form-width-small\" v-model=\"formitem.data.recaptcha_theme\">\r\n                        <option v-for=\"option in recaptcha_themes\" :value=\"option.value\">{{ option.text }}</option>\r\n                    </select>\r\n                    <select class=\"uk-form-width-small\" v-model=\"formitem.data.recaptcha_type\">\r\n                        <option v-for=\"option in recaptcha_types\" :value=\"option.value\">{{ option.text }}</option>\r\n                    </select>\r\n                    <select class=\"uk-form-width-small\" v-model=\"formitem.data.recaptcha_size\">\r\n                        <option v-for=\"option in recaptcha\" :value=\"option.value\">{{ option.text }}</option>\r\n                    </select>\r\n                </div>\r\n            </div>\r\n\r\n        </div>\r\n\r\n    </div>\r\n\r\n";

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(11)
	__vue_template__ = __webpack_require__(15)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "C:\\BixieProjects\\pagekit\\pagekit\\packages\\bixie\\formmaker\\app\\components\\form-submission.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// <template>
	//
	//     <div class="uk-form-horizontal uk-margin">
	//
	//         <div class="uk-grid">
	//             <div class="uk-width-medium-3-4">
	//
	//                 <div class="uk-form-row">
	//                     <label for="form-formstyle" class="uk-form-label">{{ 'After submit' | trans }}</label>
	//
	//                     <div class="uk-form-controls">
	//                         <select id="form-formstyle" class="uk-form-width-large" v-model="formitem.data.afterSubmit">
	//                             <option value="thankyou">{{ 'Show Thank you message' | trans }}</option>
	//                             <option value="redirect">{{ 'Redirect to page' | trans }}</option>
	//                         </select>
	//                     </div>
	//                 </div>
	//
	//                 <div class="uk-form-row" v-show="formitem.data.afterSubmit == 'thankyou'">
	//                     <v-editor id="formitem-thankyou" :value.sync="formitem.data.thankyou" :options="{markdown : formitem.data.thankyou_markdown}"></v-editor>
	//                     <p>
	//                         <label><input type="checkbox" v-model="formitem.data.thankyou_markdown"> {{ 'Enable Markdown' | trans }}</label>
	//                     </p>
	//                 </div>
	//
	//                 <div class="uk-form-row" v-show="formitem.data.afterSubmit == 'redirect'">
	//                     <label class="uk-form-label">{{ 'Redirect' | trans }}</label>
	//                     <div class="uk-form-controls">
	//                         <input-link class="uk-form-width-large" :link.sync="formitem.data.redirect"></input-link>
	//                     </div>
	//                 </div>
	//
	//             </div>
	//             <div class="uk-width-medium-1-4">
	//
	//                 <formfieldslist :fields="formfields"></formfieldslist>
	//
	//             </div>
	//         </div>
	//
	//     </div>
	//
	// </template>
	//
	// <script>

	module.exports = {

	    props: ['formitem', 'formfields', 'form'],

	    components: {
	        formfieldslist: __webpack_require__(12)
	    }
	};

	// </script>
	//

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(13)
	__vue_template__ = __webpack_require__(14)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "C:\\BixieProjects\\pagekit\\pagekit\\packages\\bixie\\formmaker\\app\\components\\form-fieldslist.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	// <template>
	//
	//     <h3>{{ 'Available variables' | trans }}</h3>
	//     <ul class="uk-list uk-list-line">
	//         <li v-for="field in fields">
	//             <kbd>{{ field.slug | shortcode 'label' }}</kbd><br>
	//             <kbd>{{ field.slug | shortcode 'value' }}</kbd>
	//         </li>
	//
	//         <li>
	//             <kbd v-for="key in ['id', 'form_id', 'email', 'ip', 'created']"
	//                  class="uk-display-block uk-margin-small-bottom">
	//                 {{ 'submission' | shortcode key }}</kbd>
	//         </li>
	//     </ul>
	//
	// </template>
	//
	// <script>

	module.exports = {

	    props: ['fields']

	};

	// </script>
	//

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = "\r\n\r\n    <h3>{{ 'Available variables' | trans }}</h3>\r\n    <ul class=\"uk-list uk-list-line\">\r\n        <li v-for=\"field in fields\">\r\n            <kbd>{{ field.slug | shortcode 'label' }}</kbd><br>\r\n            <kbd>{{ field.slug | shortcode 'value' }}</kbd>\r\n        </li>\r\n\r\n        <li>\r\n            <kbd v-for=\"key in ['id', 'form_id', 'email', 'ip', 'created']\"\r\n                 class=\"uk-display-block uk-margin-small-bottom\">\r\n                {{ 'submission' | shortcode key }}</kbd>\r\n        </li>\r\n    </ul>\r\n\r\n";

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = "\r\n\r\n    <div class=\"uk-form-horizontal uk-margin\">\r\n\r\n        <div class=\"uk-grid\">\r\n            <div class=\"uk-width-medium-3-4\">\r\n\r\n                <div class=\"uk-form-row\">\r\n                    <label for=\"form-formstyle\" class=\"uk-form-label\">{{ 'After submit' | trans }}</label>\r\n\r\n                    <div class=\"uk-form-controls\">\r\n                        <select id=\"form-formstyle\" class=\"uk-form-width-large\" v-model=\"formitem.data.afterSubmit\">\r\n                            <option value=\"thankyou\">{{ 'Show Thank you message' | trans }}</option>\r\n                            <option value=\"redirect\">{{ 'Redirect to page' | trans }}</option>\r\n                        </select>\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"uk-form-row\" v-show=\"formitem.data.afterSubmit == 'thankyou'\">\r\n                    <v-editor id=\"formitem-thankyou\" :value.sync=\"formitem.data.thankyou\" :options=\"{markdown : formitem.data.thankyou_markdown}\"></v-editor>\r\n                    <p>\r\n                        <label><input type=\"checkbox\" v-model=\"formitem.data.thankyou_markdown\"> {{ 'Enable Markdown' | trans }}</label>\r\n                    </p>\r\n                </div>\r\n\r\n                <div class=\"uk-form-row\" v-show=\"formitem.data.afterSubmit == 'redirect'\">\r\n                    <label class=\"uk-form-label\">{{ 'Redirect' | trans }}</label>\r\n                    <div class=\"uk-form-controls\">\r\n                        <input-link class=\"uk-form-width-large\" :link.sync=\"formitem.data.redirect\"></input-link>\r\n                    </div>\r\n                </div>\r\n\r\n            </div>\r\n            <div class=\"uk-width-medium-1-4\">\r\n\r\n                <formfieldslist :fields=\"formfields\"></formfieldslist>\r\n\r\n            </div>\r\n        </div>\r\n\r\n    </div>\r\n\r\n";

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(17)
	__vue_template__ = __webpack_require__(18)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "C:\\BixieProjects\\pagekit\\pagekit\\packages\\bixie\\formmaker\\app\\components\\form-email.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// <template>
	//
	//     <div class="uk-form-horizontal uk-margin">
	//
	//         <div class="uk-grid">
	//             <div class="uk-width-medium-3-4">
	//                 <div class="uk-form-row">
	//                     <label for="form-user_email_field" class="uk-form-label">{{ 'User email field' | trans }}</label>
	//
	//                     <div class="uk-form-controls">
	//                         <select id="form-user_email_field" class="uk-form-width-medium" v-model="formitem.data.user_email_field">
	//                             <option value="">{{ 'Select a field' | trans }}</option>
	//                             <option v-for="field in formfields | filterBy 'email' in 'type'" :value="field.slug">{{ field.label }}</option>
	//                         </select>
	//                     </div>
	//                 </div>
	//
	//                 <div class="uk-alert" v-show="formitem.data.user_email_field">
	//                     {{ 'Email address from field "%field%" will be used to confirm submission to the user.' | trans {field:formitem.data.user_email_field} }}</div>
	//                 <div class="uk-alert uk-alert-warning" v-show="!formitem.data.user_email_field">
	//                     {{ 'No email field is selected for user confirmation mail.' | trans }}</div>
	//
	//                 <div class="uk-form-row">
	//                     <label for="form-submitemail" class="uk-form-label">{{ 'Email copy of submission to' | trans }}</label>
	//
	//                     <div class="uk-form-controls">
	//                         <input id="form-submitemail" class="uk-form-width-large" type="text" name="submitemail"
	//                                v-model="formitem.data.submitEmail" v-validate:email v-validate:required="!!formitem.data.user_email_field">
	//                     <!-- //todo fix req message -->
	//                     <p class="uk-form-help-block uk-text-danger" v-show="form.submitemail.invalid">{{ 'Please enter valid email address' | trans }}</p>
	//
	//                     <p class="uk-form-help-block uk-text-danger" v-show="formitem.data.user_email_field && !formitem.data.submitEmail">
	//                         {{ 'No email will be sent to the user when no address is entered here!' | trans }}</p>
	//                 </div>
	//             </div>
	//
	//
	//                 <div class="uk-form-row">
	//                     <label for="form-emailsubject" class="uk-form-label">{{ 'Email subject' | trans }}</label>
	//
	//                     <div class="uk-form-controls">
	//                         <input id="form-emailsubject" class="uk-form-width-large" type="text" name="emailsubject"
	//                                v-model="formitem.data.email_subject">
	//                     </div>
	//
	//                 </div>
	//
	//                 <div class="uk-form-row">
	//                     <v-editor id="formitem-emailbody" :value.sync="formitem.data.email_body"
	//                               :options="{markdown : formitem.data.email_body_markdown}"></v-editor>
	//                     <p>
	//                         <label><input type="checkbox" v-model="formitem.data.email_body_markdown"> {{ 'Enable Markdown' | trans }}</label>
	//                     </p>
	//                 </div>
	//
	//             </div>
	//             <div class="uk-width-medium-1-4">
	//
	//                 <formfieldslist :fields="formfields"></formfieldslist>
	//
	//             </div>
	//         </div>
	//
	//     </div>
	//
	// </template>
	//
	// <script>

	module.exports = {

	    props: ['formitem', 'formfields', 'form'],

	    components: {
	        formfieldslist: __webpack_require__(12)
	    }

	};

	// </script>
	//

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = "\r\n\r\n    <div class=\"uk-form-horizontal uk-margin\">\r\n\r\n        <div class=\"uk-grid\">\r\n            <div class=\"uk-width-medium-3-4\">\r\n                <div class=\"uk-form-row\">\r\n                    <label for=\"form-user_email_field\" class=\"uk-form-label\">{{ 'User email field' | trans }}</label>\r\n\r\n                    <div class=\"uk-form-controls\">\r\n                        <select id=\"form-user_email_field\" class=\"uk-form-width-medium\" v-model=\"formitem.data.user_email_field\">\r\n                            <option value=\"\">{{ 'Select a field' | trans }}</option>\r\n                            <option v-for=\"field in formfields | filterBy 'email' in 'type'\" :value=\"field.slug\">{{ field.label }}</option>\r\n                        </select>\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"uk-alert\" v-show=\"formitem.data.user_email_field\">\r\n                    {{ 'Email address from field \"%field%\" will be used to confirm submission to the user.' | trans {field:formitem.data.user_email_field} }}</div>\r\n                <div class=\"uk-alert uk-alert-warning\" v-show=\"!formitem.data.user_email_field\">\r\n                    {{ 'No email field is selected for user confirmation mail.' | trans }}</div>\r\n\r\n                <div class=\"uk-form-row\">\r\n                    <label for=\"form-submitemail\" class=\"uk-form-label\">{{ 'Email copy of submission to' | trans }}</label>\r\n\r\n                    <div class=\"uk-form-controls\">\r\n                        <input id=\"form-submitemail\" class=\"uk-form-width-large\" type=\"text\" name=\"submitemail\"\r\n                               v-model=\"formitem.data.submitEmail\" v-validate:email v-validate:required=\"!!formitem.data.user_email_field\">\r\n                    <!-- //todo fix req message -->\r\n                    <p class=\"uk-form-help-block uk-text-danger\" v-show=\"form.submitemail.invalid\">{{ 'Please enter valid email address' | trans }}</p>\r\n\r\n                    <p class=\"uk-form-help-block uk-text-danger\" v-show=\"formitem.data.user_email_field && !formitem.data.submitEmail\">\r\n                        {{ 'No email will be sent to the user when no address is entered here!' | trans }}</p>\r\n                </div>\r\n            </div>\r\n\r\n\r\n                <div class=\"uk-form-row\">\r\n                    <label for=\"form-emailsubject\" class=\"uk-form-label\">{{ 'Email subject' | trans }}</label>\r\n\r\n                    <div class=\"uk-form-controls\">\r\n                        <input id=\"form-emailsubject\" class=\"uk-form-width-large\" type=\"text\" name=\"emailsubject\"\r\n                               v-model=\"formitem.data.email_subject\">\r\n                    </div>\r\n\r\n                </div>\r\n\r\n                <div class=\"uk-form-row\">\r\n                    <v-editor id=\"formitem-emailbody\" :value.sync=\"formitem.data.email_body\"\r\n                              :options=\"{markdown : formitem.data.email_body_markdown}\"></v-editor>\r\n                    <p>\r\n                        <label><input type=\"checkbox\" v-model=\"formitem.data.email_body_markdown\"> {{ 'Enable Markdown' | trans }}</label>\r\n                    </p>\r\n                </div>\r\n\r\n            </div>\r\n            <div class=\"uk-width-medium-1-4\">\r\n\r\n                <formfieldslist :fields=\"formfields\"></formfieldslist>\r\n\r\n            </div>\r\n        </div>\r\n\r\n    </div>\r\n\r\n";

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(20)
	__vue_template__ = __webpack_require__(30)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "C:\\BixieProjects\\pagekit\\pagekit\\packages\\bixie\\formmaker\\app\\components\\field-edit.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// <template>
	//     <div>
	//         <div class="uk-modal-spinner" v-show="!loaded"></div>
	//         <form v-else id="field-edit" class="uk-form" name="fieldform" v-validator="form" @submit.prevent="save | valid">
	//
	//             <div class="uk-margin uk-flex uk-flex-space-between uk-flex-wrap" data-uk-margin>
	//                 <div data-uk-margin>
	//
	//                     <h2 class="uk-margin-remove" v-if="field.id">{{ 'Edit' | trans }} {{ type.label }} <em>{{
	//                         field.label | trans }}</em></h2>
	//
	//                     <h2 class="uk-margin-remove" v-if="!field.id">{{ 'Add' | trans }} {{ type.label }} <em>{{
	//                         field.label | trans }}</em></h2>
	//
	//                 </div>
	//                 <div data-uk-margin>
	//
	//                     <a class="uk-button uk-margin-small-right uk-modal-close">{{ field.id ? 'Close' :
	//                         'Cancel' | trans }}</a>
	//                     <button class="uk-button uk-button-primary" type="submit">{{ 'Save' | trans }}</button>
	//
	//                 </div>
	//             </div>
	//
	//             <ul class="uk-tab" v-el:tab>
	//                 <li><a>{{ type.label | trans }}</a></li>
	//                 <li v-if="type.hasOptions"><a>{{ 'Options' | trans }}</a></li>
	//                 <li><a>{{ 'Appearance' | trans }}</a></li>
	//             </ul>
	//
	//             <div class="uk-switcher uk-margin" v-el:content>
	//                 <div>
	//                     <fieldbasic :field.sync="field" :type.sync="type" :roles="roles" :form="form"></fieldbasic>
	//                 </div>
	//                 <div v-if="type.hasOptions">
	//                     <fieldoptions :field.sync="field" :form="form"></fieldoptions>
	//                 </div>
	//                 <div>
	//                     <appearance :field.sync="field" :form="form"></appearance>
	//                 </div>
	//             </div>
	//
	//         </form>
	//     </div>
	//
	//
	// </template>
	//
	// <script>

	module.exports = {
	    data: function data() {
	        return {
	            loaded: false,
	            type: {
	                label: ''
	            },
	            field: {
	                label: '',
	                type: '',
	                priority: 0,
	                form_id: 0,
	                data: {
	                    value: [],
	                    data: {},
	                    classSfx: '',
	                    help_text: '',
	                    help_show: ''
	                }
	            },
	            roles: []
	        };
	    },

	    props: ['formitem', 'form', 'fieldid'],

	    created: function created() {
	        this.Fields = this.$resource('api/formmaker/field/edit');
	        this.Field = this.$resource('api/formmaker/field{/id}');
	    },

	    ready: function ready() {
	        this.Fields.query({ id: this.fieldid }).then(function (res) {
	            this.$set('field', res.data.field);
	            this.$set('type', res.data.type);
	            this.$set('roles', res.data.roles);
	            this.field.form_id = this.formitem.id;

	            UIkit.tab(this.$els.tab, { connect: this.$els.content });
	            this.loaded = true;
	        });
	    },

	    beforeDestroy: function beforeDestroy() {
	        this.$dispatch('close.editmodal');
	    },

	    methods: {

	        save: function save() {

	            var data = { field: this.field };

	            this.$broadcast('save', data);

	            this.Field.save({ id: this.field.id }, data).then(function (res) {

	                this.$set('field', res.data.field);

	                this.$notify(this.$trans('%type% saved.', { type: this.type.label }));
	            }, function (data) {
	                this.$notify(data, 'danger');
	            });
	        },
	        formFieldInvalid: function formFieldInvalid(fieldname) {
	            console.log(this.$parent);
	            console.log(this.$validator.validators);
	        }

	    },

	    components: {

	        fieldbasic: __webpack_require__(21),
	        fieldoptions: __webpack_require__(24),
	        appearance: __webpack_require__(27)

	    }

	};

	// </script>
	//

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(22)
	__vue_template__ = __webpack_require__(23)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "C:\\BixieProjects\\pagekit\\pagekit\\packages\\bixie\\formmaker\\app\\components\\field-basic.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';

	// <template>
	//
	//     <div class="uk-margin">
	//
	//         <div class="uk-grid">
	//             <div class="uk-width-medium-3-4 uk-form-horizontal">
	//
	//                 <partial name="fieldtype-basic"></partial>
	//
	//                 <fieldtypes class="uk-margin" v-show="!type.hasOptions || field.options.length"
	//                             v-ref:fieldtypes
	//                             :edit-type="field.type"
	//                             :fields="[field]"
	//                             :field.sync="field"
	//                             :form="form"></fieldtypes>
	//
	//                 <div id="type-settings" class="uk-margin"
	//                      :data-object.sync="field.data"
	//                      :field.sync="field"
	//                      :form="form"></div>
	//
	//             </div>
	//             <div class="uk-width-medium-1-4 uk-form-stacked">
	//
	//                 <partial name="fieldtype-settings"></partial>
	//
	//             </div>
	//         </div>
	//
	//     </div>
	//
	// </template>
	//
	// <script>

	module.exports = {

	    props: ['field', 'type', 'roles', 'form'],

	    computed: {
	        fieldSettings: function fieldSettings() {
	            var settings = this.field.type ? BixieFieldtypes.components[this.field.type].settings || BixieFieldtypes.components[this.field.type].options.settings : {},
	                parent = this;
	            if (settings.template !== undefined) {
	                new Vue(_.merge({
	                    'el': '#type-settings',
	                    'name': 'type-settings',
	                    'parent': parent,
	                    'data': _.merge({
	                        'field': parent.field,
	                        'form': parent.form
	                    }, settings.data)
	                }, settings));
	                return false;
	            }
	            return settings;
	        }
	    }

	};
	// </script>
	//

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = "\r\n\r\n    <div class=\"uk-margin\">\r\n\r\n        <div class=\"uk-grid\">\r\n            <div class=\"uk-width-medium-3-4 uk-form-horizontal\">\r\n\r\n                <partial name=\"fieldtype-basic\"></partial>\r\n\r\n                <fieldtypes class=\"uk-margin\" v-show=\"!type.hasOptions || field.options.length\"\r\n                            v-ref:fieldtypes\r\n                            :edit-type=\"field.type\"\r\n                            :fields=\"[field]\"\r\n                            :field.sync=\"field\"\r\n                            :form=\"form\"></fieldtypes>\r\n\r\n                <div id=\"type-settings\" class=\"uk-margin\"\r\n                     :data-object.sync=\"field.data\"\r\n                     :field.sync=\"field\"\r\n                     :form=\"form\"></div>\r\n\r\n            </div>\r\n            <div class=\"uk-width-medium-1-4 uk-form-stacked\">\r\n\r\n                <partial name=\"fieldtype-settings\"></partial>\r\n\r\n            </div>\r\n        </div>\r\n\r\n    </div>\r\n\r\n";

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(25)
	__vue_template__ = __webpack_require__(26)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "C:\\BixieProjects\\pagekit\\pagekit\\packages\\bixie\\formmaker\\app\\components\\field-options.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';

	// <template>
	//
	//     <div class="uk-form-horizontal">
	//
	//         <div class="uk-form-row">
	//             <span class="uk-form-label">{{ 'Manage options' | trans }}</span>
	//
	//             <div class="uk-form-controls uk-form-controls-text">
	//                 <ul class="uk-nestable uk-margin-remove" v-el:options-nestable v-show="field.options.length">
	//                     <selectoption v-for="selectoption in field.options"
	//                                   :selectoption.sync="selectoption"
	//                                   :read-only="readOnly"></selectoption>
	//                 </ul>
	//                 <button v-if="!readOnly" type="button" class="uk-button uk-button-primary uk-button-small uk-margin"
	//                         @click="addFieldoption">{{ 'Add option' | trans }}
	//                 </button>
	//             </div>
	//         </div>
	//
	//     </div>
	// </template>
	//
	// <script>

	module.exports = {

	    props: ['field', 'form'],

	    methods: {
	        addFieldoption: function addFieldoption() {
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
	        deleteFieldoption: function deleteFieldoption(idx) {
	            this.field.options.$remove(idx);
	            this.checkDuplicates();
	        },
	        checkDuplicates: function checkDuplicates() {
	            var current,
	                dups = [];
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

	    ready: function ready() {
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
	        readOnly: function readOnly() {
	            return !!this.field.data.readonlyOptions;
	        }
	    },

	    components: {

	        selectoption: {

	            template: '<li class="uk-nestable-item" data-value="{{ selectoption.value }}">\n    <div v-if="!readOnly" class="uk-nestable-panel uk-visible-hover uk-form uk-flex uk-flex-middle">\n        <div class="uk-flex-item-1">\n            <div class="uk-form-row">\n                <small class="uk-form-label uk-text-muted uk-text-truncate" style="text-transform: none"\n                       v-show="selectoption.attachValue"\n                       :class="{\'uk-text-danger\': selectoption.invalid}">{{ selectoption.value }}</small>\n                <span class="uk-form-label" v-show="!selectoption.attachValue">\n                    <input type="text" class="uk-form-small"\n                           @keyup="safeValue(true)"\n                           :class="{\'uk-text-danger\': selectoption.invalid}"\n                           v-model="selectoption.value"/></span>\n                <div class="uk-form-controls">\n                    <input type="text" class="uk-form-width-large" v-model="selectoption.text"/></div>\n                <p class="uk-form-help-block uk-text-danger" v-show="selectoption.invalid">{{ selectoption.invalid | trans }}</p>\n\n            </div>\n        </div>\n        <div class="">\n            <ul class="uk-subnav pk-subnav-icon">\n                <li><a class="uk-icon uk-margin-small-top pk-icon-hover uk-invisible"\n                       data-uk-tooltip="{delay: 500}" :title="\'Link/Unlink value from label\' | trans"\n                       :class="{\'uk-icon-link\': !selectoption.attachValue, \'uk-icon-chain-broken\': selectoption.attachValue}"\n                       @click.prevent="selectoption.attachValue = !selectoption.attachValue"></a></li>\n                <li><a class="pk-icon-delete pk-icon-hover uk-invisible" @click="$parent.deleteFieldoption(selectoption)"></a></li>\n                <li><a class="pk-icon-move pk-icon-hover uk-invisible uk-nestable-handle"></a></li>\n            </ul>\n        </div>\n    </div>\n    <div v-else>\n        {{ selectoption.text }}\n    </div>\n</li>   \n',

	            props: ['selectoption', 'readOnly'],

	            methods: {
	                safeValue: function safeValue(checkDups) {
	                    this.selectoption.value = _.escape(_.snakeCase(this.selectoption.value));
	                    if (checkDups) {
	                        this.$parent.checkDuplicates();
	                    }
	                }
	            },

	            watch: {
	                "selectoption.text": function selectoptionText(value) {
	                    if (this.selectoption.attachValue) {
	                        this.selectoption.value = _.escape(_.snakeCase(value));
	                    }
	                    this.$parent.checkDuplicates();
	                }

	            }
	        }

	    }
	};

	// </script>
	//

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = "\r\n\r\n    <div class=\"uk-form-horizontal\">\r\n\r\n        <div class=\"uk-form-row\">\r\n            <span class=\"uk-form-label\">{{ 'Manage options' | trans }}</span>\r\n\r\n            <div class=\"uk-form-controls uk-form-controls-text\">\r\n                <ul class=\"uk-nestable uk-margin-remove\" v-el:options-nestable v-show=\"field.options.length\">\r\n                    <selectoption v-for=\"selectoption in field.options\"\r\n                                  :selectoption.sync=\"selectoption\"\r\n                                  :read-only=\"readOnly\"></selectoption>\r\n                </ul>\r\n                <button v-if=\"!readOnly\" type=\"button\" class=\"uk-button uk-button-primary uk-button-small uk-margin\"\r\n                        @click=\"addFieldoption\">{{ 'Add option' | trans }}\r\n                </button>\r\n            </div>\r\n        </div>\r\n\r\n    </div>\r\n";

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(28)
	__vue_template__ = __webpack_require__(29)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "C:\\BixieProjects\\pagekit\\pagekit\\packages\\bixie\\formmaker\\app\\components\\field-appearance.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 28 */
/***/ function(module, exports) {

	'use strict';

	// <template>
	//
	//     <div class="uk-form-horizontal">
	//
	//         <partial name="fieldtype-appearance"></partial>
	//
	//         <fields :config="appearanceSettings" :model.sync="field.data" template="formrow"></fields>
	//
	//     </div>
	//
	// </template>
	//
	// <script>

	module.exports = {

	    props: ['field', 'form'],

	    computed: {
	        appearanceSettings: function appearanceSettings() {
	            return this.field.type ? BixieFieldtypes.components[this.field.type].appearance || BixieFieldtypes.components[this.field.type].options.appearance : {};
	        }
	    }

	};

	// </script>
	//

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = "\r\n\r\n    <div class=\"uk-form-horizontal\">\r\n\r\n        <partial name=\"fieldtype-appearance\"></partial>\r\n\r\n        <fields :config=\"appearanceSettings\" :model.sync=\"field.data\" template=\"formrow\"></fields>\r\n\r\n    </div>\r\n\r\n";

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = "\r\n    <div>\r\n        <div class=\"uk-modal-spinner\" v-show=\"!loaded\"></div>\r\n        <form v-else id=\"field-edit\" class=\"uk-form\" name=\"fieldform\" v-validator=\"form\" @submit.prevent=\"save | valid\">\r\n\r\n            <div class=\"uk-margin uk-flex uk-flex-space-between uk-flex-wrap\" data-uk-margin>\r\n                <div data-uk-margin>\r\n\r\n                    <h2 class=\"uk-margin-remove\" v-if=\"field.id\">{{ 'Edit' | trans }} {{ type.label }} <em>{{\r\n                        field.label | trans }}</em></h2>\r\n\r\n                    <h2 class=\"uk-margin-remove\" v-if=\"!field.id\">{{ 'Add' | trans }} {{ type.label }} <em>{{\r\n                        field.label | trans }}</em></h2>\r\n\r\n                </div>\r\n                <div data-uk-margin>\r\n\r\n                    <a class=\"uk-button uk-margin-small-right uk-modal-close\">{{ field.id ? 'Close' :\r\n                        'Cancel' | trans }}</a>\r\n                    <button class=\"uk-button uk-button-primary\" type=\"submit\">{{ 'Save' | trans }}</button>\r\n\r\n                </div>\r\n            </div>\r\n\r\n            <ul class=\"uk-tab\" v-el:tab>\r\n                <li><a>{{ type.label | trans }}</a></li>\r\n                <li v-if=\"type.hasOptions\"><a>{{ 'Options' | trans }}</a></li>\r\n                <li><a>{{ 'Appearance' | trans }}</a></li>\r\n            </ul>\r\n\r\n            <div class=\"uk-switcher uk-margin\" v-el:content>\r\n                <div>\r\n                    <fieldbasic :field.sync=\"field\" :type.sync=\"type\" :roles=\"roles\" :form=\"form\"></fieldbasic>\r\n                </div>\r\n                <div v-if=\"type.hasOptions\">\r\n                    <fieldoptions :field.sync=\"field\" :form=\"form\"></fieldoptions>\r\n                </div>\r\n                <div>\r\n                    <appearance :field.sync=\"field\" :form=\"form\"></appearance>\r\n                </div>\r\n            </div>\r\n\r\n        </form>\r\n    </div>\r\n\r\n\r\n";

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = function (Vue) {

	    Vue.filter('datetime', function (date) {
	        if (typeof date === 'string') {
	            date = new Date(date);
	        }
	        return date ? this.$date(date, 'mediumDate') + ', ' + this.$date(date, 'HH:mm:ss') : '';
	    });

	    Vue.filter('shortcode', function (slug, key) {
	        return '$$ ' + slug + ':' + key + ' $$';
	    });

	};

/***/ }
/******/ ]);