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
	            formitem: {
	                data: {
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
	            editid: ''
	        }, window.$data);
	    },

	    created: function () {
	        this.$on('close.editmodal', function () {
	            this.$.formfields.load();
	        });
	    },

	    ready: function () {
	        this.Forms = this.$resource('api/formmaker/form/:id');
	        this.tab = UIkit.tab(this.$$.tab, {connect: this.$$.content});
	    },

	    computed: {
	        afterSubmitOptions: function () {
	            return [
	                { value: 'thankyou', text: this.$trans('Show Thank you message')},
	                { value: 'redirect', text: this.$trans('Redirect to page')}
	            ];
	        },
	        formfields: function () {
	            return this.$.formfields.fields;
	        }
	    },

	    methods: {

	        save: function (e) {

	            e.preventDefault();

	            var data = {formitem: this.formitem};

	            this.$broadcast('save', data);

	            this.Forms.save({id: this.formitem.id}, data, function (data) {

	                if (!this.formitem.id) {
	                    window.history.replaceState({}, '', this.$url.route('admin/formmaker/form/edit', {id: data.formitem.id}))
	                }

	                this.$set('formitem', data.formitem);

	                this.$notify(this.$trans('Form %title% saved.', {title: this.formitem.title}));

	            }, function (data) {
	                this.$notify(data, 'danger');
	            });
	        },

	        editFormField: function (id) {
	            this.editid = id;
	            this.$.editmodal.open();
	//                this.$nextTick(function () {
	//                    //todo close dropdown ;~!
	//                    $(this.$.editmodal.$el).find('.uk-modal-dialog').focus();
	//                });
	        }
	    },

	    components: {

	        formbasic: __webpack_require__(26),
	        formfields: __webpack_require__(29),
	        formfieldslist: __webpack_require__(32),
	        appearance: __webpack_require__(35),
	        submission: __webpack_require__(38),
	        emailsettings: __webpack_require__(41),
	        fieldedit: __webpack_require__(44)

	    }

	});

	__webpack_require__(56)(Vue);

	$(function () {

	    (new module.exports()).$mount('#form-edit');

	});


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(27)

	if (module.exports.__esModule) module.exports = module.exports.default
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(28)
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "C:\\BixieProjects\\pagekit\\pagekit\\packages\\bixie\\formmaker\\app\\components\\form-basic.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
	  }
	})()}

/***/ },
/* 27 */
/***/ function(module, exports) {

	"use strict";

	// <template>

	//     <div class="uk-form-horizontal uk-margin">

	//         <div class="uk-form-row">

	//             <label for="form-title" class="uk-form-label">{{ 'Title' | trans }}</label>

	//             <div class="uk-form-controls">

	//                 <input id="form-title" class="uk-form-width-large" type="text" name="title"

	//                        v-model="formitem.title" v-validate="required">

	//             </div>

	//             <p class="uk-form-help-block uk-text-danger" v-show="form.title.invalid">{{ 'Please enter a title' | trans }}</p>

	//         </div>

	//         <div class="uk-form-row">

	//             <label for="form-slug" class="uk-form-label">{{ 'Slug' | trans }}</label>

	//             <div class="uk-form-controls">

	//                 <input id="form-slug" class="uk-form-width-large" type="text" v-model="formitem.slug">

	//             </div>

	//         </div>

	//         <div class="uk-form-row">

	//             <label for="form-status" class="uk-form-label">{{ 'Status' | trans }}</label>

	//             <div class="uk-form-controls">

	//                 <select id="form-status" class="uk-form-width-large" v-model="formitem.status" number>

	//                     <option value="0">{{ 'Disabled' | trans }}</option>

	//                     <option value="1">{{ 'Enabled' | trans }}</option>

	//                 </select>

	//             </div>

	//         </div>

	//         <div class="uk-form-row">

	//             <span class="uk-form-label">{{ 'Google reCAPTCHA' | trans }}</span>

	//             <div class="uk-form-controls uk-form-controls-text">

	//                 <label v-show="config.recaptha_sitekey && config.recaptha_secret_key">

	//                     <input type="checkbox" value="hide-title" v-model="formitem.data.recaptcha"> {{ 'Use reCAPTCHA' |

	//                     trans }}</label>

	//                 <a  v-show="!(config.recaptha_sitekey && config.recaptha_secret_key)"

	//                     class="uk-link-muted" v-attr="href: $url.route('admin/system/package/extensions')">{{ 'Enter reCAPTCHA keys in the extension settings' | trans }}</a>

	//             </div>

	//         </div>

	//     </div>

	// </template>

	// <script>

	module.exports = {

	    inherit: true

	};

	// </script>

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = "<div class=\"uk-form-horizontal uk-margin\">\r\n\r\n        <div class=\"uk-form-row\">\r\n            <label for=\"form-title\" class=\"uk-form-label\">{{ 'Title' | trans }}</label>\r\n\r\n            <div class=\"uk-form-controls\">\r\n                <input id=\"form-title\" class=\"uk-form-width-large\" type=\"text\" name=\"title\"\r\n                       v-model=\"formitem.title\" v-validate=\"required\">\r\n            </div>\r\n            <p class=\"uk-form-help-block uk-text-danger\" v-show=\"form.title.invalid\">{{ 'Please enter a title' | trans }}</p>\r\n        </div>\r\n        <div class=\"uk-form-row\">\r\n            <label for=\"form-slug\" class=\"uk-form-label\">{{ 'Slug' | trans }}</label>\r\n\r\n            <div class=\"uk-form-controls\">\r\n                <input id=\"form-slug\" class=\"uk-form-width-large\" type=\"text\" v-model=\"formitem.slug\">\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"uk-form-row\">\r\n            <label for=\"form-status\" class=\"uk-form-label\">{{ 'Status' | trans }}</label>\r\n\r\n            <div class=\"uk-form-controls\">\r\n                <select id=\"form-status\" class=\"uk-form-width-large\" v-model=\"formitem.status\" number>\r\n                    <option value=\"0\">{{ 'Disabled' | trans }}</option>\r\n                    <option value=\"1\">{{ 'Enabled' | trans }}</option>\r\n                </select>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"uk-form-row\">\r\n            <span class=\"uk-form-label\">{{ 'Google reCAPTCHA' | trans }}</span>\r\n\r\n            <div class=\"uk-form-controls uk-form-controls-text\">\r\n                <label v-show=\"config.recaptha_sitekey && config.recaptha_secret_key\">\r\n                    <input type=\"checkbox\" value=\"hide-title\" v-model=\"formitem.data.recaptcha\"> {{ 'Use reCAPTCHA' |\r\n                    trans }}</label>\r\n                <a  v-show=\"!(config.recaptha_sitekey && config.recaptha_secret_key)\"\r\n                    class=\"uk-link-muted\" v-attr=\"href: $url.route('admin/system/package/extensions')\">{{ 'Enter reCAPTCHA keys in the extension settings' | trans }}</a>\r\n            </div>\r\n        </div>\r\n\r\n    </div>";

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(30)

	if (module.exports.__esModule) module.exports = module.exports.default
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(31)
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "C:\\BixieProjects\\pagekit\\pagekit\\packages\\bixie\\formmaker\\app\\components\\form-fields.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
	  }
	})()}

