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
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(89)
	module.exports.template = __webpack_require__(90)


/***/ },

/***/ 89:
/***/ function(module, exports) {

	module.exports = {

	        section: {
	            label: 'Settings',
	            active: 'bixie/siteform',
	            priority: 0
	        },

	        replace: false,

	        props: ['widget', 'config', 'form'],

	        data: function () {
	            return {
	                forms: []
	            }
	        },

	        created: function () {
	            //TODO don't retrieve entire form objects
	            this.$resource('api/formmaker/form').get(function (forms) {
	                this.forms = forms;
	                if (forms.length) {
	                    this.widget.data.form_id = this.widget.data.form_id || forms[0].id;
	                }
	            });
	            this.widget.data = _.assign({form_id: 0, formStyle: 'uk-form-stacked'}, this.widget.data);
	        },

	        computed: {

	            formOptions: function () {
	                return _.map(this.forms, function (form) {
	                    return {text: form.title, value: form.id};
	                });
	            }

	        }
	    };

	    window.Widgets.components['widget-siteform'] = module.exports;

/***/ },

/***/ 90:
/***/ function(module, exports) {

	module.exports = "<div class=\"uk-grid pk-grid-large\" data-uk-grid-margin>\r\n        <div class=\"uk-flex-item-1 uk-form-horizontal\">\r\n\r\n            <div class=\"uk-form-row\">\r\n                <label for=\"form-title\" class=\"uk-form-label\">{{ 'Title' | trans }}</label>\r\n                <div class=\"uk-form-controls\">\r\n                    <input id=\"form-title\" class=\"uk-form-width-large\" type=\"text\" name=\"title\" v-model=\"widget.title\" v-valid=\"required\">\r\n                    <p class=\"uk-form-help-block uk-text-danger\" v-show=\"form.title.invalid\">{{ 'Title cannot be blank.' | trans }}</p>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"uk-form-row\">\r\n                <label for=\"form-link-formmaker\" class=\"uk-form-label\">{{ 'Form' | trans }}</label>\r\n                <div class=\"uk-form-controls\">\r\n                    <select id=\"form-link-formmaker\" class=\"uk-form-width-large\" v-model=\"widget.data.form_id\" options=\"formOptions\"></select>                </div>\r\n            </div>\r\n\r\n            <div class=\"uk-form-row\">\r\n                <span class=\"uk-form-label\">{{ 'Form title' | trans }}</span>\r\n\r\n                <div class=\"uk-form-controls uk-form-controls-text\">\r\n                    <label><input type=\"checkbox\" value=\"hide-title\" v-model=\"widget.data.hide_title\"> {{ 'Hide form title' |\r\n                        trans }}</label>\r\n                </div>\r\n            </div>\r\n\r\n\r\n            <div class=\"uk-form-row\">\r\n                <label for=\"form-formstyle\" class=\"uk-form-label\">{{ 'Form style' | trans }}</label>\r\n\r\n                <div class=\"uk-form-controls\">\r\n                    <select id=\"form-formstyle\" class=\"uk-form-width-large\"\r\n                            options=\"['uk-form-stacked', 'uk-form-horizontal']\"\r\n                            v-model=\"widget.data.formStyle\"></select>\r\n                </div>\r\n            </div>\r\n\r\n\r\n        </div>\r\n        <div class=\"pk-width-sidebar pk-width-sidebar-large\">\r\n\r\n            <partial name=\"settings\"></partial>\r\n\r\n        </div>\r\n    </div>";

/***/ }

/******/ });