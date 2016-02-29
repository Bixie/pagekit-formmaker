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

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(47)
	__vue_template__ = __webpack_require__(48)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "C:\\BixieProjects\\pagekit\\pagekit\\packages\\bixie\\formmaker\\app\\components\\widget-siteform.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 47:
/***/ function(module, exports) {

	'use strict';

	// <template>
	//
	//     <div class="uk-grid pk-grid-large" data-uk-grid-margin>
	//         <div class="uk-flex-item-1 uk-form-horizontal">
	//
	//             <div class="uk-form-row">
	//                 <label for="form-title" class="uk-form-label">{{ 'Title' | trans }}</label>
	//                 <div class="uk-form-controls">
	//                     <input id="form-title" class="uk-form-width-large" type="text" name="title" v-model="widget.title" v-validate:required>
	//                     <p class="uk-form-help-block uk-text-danger" v-show="form.title.invalid">{{ 'Title cannot be blank.' | trans }}</p>
	//                 </div>
	//             </div>
	//
	//             <div class="uk-form-row">
	//                 <label for="form-link-formmaker" class="uk-form-label">{{ 'Form' | trans }}</label>
	//                 <div class="uk-form-controls">
	//                     <select id="form-link-formmaker" class="uk-form-width-large" v-model="widget.data.form_id">
	//                         <option v-for="form in forms" :value="form.id">{{ form.title }}</option>
	//                     </select>
	//                 </div>
	//             </div>
	//
	//             <div class="uk-form-row">
	//                 <span class="uk-form-label">{{ 'Form title' | trans }}</span>
	//
	//                 <div class="uk-form-controls uk-form-controls-text">
	//                     <label><input type="checkbox" value="hide-title" v-model="widget.data.hide_title"> {{ 'Hide form title' |
	//                         trans }}</label>
	//                 </div>
	//             </div>
	//
	//
	//             <div class="uk-form-row">
	//                 <label for="form-formstyle" class="uk-form-label">{{ 'Form style' | trans }}</label>
	//
	//                 <div class="uk-form-controls">
	//                     <select id="form-formstyle" class="uk-form-width-large" v-model="widget.data.formStyle">
	//                         <option value="uk-form-stacked">{{ 'Form stacked' | trans }}</option>
	//                         <option value="uk-form-horizontal">{{ 'Form horizontal' | trans }}</option>
	//                     </select>
	//                 </div>
	//             </div>
	//
	//
	//         </div>
	//         <div class="pk-width-sidebar pk-width-sidebar-large">
	//
	//             <partial name="settings"></partial>
	//
	//         </div>
	//     </div>
	//
	// </template>
	//
	// <script>

	module.exports = {

	    section: {
	        label: 'Settings'
	    },

	    replace: false,

	    props: ['widget', 'config', 'form'],

	    data: function data() {
	        return {
	            forms: []
	        };
	    },

	    created: function created() {
	        //TODO don't retrieve entire form objects
	        this.$resource('api/formmaker/form').get().then(function (res) {
	            this.forms = res.data;
	            if (res.data.length) {
	                this.widget.data.form_id = this.widget.data.form_id || res.data[0].id;
	            }
	        });
	        this.widget.data = _.assign({ form_id: 0, formStyle: 'uk-form-stacked' }, this.widget.data);
	    }
	};

	window.Widgets.components['bixie-siteform:settings'] = module.exports;

	// </script>
	//

/***/ },

/***/ 48:
/***/ function(module, exports) {

	module.exports = "\r\n\r\n    <div class=\"uk-grid pk-grid-large\" data-uk-grid-margin>\r\n        <div class=\"uk-flex-item-1 uk-form-horizontal\">\r\n\r\n            <div class=\"uk-form-row\">\r\n                <label for=\"form-title\" class=\"uk-form-label\">{{ 'Title' | trans }}</label>\r\n                <div class=\"uk-form-controls\">\r\n                    <input id=\"form-title\" class=\"uk-form-width-large\" type=\"text\" name=\"title\" v-model=\"widget.title\" v-validate:required>\r\n                    <p class=\"uk-form-help-block uk-text-danger\" v-show=\"form.title.invalid\">{{ 'Title cannot be blank.' | trans }}</p>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"uk-form-row\">\r\n                <label for=\"form-link-formmaker\" class=\"uk-form-label\">{{ 'Form' | trans }}</label>\r\n                <div class=\"uk-form-controls\">\r\n                    <select id=\"form-link-formmaker\" class=\"uk-form-width-large\" v-model=\"widget.data.form_id\">\r\n                        <option v-for=\"form in forms\" :value=\"form.id\">{{ form.title }}</option>\r\n                    </select>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"uk-form-row\">\r\n                <span class=\"uk-form-label\">{{ 'Form title' | trans }}</span>\r\n\r\n                <div class=\"uk-form-controls uk-form-controls-text\">\r\n                    <label><input type=\"checkbox\" value=\"hide-title\" v-model=\"widget.data.hide_title\"> {{ 'Hide form title' |\r\n                        trans }}</label>\r\n                </div>\r\n            </div>\r\n\r\n\r\n            <div class=\"uk-form-row\">\r\n                <label for=\"form-formstyle\" class=\"uk-form-label\">{{ 'Form style' | trans }}</label>\r\n\r\n                <div class=\"uk-form-controls\">\r\n                    <select id=\"form-formstyle\" class=\"uk-form-width-large\" v-model=\"widget.data.formStyle\">\r\n                        <option value=\"uk-form-stacked\">{{ 'Form stacked' | trans }}</option>\r\n                        <option value=\"uk-form-horizontal\">{{ 'Form horizontal' | trans }}</option>\r\n                    </select>\r\n                </div>\r\n            </div>\r\n\r\n\r\n        </div>\r\n        <div class=\"pk-width-sidebar pk-width-sidebar-large\">\r\n\r\n            <partial name=\"settings\"></partial>\r\n\r\n        </div>\r\n    </div>\r\n\r\n";

/***/ }

/******/ });