/***/ },
/* 30 */
/***/ function(module, exports) {

	'use strict';

	// <template>

	//     <div class="uk-alert" v-show="!formitem.id">{{ 'Save form before adding fields.' | trans }}</div>

	//     <div class="uk-margin uk-flex uk-flex-space-between uk-flex-wrap" data-uk-margin v-show="formitem.id">

	//         <div class="uk-flex uk-flex-middle uk-flex-wrap" data-uk-margin>

	//             <div class="uk-margin-left" v-show="selected.length">

	//                 <ul class="uk-subnav pk-subnav-icon">

	//                     <li><a class="pk-icon-delete pk-icon-hover" title="{{ 'Delete' | trans }}"

	//                            data-uk-tooltip="{delay: 500}" v-on="click: removeFields"

	//                            v-confirm="'Delete field?' | trans"></a>

	//                     </li>

	//                 </ul>

	//             </div>

	//         </div>

	//         <div class="uk-position-relative" data-uk-margin>

	//             <div data-uk-dropdown="{ mode: 'click' }">

	//                 <a class="uk-button uk-button-primary" v-on="click: $event.preventDefault()">{{ 'Add Field' | trans

	//                     }}</a>

	//                 <div class="uk-dropdown uk-dropdown-small uk-dropdown-flip">

	//                     <ul class="uk-nav uk-nav-dropdown">

	//                         <li v-repeat="type: types | orderBy 'label'"><a

	//                                 v-on="click: editFormField(type.id)">{{ type.label }}</a></li>

	//                     </ul>

	//                 </div>

	//             </div>

	//         </div>

	//     </div>

	//     <div class="uk-overflow-container">

	//         <div class="pk-table-fake pk-table-fake-header" v-class="pk-table-fake-border: !fields || !fields.length">

	//             <div class="pk-table-width-minimum pk-table-fake-nestable-padding">

	//                 <input type="checkbox" v-check-all="selected: input[name=id]"><!-- //todo fix this! -->

	//             </div>

	//             <div class="pk-table-min-width-100">{{ 'Label' | trans }}</div>

	//             <div class="pk-table-width-100 uk-text-center">{{ 'Required' | trans }}</div>

	//             <div class="pk-table-width-150">{{ 'Type' | trans }}</div>

	//         </div>

	//         <ul class="uk-nestable uk-margin-remove" v-el="nestable" v-show="fields.length">

	//             <field v-repeat="field: fields | orderBy 'priority'"></field>

	//         </ul>

	//     </div>

	//     <h3 class="uk-h1 uk-text-muted uk-text-center" v-show="fields && !fields.length">{{ 'No fields found.' | trans

	//         }}</h3>

	//     <script id="field" type="text/template">

	//         <li class="uk-nestable-item" v-class="uk-active: isSelected(field)" data-id="{{ field.id }}">

	//             <div class="uk-nestable-panel pk-table-fake uk-form uk-visible-hover">

	//                 <div class="pk-table-width-minimum pk-table-collapse">

	//                     <div class="uk-nestable-toggle" data-nestable-action="toggle"></div>

	//                 </div>

	//                 <div class="pk-table-width-minimum"><input type="checkbox" name="id" value="{{ field.id }}"

	//                     v-on="click: toggleSelect(field)"></div>

	//                 <div class="pk-table-min-width-100">

	//                     <a v-on="click: editFormField(field.id)">{{ field.label }}</a><br/>

	//                     <small class="uk-text-muted">{{ field.slug }}</small>

	//                 </div>

	//                 <div class="pk-table-width-100 uk-text-center">

	//                     <td class="uk-text-center">

	//                         <a v-class="pk-icon-circle-danger: !field.data.required, pk-icon-circle-success: field.data.required"

	//                            v-on="click: toggleRequired(field)"></a>

	//                     </td>

	//                 </div>

	//                 <div class="pk-table-width-150 pk-table-max-width-150 uk-text-truncate">

	//                     {{ type.label }}

	//                 </div>

	//             </div>

	//         </li>

	//     </script>

	// </template>

	// <script>

	module.exports = {

	    inherit: true,

	    data: function data() {
	        return {
	            selected: [],
	            editid: ''
	        };
	    },

	    created: function created() {
	        this.Fields = this.$resource('api/formmaker/field/:id');
	        this.load();
	    },

	    methods: {

	        load: function load() {
	            return this.Fields.query({ form_id: this.formitem.id }, function (data) {
	                this.$set('fields', data);
	                this.$set('selected', []);
	            });
	        },

	        toggleRequired: function toggleRequired(field) {

	            field.data.required = field.data.required ? 0 : 1;

	            this.Fields.save({ id: field.id }, { field: field }, function () {
	                this.load();
	                this.$notify('Field saved.');
	            }, function (message) {
	                this.load();
	                this.$notify(message, 'danger');
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

	        getType: function getType(field) {
	            return _.find(this.types, 'id', field.type);
	        },

	        removeFields: function removeFields() {

	            this.Fields.delete({ id: 'bulk' }, { ids: this.selected }, function () {
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
	                type: function type() {
	                    return this.getType(this.field);
	                }

	            }
	        }

	    },

	    watch: {

	        fields: function fields() {

	            var vm = this;

	            // TODO this is still buggy
	            UIkit.nestable(this.$$.nestable, {
	                maxDepth: 1,
	                group: 'userprofile.fields'
	            }).off('change.uk.nestable').on('change.uk.nestable', function (e, nestable, el, type) {

	                if (type && type !== 'removed') {

	                    vm.Fields.save({ id: 'updateOrder' }, { fields: nestable.list() }, function () {

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

	// </script>

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = "<div class=\"uk-alert\" v-show=\"!formitem.id\">{{ 'Save form before adding fields.' | trans }}</div>\r\n\r\n    <div class=\"uk-margin uk-flex uk-flex-space-between uk-flex-wrap\" data-uk-margin v-show=\"formitem.id\">\r\n        <div class=\"uk-flex uk-flex-middle uk-flex-wrap\" data-uk-margin>\r\n\r\n            <div class=\"uk-margin-left\" v-show=\"selected.length\">\r\n                <ul class=\"uk-subnav pk-subnav-icon\">\r\n                    <li><a class=\"pk-icon-delete pk-icon-hover\" title=\"{{ 'Delete' | trans }}\"\r\n                           data-uk-tooltip=\"{delay: 500}\" v-on=\"click: removeFields\"\r\n                           v-confirm=\"'Delete field?' | trans\"></a>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n\r\n        </div>\r\n        <div class=\"uk-position-relative\" data-uk-margin>\r\n\r\n            <div data-uk-dropdown=\"{ mode: 'click' }\">\r\n                <a class=\"uk-button uk-button-primary\" v-on=\"click: $event.preventDefault()\">{{ 'Add Field' | trans\r\n                    }}</a>\r\n\r\n                <div class=\"uk-dropdown uk-dropdown-small uk-dropdown-flip\">\r\n                    <ul class=\"uk-nav uk-nav-dropdown\">\r\n                        <li v-repeat=\"type: types | orderBy 'label'\"><a\r\n                                v-on=\"click: editFormField(type.id)\">{{ type.label }}</a></li>\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"uk-overflow-container\">\r\n\r\n        <div class=\"pk-table-fake pk-table-fake-header\" v-class=\"pk-table-fake-border: !fields || !fields.length\">\r\n            <div class=\"pk-table-width-minimum pk-table-fake-nestable-padding\">\r\n                <input type=\"checkbox\" v-check-all=\"selected: input[name=id]\"><!-- //todo fix this! -->\r\n            </div>\r\n            <div class=\"pk-table-min-width-100\">{{ 'Label' | trans }}</div>\r\n            <div class=\"pk-table-width-100 uk-text-center\">{{ 'Required' | trans }}</div>\r\n            <div class=\"pk-table-width-150\">{{ 'Type' | trans }}</div>\r\n        </div>\r\n\r\n        <ul class=\"uk-nestable uk-margin-remove\" v-el=\"nestable\" v-show=\"fields.length\">\r\n            <field v-repeat=\"field: fields | orderBy 'priority'\"></field>\r\n\r\n        </ul>\r\n\r\n    </div>\r\n\r\n    <h3 class=\"uk-h1 uk-text-muted uk-text-center\" v-show=\"fields && !fields.length\">{{ 'No fields found.' | trans\r\n        }}</h3>\r\n\r\n    <script id=\"field\" type=\"text/template\">\r\n        <li class=\"uk-nestable-item\" v-class=\"uk-active: isSelected(field)\" data-id=\"{{ field.id }}\">\r\n\r\n            <div class=\"uk-nestable-panel pk-table-fake uk-form uk-visible-hover\">\r\n                <div class=\"pk-table-width-minimum pk-table-collapse\">\r\n                    <div class=\"uk-nestable-toggle\" data-nestable-action=\"toggle\"></div>\r\n                </div>\r\n                <div class=\"pk-table-width-minimum\"><input type=\"checkbox\" name=\"id\" value=\"{{ field.id }}\"\r\n                    v-on=\"click: toggleSelect(field)\"></div>\r\n                <div class=\"pk-table-min-width-100\">\r\n                    <a v-on=\"click: editFormField(field.id)\">{{ field.label }}</a><br/>\r\n                    <small class=\"uk-text-muted\">{{ field.slug }}</small>\r\n                </div>\r\n                <div class=\"pk-table-width-100 uk-text-center\">\r\n                    <td class=\"uk-text-center\">\r\n                        <a v-class=\"pk-icon-circle-danger: !field.data.required, pk-icon-circle-success: field.data.required\"\r\n                           v-on=\"click: toggleRequired(field)\"></a>\r\n                    </td>\r\n                </div>\r\n                <div class=\"pk-table-width-150 pk-table-max-width-150 uk-text-truncate\">\r\n                    {{ type.label }}\r\n                </div>\r\n            </div>\r\n\r\n\r\n        </li>\r\n\r\n    </script>";

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(33)

	if (module.exports.__esModule) module.exports = module.exports.default
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(34)
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "C:\\BixieProjects\\pagekit\\pagekit\\packages\\bixie\\formmaker\\app\\components\\form-fieldslist.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
	  }
	})()}

/***/ },
/* 33 */
/***/ function(module, exports) {

	'use strict';

	// <template>

	//     <h3>{{ 'Available variables' | trans }}</h3>

	//     <ul class="uk-list uk-list-line">

	//         <li v-repeat="field: fields">

	//             <kbd>{{ field.slug | shortcode 'label' }}</kbd><br>

	//             <kbd>{{ field.slug | shortcode 'value' }}</kbd>

	//         </li>

	//     </ul>

	// </template>

	// <script>

	module.exports = {

	    props: ['fields']

	};

	// </script>

/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = "<h3>{{ 'Available variables' | trans }}</h3>\r\n    <ul class=\"uk-list uk-list-line\">\r\n        <li v-repeat=\"field: fields\">\r\n            <kbd>{{ field.slug | shortcode 'label' }}</kbd><br>\r\n            <kbd>{{ field.slug | shortcode 'value' }}</kbd>\r\n        </li>\r\n    </ul>";

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(36)

	if (module.exports.__esModule) module.exports = module.exports.default
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(37)
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "C:\\BixieProjects\\pagekit\\pagekit\\packages\\bixie\\formmaker\\app\\components\\form-appearance.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
	  }
	})()}

/***/ },
/* 36 */
/***/ function(module, exports) {

	'use strict';

	// <template>

	//     <div class="uk-form-horizontal">

	//         <div class="uk-form-row">

	//             <span class="uk-form-label">{{ 'Title' | trans }}</span>

	//             <div class="uk-form-controls uk-form-controls-text">

	//                 <label><input type="checkbox" value="hide-title" v-model="formitem.data.hide_title"> {{ 'Hide Title' |

	//                     trans }}</label>

	//             </div>

	//         </div>

	//         <div class="uk-form-row">

	//             <label for="form-formstyle" class="uk-form-label">{{ 'Form style' | trans }}</label>

	//             <div class="uk-form-controls">

	//                 <select id="form-formstyle" class="uk-form-width-large"

	//                         options="['uk-form-stacked', 'uk-form-horizontal']"

	//                         v-model="formitem.data.formStyle"></select>

	//             </div>

	//         </div>

	//         <div class="uk-form-row">

	//             <label for="form-class" class="uk-form-label">{{ 'Class suffix' | trans }}</label>

	//             <div class="uk-form-controls">

	//                 <input id="form-class" class="uk-form-width-large" type="text" v-model="formitem.data.classSfx">

	//             </div>

	//         </div>

	//         <div class="uk-form-row">

	//             <label for="form-submit-button" class="uk-form-label">{{ 'Text submit button' | trans }}</label>

	//             <div class="uk-form-controls">

	//                 <input id="form-submit-button" class="uk-form-width-large" type="text" v-model="formitem.data.submitButton">

	//             </div>

	//         </div>

	//         <div class="uk-form-row" v-show="formitem.data.required">

	//             <label for="form-required-error" class="uk-form-label">{{ 'Required error message' | trans }}</label>

	//             <div class="uk-form-controls">

	//                 <input id="form-required-error" class="uk-form-width-large" type="text"

	//                        v-model="formitem.data.requiredError">

	//             </div>

	//         </div>

	//         <div class="uk-margin" v-show="formitem.data.recaptcha">

	//             <div class="uk-form-row">

	//                 <label for="form-recaptcha_label" class="uk-form-label">{{ 'reCAPTCHA label' | trans }}</label>

	//                 <div class="uk-form-controls">

	//                     <input id="form-recaptcha_label" class="uk-form-width-large" type="text" name="recaptcha_label"

	//                            v-model="formitem.data.recaptcha_label" placeholder="{{ 'Empty for no label' | trans }}">

	//                 </div>

	//             </div>

	//             <div class="uk-form-row">

	//                 <label for="form-recaptcha_label" class="uk-form-label">{{ 'reCAPTCHA setup' | trans }}</label>

	//                 <div class="uk-form-controls">

	//                     <select class="uk-form-width-small" v-model="formitem.data.recaptcha_theme" options="recaptcha_themes"></select>

	//                     <select class="uk-form-width-small" v-model="formitem.data.recaptcha_type" options="recaptcha_types"></select>

	//                     <select class="uk-form-width-small" v-model="formitem.data.recaptcha_size" options="recaptcha_sizes"></select>

	//                 </div>

	//             </div>

	//         </div>

	//     </div>

	// </template>

	// <script>

	module.exports = {

	    inherit: true,

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

/***/ },
/* 37 */
/***/ function(module, exports) {

	module.exports = "<div class=\"uk-form-horizontal\">\r\n\r\n        <div class=\"uk-form-row\">\r\n            <span class=\"uk-form-label\">{{ 'Title' | trans }}</span>\r\n\r\n            <div class=\"uk-form-controls uk-form-controls-text\">\r\n                <label><input type=\"checkbox\" value=\"hide-title\" v-model=\"formitem.data.hide_title\"> {{ 'Hide Title' |\r\n                    trans }}</label>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"uk-form-row\">\r\n            <label for=\"form-formstyle\" class=\"uk-form-label\">{{ 'Form style' | trans }}</label>\r\n\r\n            <div class=\"uk-form-controls\">\r\n                <select id=\"form-formstyle\" class=\"uk-form-width-large\"\r\n                        options=\"['uk-form-stacked', 'uk-form-horizontal']\"\r\n                        v-model=\"formitem.data.formStyle\"></select>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"uk-form-row\">\r\n            <label for=\"form-class\" class=\"uk-form-label\">{{ 'Class suffix' | trans }}</label>\r\n\r\n            <div class=\"uk-form-controls\">\r\n                <input id=\"form-class\" class=\"uk-form-width-large\" type=\"text\" v-model=\"formitem.data.classSfx\">\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"uk-form-row\">\r\n            <label for=\"form-submit-button\" class=\"uk-form-label\">{{ 'Text submit button' | trans }}</label>\r\n\r\n            <div class=\"uk-form-controls\">\r\n                <input id=\"form-submit-button\" class=\"uk-form-width-large\" type=\"text\" v-model=\"formitem.data.submitButton\">\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"uk-form-row\" v-show=\"formitem.data.required\">\r\n            <label for=\"form-required-error\" class=\"uk-form-label\">{{ 'Required error message' | trans }}</label>\r\n\r\n            <div class=\"uk-form-controls\">\r\n                <input id=\"form-required-error\" class=\"uk-form-width-large\" type=\"text\"\r\n                       v-model=\"formitem.data.requiredError\">\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"uk-margin\" v-show=\"formitem.data.recaptcha\">\r\n            <div class=\"uk-form-row\">\r\n                <label for=\"form-recaptcha_label\" class=\"uk-form-label\">{{ 'reCAPTCHA label' | trans }}</label>\r\n\r\n                <div class=\"uk-form-controls\">\r\n                    <input id=\"form-recaptcha_label\" class=\"uk-form-width-large\" type=\"text\" name=\"recaptcha_label\"\r\n                           v-model=\"formitem.data.recaptcha_label\" placeholder=\"{{ 'Empty for no label' | trans }}\">\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"uk-form-row\">\r\n                <label for=\"form-recaptcha_label\" class=\"uk-form-label\">{{ 'reCAPTCHA setup' | trans }}</label>\r\n\r\n                <div class=\"uk-form-controls\">\r\n                    <select class=\"uk-form-width-small\" v-model=\"formitem.data.recaptcha_theme\" options=\"recaptcha_themes\"></select>\r\n                    <select class=\"uk-form-width-small\" v-model=\"formitem.data.recaptcha_type\" options=\"recaptcha_types\"></select>\r\n                    <select class=\"uk-form-width-small\" v-model=\"formitem.data.recaptcha_size\" options=\"recaptcha_sizes\"></select>\r\n                </div>\r\n            </div>\r\n\r\n        </div>\r\n\r\n    </div>";

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(39)

	if (module.exports.__esModule) module.exports = module.exports.default
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(40)
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "C:\\BixieProjects\\pagekit\\pagekit\\packages\\bixie\\formmaker\\app\\components\\form-submission.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
	  }
	})()}

/***/ },
/* 39 */
/***/ function(module, exports) {

	"use strict";

	// <template>

	//     <div class="uk-form-horizontal uk-margin">

	//         <div class="uk-grid">

	//             <div class="uk-width-medium-3-4">

	//                 <div class="uk-form-row">

	//                     <label for="form-formstyle" class="uk-form-label">{{ 'After submit' | trans }}</label>

	//                     <div class="uk-form-controls">

	//                         <select id="form-formstyle" class="uk-form-width-large"

	//                                 options="afterSubmitOptions" v-model="formitem.data.afterSubmit"></select>

	//                     </div>

	//                 </div>

	//                 <div class="uk-form-row" v-show="formitem.data.afterSubmit == 'thankyou'">

	//                     <v-editor id="formitem-thankyou" value="{{@ formitem.data.thankyou }}" options="{{ {markdown : formitem.data.thankyou_markdown} }}"></v-editor>

	//                     <p>

	//                         <label><input type="checkbox" v-model="formitem.data.thankyou_markdown"> {{ 'Enable Markdown' | trans }}</label>

	//                     </p>

	//                 </div>

	//                 <div class="uk-form-row" v-show="formitem.data.afterSubmit == 'redirect'">

	//                     <label class="uk-form-label">{{ 'Redirect' | trans }}</label>

	//                     <div class="uk-form-controls">

	//                         <input-link class="uk-form-width-large" link="{{@ formitem.data.redirect}}"></input-link>

	//                     </div>

	//                 </div>

	//             </div>

	//             <div class="uk-width-medium-1-4">

	//                 <formfieldslist fields="{{ formfields }}"></formfieldslist>

	//             </div>

	//         </div>

	//     </div>

	// </template>

	// <script>

	module.exports = {

	    inherit: true

	};

	// </script>

/***/ },
/* 40 */
/***/ function(module, exports) {

	module.exports = "<div class=\"uk-form-horizontal uk-margin\">\r\n\r\n        <div class=\"uk-grid\">\r\n            <div class=\"uk-width-medium-3-4\">\r\n\r\n                <div class=\"uk-form-row\">\r\n                    <label for=\"form-formstyle\" class=\"uk-form-label\">{{ 'After submit' | trans }}</label>\r\n\r\n                    <div class=\"uk-form-controls\">\r\n                        <select id=\"form-formstyle\" class=\"uk-form-width-large\"\r\n                                options=\"afterSubmitOptions\" v-model=\"formitem.data.afterSubmit\"></select>\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"uk-form-row\" v-show=\"formitem.data.afterSubmit == 'thankyou'\">\r\n                    <v-editor id=\"formitem-thankyou\" value=\"{{@ formitem.data.thankyou }}\" options=\"{{ {markdown : formitem.data.thankyou_markdown} }}\"></v-editor>\r\n                    <p>\r\n                        <label><input type=\"checkbox\" v-model=\"formitem.data.thankyou_markdown\"> {{ 'Enable Markdown' | trans }}</label>\r\n                    </p>\r\n                </div>\r\n\r\n                <div class=\"uk-form-row\" v-show=\"formitem.data.afterSubmit == 'redirect'\">\r\n                    <label class=\"uk-form-label\">{{ 'Redirect' | trans }}</label>\r\n                    <div class=\"uk-form-controls\">\r\n                        <input-link class=\"uk-form-width-large\" link=\"{{@ formitem.data.redirect}}\"></input-link>\r\n                    </div>\r\n                </div>\r\n\r\n            </div>\r\n            <div class=\"uk-width-medium-1-4\">\r\n\r\n                <formfieldslist fields=\"{{ formfields }}\"></formfieldslist>\r\n\r\n            </div>\r\n        </div>\r\n\r\n    </div>";

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(42)

	if (module.exports.__esModule) module.exports = module.exports.default
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(43)
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "C:\\BixieProjects\\pagekit\\pagekit\\packages\\bixie\\formmaker\\app\\components\\form-email.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
	  }
	})()}

/***/ },
/* 42 */
/***/ function(module, exports) {

	"use strict";

	// <template>

	//     <div class="uk-form-horizontal uk-margin">

	//         <div class="uk-grid">

	//             <div class="uk-width-medium-3-4">

	//                 <div class="uk-alert" v-show="formitem.data.user_email_field">

	//                     {{ 'Email address from field "%field%" will be used to confirm submission to the user.' | trans {field:formitem.data.user_email_field} }}</div>

	//                 <div class="uk-alert uk-alert-warning" v-show="!formitem.data.user_email_field">

	//                     {{ 'No email field is selected for user confirmation mail.' | trans }}</div>

	//                 <div class="uk-form-row">

	//                     <label for="form-submitemail" class="uk-form-label">{{ 'Email submission to' | trans }}</label>

	//                     <div class="uk-form-controls">

	//                         <input id="form-submitemail" class="uk-form-width-large" type="text" name="submitemail"

	//                                v-model="formitem.data.submitEmail" v-validate="email">

	//                     </div>

	//                     <!-- //todo fix req message -->

	//                     <p class="uk-form-help-block uk-text-danger" v-show="formform.submitemail.invalid">{{ 'Please enter valid email address' | trans }}</p>

	//                 </div>

	//                 <div class="uk-form-row">

	//                     <label for="form-emailsubject" class="uk-form-label">{{ 'Email subject' | trans }}</label>

	//                     <div class="uk-form-controls">

	//                         <input id="form-emailsubject" class="uk-form-width-large" type="text" name="emailsubject"

	//                                v-model="formitem.data.email_subject">

	//                     </div>

	//                 </div>

	//                 <div class="uk-form-row">

	//                     <v-editor id="formitem-emailbody" value="{{@ formitem.data.email_body }}"

	//                               options="{{ {markdown : formitem.data.email_body_markdown} }}"></v-editor>

	//                     <p>

	//                         <label><input type="checkbox" v-model="formitem.data.email_body_markdown"> {{ 'Enable Markdown' | trans }}</label>

	//                     </p>

	//                 </div>

	//             </div>

	//             <div class="uk-width-medium-1-4">

	//                 <formfieldslist fields="{{ formfields }}"></formfieldslist>

	//             </div>

	//         </div>

	//     </div>

	// </template>

	// <script>

	module.exports = {

	    inherit: true

	};

	// </script>

/***/ },
/* 43 */
/***/ function(module, exports) {

	module.exports = "<div class=\"uk-form-horizontal uk-margin\">\r\n\r\n        <div class=\"uk-grid\">\r\n            <div class=\"uk-width-medium-3-4\">\r\n\r\n                <div class=\"uk-alert\" v-show=\"formitem.data.user_email_field\">\r\n                    {{ 'Email address from field \"%field%\" will be used to confirm submission to the user.' | trans {field:formitem.data.user_email_field} }}</div>\r\n                <div class=\"uk-alert uk-alert-warning\" v-show=\"!formitem.data.user_email_field\">\r\n                    {{ 'No email field is selected for user confirmation mail.' | trans }}</div>\r\n\r\n                <div class=\"uk-form-row\">\r\n                    <label for=\"form-submitemail\" class=\"uk-form-label\">{{ 'Email submission to' | trans }}</label>\r\n\r\n                    <div class=\"uk-form-controls\">\r\n                        <input id=\"form-submitemail\" class=\"uk-form-width-large\" type=\"text\" name=\"submitemail\"\r\n                               v-model=\"formitem.data.submitEmail\" v-validate=\"email\">\r\n                    </div>\r\n                    <!-- //todo fix req message -->\r\n                    <p class=\"uk-form-help-block uk-text-danger\" v-show=\"formform.submitemail.invalid\">{{ 'Please enter valid email address' | trans }}</p>\r\n                </div>\r\n\r\n                <div class=\"uk-form-row\">\r\n                    <label for=\"form-emailsubject\" class=\"uk-form-label\">{{ 'Email subject' | trans }}</label>\r\n\r\n                    <div class=\"uk-form-controls\">\r\n                        <input id=\"form-emailsubject\" class=\"uk-form-width-large\" type=\"text\" name=\"emailsubject\"\r\n                               v-model=\"formitem.data.email_subject\">\r\n                    </div>\r\n\r\n                </div>\r\n\r\n                <div class=\"uk-form-row\">\r\n                    <v-editor id=\"formitem-emailbody\" value=\"{{@ formitem.data.email_body }}\"\r\n                              options=\"{{ {markdown : formitem.data.email_body_markdown} }}\"></v-editor>\r\n                    <p>\r\n                        <label><input type=\"checkbox\" v-model=\"formitem.data.email_body_markdown\"> {{ 'Enable Markdown' | trans }}</label>\r\n                    </p>\r\n                </div>\r\n\r\n            </div>\r\n            <div class=\"uk-width-medium-1-4\">\r\n\r\n                <formfieldslist fields=\"{{ formfields }}\"></formfieldslist>\r\n\r\n            </div>\r\n        </div>\r\n\r\n    </div>";

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(45)

	if (module.exports.__esModule) module.exports = module.exports.default
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(55)
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "C:\\BixieProjects\\pagekit\\pagekit\\packages\\bixie\\formmaker\\app\\components\\field-edit.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
	  }
	})()}

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// <template>

	//     <div class="uk-modal-spinner" v-if="!loaded"></div>

	//     <form id="field-edit" class="uk-form" name="fieldform" v-validator="form" v-on="submit: save | valid" v-show="loaded">

	//         <div class="uk-margin uk-flex uk-flex-space-between uk-flex-wrap" data-uk-margin>

	//             <div data-uk-margin>

	//                 <h2 class="uk-margin-remove" v-if="field.id">{{ 'Edit' | trans }} {{ type.label }} <em>{{

	//                     field.label | trans }}</em></h2>

	//                 <h2 class="uk-margin-remove" v-if="!field.id">{{ 'Add' | trans }} {{ type.label }} <em>{{

	//                     field.label | trans }}</em></h2>

	//             </div>

	//             <div data-uk-margin>

	//                 <a class="uk-button uk-margin-small-right uk-modal-close">{{ field.id ? 'Close' :

	//                     'Cancel' | trans }}</a>

	//                 <button class="uk-button uk-button-primary" type="submit">{{ 'Save' | trans }}</button>

	//             </div>

	//         </div>

	//         <ul class="uk-tab" v-el="tab">

	//             <li><a>{{ type.label | trans }}</a></li>

	//             <li v-show="type.hasOptions"><a>{{ 'Options' | trans }}</a></li>

	//             <li><a>{{ 'Appearance' | trans }}</a></li>

	//         </ul>

	//         <div class="uk-switcher uk-margin" v-el="content">

	//             <div>

	//                 <fieldbasic field="{{@ field }}" type="{{@ type }}" form=fieldform"></fieldbasic>

	//             </div>

	//             <div>

	//                 <fieldoptions v-show="type.hasOptions" field="{{@ field }}" form=fieldform"></fieldoptions>

	//             </div>

	//             <div>

	//                 <appearance field="{{@ field }}" form=fieldform"></appearance>

	//             </div>

	//         </div>

	//     </form>

	// </template>

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
	                priority: 0,
	                form_id: 0,
	                data: {}
	            }
	        };
	    },

	    props: ['formitem', 'fieldid'],

	    created: function created() {
	        this.Fields = this.$resource('api/formmaker/field/edit');
	        this.Field = this.$resource('api/formmaker/field/:id');
	    },

	    ready: function ready() {
	        this.Fields.query({ id: this.fieldid }, function (data) {
	            this.$set('field', data.field);
	            this.$set('type', data.type);
	            this.$set('roles', data.roles);
	            this.field.form_id = this.formitem.id;

	            UIkit.tab(this.$$.tab, { connect: this.$$.content });
	            this.loaded = true;
	        });
	    },

	    beforeDestroy: function beforeDestroy() {
	        this.$dispatch('close.editmodal');
	    },

	    methods: {

	        save: function save(e) {

	            e.preventDefault();

	            var data = { field: this.field };

	            this.$broadcast('save', data);

	            this.Field.save({ id: this.field.id }, data, function (data) {

	                this.$set('field', data.field);

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

	        fieldbasic: __webpack_require__(46),
	        fieldoptions: __webpack_require__(49),
	        appearance: __webpack_require__(52)

	    }

	};

	// </script>

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(47)

	if (module.exports.__esModule) module.exports = module.exports.default
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(48)
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "C:\\BixieProjects\\pagekit\\pagekit\\packages\\bixie\\formmaker\\app\\components\\field-basic.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
	  }
	})()}

/***/ },
/* 47 */
/***/ function(module, exports) {

	'use strict';

	// <template>

	//     <div class="uk-margin">

	//         <div class="uk-grid">

	//             <div class="uk-width-medium-3-4 uk-form-horizontal">

	//                 <div class="uk-form-row">

	//                     <label for="form-label" class="uk-form-label">{{ 'Label' | trans }}</label>

	//                     <div class="uk-form-controls">

	//                         <input id="form-label" class="uk-form-width-large" type="text" name="label"

	//                                v-model="field.label" v-validate="required" required>

	//                     </div>

	//                     <!-- //todo fix req message form is added to VModel Vue, not the actual parent-->

	//                     <p class="uk-form-help-block uk-text-danger" v-show="form.label.invalid">{{ 'Please enter a label' | trans }}</p>

	//                 </div>

	//                 <div class="uk-form-row">

	//                     <label for="form-slug" class="uk-form-label">{{ 'Slug' | trans }}</label>

	//                     <div class="uk-form-controls">

	//                         <input id="form-slug" class="uk-form-width-large" type="text" v-model="field.slug">

	//                     </div>

	//                 </div>

	//                 <formmakerfields v-show="!type.hasOptions || field.options.length" edit-field="{{@ field.type }}"></formmakerfields>

	//             </div>

	//             <div class="uk-width-medium-1-4 uk-form-stacked">

	//                 <div v-if="type.required < 0" class="uk-form-row">

	//                     <span class="uk-form-label">{{ 'Field required' | trans }}</span>

	//                     <div class="uk-form-controls uk-form-controls-text">

	//                         <label><input type="checkbox" value="required" v-model="field.data.required"> {{ 'Required' | trans

	//                             }}</label>

	//                     </div>

	//                 </div>

	//                 <div v-if="type.multiple < 0" class="uk-form-row">

	//                     <span class="uk-form-label">{{ 'Multiple values' | trans }}</span>

	//                     <div class="uk-form-controls uk-form-controls-text">

	//                         <label><input type="checkbox" value="multiple" v-model="field.data.multiple"> {{ 'Multiple' | trans

	//                             }}</label>

	//                     </div>

	//                 </div>

	//                 <div class="uk-form-row">

	//                     <span class="uk-form-label">{{ 'Restrict Access' | trans }}</span>

	//                     <div class="uk-form-controls uk-form-controls-text">

	//                         <p v-repeat="role: roles" class="uk-form-controls-condensed">

	//                             <label><input type="checkbox" value="{{ role.id }}" v-checkbox="field.roles" number> {{ role.name

	//                                 }}</label>

	//                         </p>

	//                     </div>

	//                 </div>

	//             </div>

	//         </div>

	//     </div>

	// </template>

	// <script>

	module.exports = {

	    props: ['field', 'type', 'form']

	};

	// </script>

/***/ },
/* 48 */
/***/ function(module, exports) {

	module.exports = "<div class=\"uk-margin\">\r\n\r\n        <div class=\"uk-grid\">\r\n            <div class=\"uk-width-medium-3-4 uk-form-horizontal\">\r\n                <div class=\"uk-form-row\">\r\n                    <label for=\"form-label\" class=\"uk-form-label\">{{ 'Label' | trans }}</label>\r\n\r\n                    <div class=\"uk-form-controls\">\r\n                        <input id=\"form-label\" class=\"uk-form-width-large\" type=\"text\" name=\"label\"\r\n                               v-model=\"field.label\" v-validate=\"required\" required>\r\n                    </div>\r\n                    <!-- //todo fix req message form is added to VModel Vue, not the actual parent-->\r\n                    <p class=\"uk-form-help-block uk-text-danger\" v-show=\"form.label.invalid\">{{ 'Please enter a label' | trans }}</p>\r\n                </div>\r\n                <div class=\"uk-form-row\">\r\n                    <label for=\"form-slug\" class=\"uk-form-label\">{{ 'Slug' | trans }}</label>\r\n\r\n                    <div class=\"uk-form-controls\">\r\n                        <input id=\"form-slug\" class=\"uk-form-width-large\" type=\"text\" v-model=\"field.slug\">\r\n                    </div>\r\n                </div>\r\n\r\n                <formmakerfields v-show=\"!type.hasOptions || field.options.length\" edit-field=\"{{@ field.type }}\"></formmakerfields>\r\n\r\n            </div>\r\n            <div class=\"uk-width-medium-1-4 uk-form-stacked\">\r\n\r\n                <div v-if=\"type.required < 0\" class=\"uk-form-row\">\r\n                    <span class=\"uk-form-label\">{{ 'Field required' | trans }}</span>\r\n\r\n                    <div class=\"uk-form-controls uk-form-controls-text\">\r\n                        <label><input type=\"checkbox\" value=\"required\" v-model=\"field.data.required\"> {{ 'Required' | trans\r\n                            }}</label>\r\n                    </div>\r\n                </div>\r\n\r\n                <div v-if=\"type.multiple < 0\" class=\"uk-form-row\">\r\n                    <span class=\"uk-form-label\">{{ 'Multiple values' | trans }}</span>\r\n\r\n                    <div class=\"uk-form-controls uk-form-controls-text\">\r\n                        <label><input type=\"checkbox\" value=\"multiple\" v-model=\"field.data.multiple\"> {{ 'Multiple' | trans\r\n                            }}</label>\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"uk-form-row\">\r\n                    <span class=\"uk-form-label\">{{ 'Restrict Access' | trans }}</span>\r\n\r\n                    <div class=\"uk-form-controls uk-form-controls-text\">\r\n                        <p v-repeat=\"role: roles\" class=\"uk-form-controls-condensed\">\r\n                            <label><input type=\"checkbox\" value=\"{{ role.id }}\" v-checkbox=\"field.roles\" number> {{ role.name\r\n                                }}</label>\r\n                        </p>\r\n                    </div>\r\n                </div>\r\n\r\n            </div>\r\n        </div>\r\n    </div>";

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(50)

	if (module.exports.__esModule) module.exports = module.exports.default
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(51)
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "C:\\BixieProjects\\pagekit\\pagekit\\packages\\bixie\\formmaker\\app\\components\\field-options.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
	  }
	})()}

/***/ },
/* 50 */
/***/ function(module, exports) {

	'use strict';

	// <template>

	//     <div class="uk-form-horizontal">

	//         <div class="uk-form-row">

	//             <span class="uk-form-label">{{ 'Manage options' | trans }}</span>

	//             <div class="uk-form-controls uk-form-controls-text">

	//                 <ul class="uk-nestable uk-margin-remove" v-el="optionsNestable" v-show="field.options.length">

	//                     <selectoption v-repeat="selectoption: field.options"></selectoption>

	//                 </ul>

	//                 <button type="button" class="uk-button uk-button-primary uk-button-small uk-margin"

	//                         v-on="click: addFieldoption">{{ 'Add option' | trans }}

	//                 </button>

	//             </div>

	//         </div>

	//     </div>

	// </template>

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
	                $(this.$$.optionsNestable).find('input:last').focus();
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

	            template: '<li class="uk-nestable-item" data-value="{{ selectoption.value }}">\n    <div class="uk-nestable-panel uk-visible-hover uk-form uk-flex uk-flex-middle">\n        <div class="uk-flex-item-1">\n            <div class="uk-form-row">\n                <small class="uk-form-label uk-text-muted uk-text-truncate" style="text-transform: none"\n                       v-show="selectoption.attachValue"\n                       v-class="uk-text-danger: selectoption.invalid">{{ selectoption.value }}</small>\n                <span class="uk-form-label" v-show="!selectoption.attachValue">\n                    <input type="text" class="uk-form-small"\n                           v-on="keyup: safeValue(true)"\n                           v-class="uk-text-danger: selectoption.invalid"\n                           v-model="selectoption.value"/></span>\n                <div class="uk-form-controls">\n                    <input type="text" class="uk-form-width-large" v-model="selectoption.text"/></div>\n                <p class="uk-form-help-block uk-text-danger" v-show="selectoption.invalid">{{ selectoption.invalid | trans }}</p>\n\n            </div>\n        </div>\n        <div class="">\n            <ul class="uk-subnav pk-subnav-icon">\n                <li><a class="uk-icon uk-margin-small-top pk-icon-hover uk-invisible"\n                       data-uk-tooltip="{delay: 500}" title="{{ \'Link/Unlink value from label\' | trans }}"\n                       v-class="uk-icon-link: !selectoption.attachValue, uk-icon-chain-broken: selectoption.attachValue"\n                       v-on="click: selectoption.attachValue = !selectoption.attachValue"></a></li>\n                <li><a class="pk-icon-delete pk-icon-hover uk-invisible" v-on="click: deleteFieldoption($index)"></a></li>\n                <li><a class="pk-icon-move pk-icon-hover uk-invisible uk-nestable-handle"></a></li>\n            </ul>\n        </div>\n    </div>\n</li>   \n',

	            inherit: true,

	            methods: {
	                safeValue: function safeValue(checkDups) {
	                    this.selectoption.value = _.escape(_.snakeCase(this.selectoption.value));
	                    if (checkDups) {
	                        this.checkDuplicates();
	                    }
	                }
	            },

	            watch: {
	                "selectoption.text": function selectoptionText(value) {
	                    if (this.selectoption.attachValue) {
	                        this.selectoption.value = _.escape(_.snakeCase(value));
	                    }
	                    this.checkDuplicates();
	                }

	            }
	        }

	    }
	};

	// </script>

/***/ },
/* 51 */
/***/ function(module, exports) {

	module.exports = "<div class=\"uk-form-horizontal\">\r\n\r\n        <div class=\"uk-form-row\">\r\n            <span class=\"uk-form-label\">{{ 'Manage options' | trans }}</span>\r\n\r\n            <div class=\"uk-form-controls uk-form-controls-text\">\r\n                <ul class=\"uk-nestable uk-margin-remove\" v-el=\"optionsNestable\" v-show=\"field.options.length\">\r\n                    <selectoption v-repeat=\"selectoption: field.options\"></selectoption>\r\n                </ul>\r\n                <button type=\"button\" class=\"uk-button uk-button-primary uk-button-small uk-margin\"\r\n                        v-on=\"click: addFieldoption\">{{ 'Add option' | trans }}\r\n                </button>\r\n            </div>\r\n        </div>\r\n\r\n    </div>";

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(53)

	if (module.exports.__esModule) module.exports = module.exports.default
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(54)
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "C:\\BixieProjects\\pagekit\\pagekit\\packages\\bixie\\formmaker\\app\\components\\field-appearance.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
	  }
	})()}

/***/ },
/* 53 */
/***/ function(module, exports) {

	'use strict';

	// <template>

	//     <div class="uk-form-horizontal">

	//         <div class="uk-form-row">

	//             <span class="uk-form-label">{{ 'Label' | trans }}</span>

	//             <div class="uk-form-controls uk-form-controls-text">

	//                 <label><input type="checkbox" value="hide-label" v-model="field.data.hide_label"> {{ 'Hide Label' |

	//                     trans }}</label>

	//             </div>

	//         </div>

	//         <div class="uk-form-row">

	//             <label for="form-class" class="uk-form-label">{{ 'Class suffix' | trans }}</label>

	//             <div class="uk-form-controls">

	//                 <input id="form-class" class="uk-form-width-large" type="text" v-model="field.data.classSfx">

	//             </div>

	//         </div>

	//         <div class="uk-form-row" v-show="field.data.required">

	//             <label for="form-required-error" class="uk-form-label">{{ 'Required error message' | trans }}</label>

	//             <div class="uk-form-controls">

	//                 <input id="form-required-error" class="uk-form-width-large" type="text"

	//                        v-model="field.data.requiredError">

	//             </div>

	//         </div>

	//     </div>

	// </template>

	// <script>

	module.exports = {

	    props: ['field', 'form']

	};

	// </script>

/***/ },
/* 54 */
/***/ function(module, exports) {

	module.exports = "<div class=\"uk-form-horizontal\">\r\n\r\n        <div class=\"uk-form-row\">\r\n            <span class=\"uk-form-label\">{{ 'Label' | trans }}</span>\r\n\r\n            <div class=\"uk-form-controls uk-form-controls-text\">\r\n                <label><input type=\"checkbox\" value=\"hide-label\" v-model=\"field.data.hide_label\"> {{ 'Hide Label' |\r\n                    trans }}</label>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"uk-form-row\">\r\n            <label for=\"form-class\" class=\"uk-form-label\">{{ 'Class suffix' | trans }}</label>\r\n\r\n            <div class=\"uk-form-controls\">\r\n                <input id=\"form-class\" class=\"uk-form-width-large\" type=\"text\" v-model=\"field.data.classSfx\">\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"uk-form-row\" v-show=\"field.data.required\">\r\n            <label for=\"form-required-error\" class=\"uk-form-label\">{{ 'Required error message' | trans }}</label>\r\n\r\n            <div class=\"uk-form-controls\">\r\n                <input id=\"form-required-error\" class=\"uk-form-width-large\" type=\"text\"\r\n                       v-model=\"field.data.requiredError\">\r\n            </div>\r\n        </div>\r\n\r\n    </div>";

/***/ },
/* 55 */
/***/ function(module, exports) {

	module.exports = "<div class=\"uk-modal-spinner\" v-if=\"!loaded\"></div>\r\n    <form id=\"field-edit\" class=\"uk-form\" name=\"fieldform\" v-validator=\"form\" v-on=\"submit: save | valid\" v-show=\"loaded\">\r\n\r\n        <div class=\"uk-margin uk-flex uk-flex-space-between uk-flex-wrap\" data-uk-margin>\r\n            <div data-uk-margin>\r\n\r\n                <h2 class=\"uk-margin-remove\" v-if=\"field.id\">{{ 'Edit' | trans }} {{ type.label }} <em>{{\r\n                    field.label | trans }}</em></h2>\r\n\r\n                <h2 class=\"uk-margin-remove\" v-if=\"!field.id\">{{ 'Add' | trans }} {{ type.label }} <em>{{\r\n                    field.label | trans }}</em></h2>\r\n\r\n            </div>\r\n            <div data-uk-margin>\r\n\r\n                <a class=\"uk-button uk-margin-small-right uk-modal-close\">{{ field.id ? 'Close' :\r\n                    'Cancel' | trans }}</a>\r\n                <button class=\"uk-button uk-button-primary\" type=\"submit\">{{ 'Save' | trans }}</button>\r\n\r\n            </div>\r\n        </div>\r\n\r\n        <ul class=\"uk-tab\" v-el=\"tab\">\r\n            <li><a>{{ type.label | trans }}</a></li>\r\n            <li v-show=\"type.hasOptions\"><a>{{ 'Options' | trans }}</a></li>\r\n            <li><a>{{ 'Appearance' | trans }}</a></li>\r\n        </ul>\r\n\r\n        <div class=\"uk-switcher uk-margin\" v-el=\"content\">\r\n            <div>\r\n                <fieldbasic field=\"{{@ field }}\" type=\"{{@ type }}\" form=fieldform\"></fieldbasic>\r\n            </div>\r\n            <div>\r\n                <fieldoptions v-show=\"type.hasOptions\" field=\"{{@ field }}\" form=fieldform\"></fieldoptions>\r\n            </div>\r\n            <div>\r\n                <appearance field=\"{{@ field }}\" form=fieldform\"></appearance>\r\n            </div>\r\n        </div>\r\n\r\n    </form>";

/***/ },
/* 56 */
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