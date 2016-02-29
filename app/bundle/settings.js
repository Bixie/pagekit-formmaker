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
	__vue_script__ = __webpack_require__(43)
	__vue_template__ = __webpack_require__(44)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "C:\\BixieProjects\\pagekit\\pagekit\\packages\\bixie\\formmaker\\app\\components\\settings.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 43:
/***/ function(module, exports) {

	'use strict';

	// <template>
	//
	//     <div class="uk-form uk-form-horizontal">
	//
	//         <div class="uk-margin uk-flex uk-flex-space-between uk-flex-wrap" data-uk-margin>
	//             <div data-uk-margin>
	//
	//                 <h2 class="uk-margin-remove">{{ 'Formmaker Settings' | trans }}</h2>
	//
	//             </div>
	//             <div data-uk-margin>
	//
	//                 <button class="uk-button uk-button-primary" @click="save">{{ 'Save' | trans }}</button>
	//
	//             </div>
	//         </div>
	//
	//         <div class="uk-form-row">
	//             <label for="form-mail-address" class="uk-form-label">{{ 'Default mail address' | trans }}</label>
	//
	//             <div class="uk-form-controls">
	//                 <input id="form-mail-address" class="uk-form-width-large" type="text" name="fromAddress"
	//                        v-model="package.config.from_address" v-validate:email>
	//             </div>
	//         </div>
	//
	//         <div class="uk-form-row">
	//             <label for="form-recaptha_sitekey" class="uk-form-label">{{ 'Google reCAPTCHA sitekey' | trans }}</label>
	//
	//             <div class="uk-form-controls">
	//                 <input id="form-recaptha_sitekey" class="uk-form-width-large" type="text" name="recaptha_sitekey"
	//                        v-model="package.config.recaptha_sitekey">
	//             </div>
	//         </div>
	//
	//         <div class="uk-form-row">
	//             <label for="form-recaptha_secret_key" class="uk-form-label">{{ 'Google reCAPTCHA secret key' | trans }}</label>
	//
	//             <div class="uk-form-controls">
	//                 <input id="form-recaptha_secret_key" class="uk-form-width-large" type="text" name="recaptha_secret_key"
	//                        v-model="package.config.recaptha_secret_key">
	//             </div>
	//             <p class="uk-form-help-block">
	//                 <a href="https://www.google.com/recaptcha/admin" class="uk-link-muted" target="_blank">
	//                     <i class="uk-icon-external-link uk-margin-small-right"></i>{{ 'Setup your reCaptcha keys at Google Recaptcha' | trans }}</a>
	//             </p>
	//         </div>
	//
	//         <div class="uk-form-row">
	//             <label class="uk-form-label">{{ 'Submissions per page' | trans }}</label>
	//             <div class="uk-form-controls uk-form-controls-text">
	//                 <p class="uk-form-controls-condensed">
	//                     <input type="number" step="10" v-model="package.config.submissions_per_page" class="uk-form-width-small">
	//                 </p>
	//             </div>
	//         </div>
	//
	//     </div>
	//
	// </template>
	//
	// <script>

	module.exports = {

	    props: ['package'],

	    settings: true,

	    methods: {

	        save: function save() {
	            this.$http.post('admin/system/settings/config', {
	                name: 'bixie/formmaker',
	                config: this.package.config
	            }, function () {
	                this.$notify('Settings saved.', '');
	            }).error(function (data) {
	                this.$notify(data, 'danger');
	            }).always(function () {
	                this.$parent.close();
	            });
	        }

	    }

	};

	window.Extensions.components['settings-formmaker'] = module.exports;

	// </script>
	//

/***/ },

/***/ 44:
/***/ function(module, exports) {

	module.exports = "\n\n    <div class=\"uk-form uk-form-horizontal\">\n\n        <div class=\"uk-margin uk-flex uk-flex-space-between uk-flex-wrap\" data-uk-margin>\n            <div data-uk-margin>\n\n                <h2 class=\"uk-margin-remove\">{{ 'Formmaker Settings' | trans }}</h2>\n\n            </div>\n            <div data-uk-margin>\n\n                <button class=\"uk-button uk-button-primary\" @click=\"save\">{{ 'Save' | trans }}</button>\n\n            </div>\n        </div>\n\n        <div class=\"uk-form-row\">\n            <label for=\"form-mail-address\" class=\"uk-form-label\">{{ 'Default mail address' | trans }}</label>\n\n            <div class=\"uk-form-controls\">\n                <input id=\"form-mail-address\" class=\"uk-form-width-large\" type=\"text\" name=\"fromAddress\"\n                       v-model=\"package.config.from_address\" v-validate:email>\n            </div>\n        </div>\n\n        <div class=\"uk-form-row\">\n            <label for=\"form-recaptha_sitekey\" class=\"uk-form-label\">{{ 'Google reCAPTCHA sitekey' | trans }}</label>\n\n            <div class=\"uk-form-controls\">\n                <input id=\"form-recaptha_sitekey\" class=\"uk-form-width-large\" type=\"text\" name=\"recaptha_sitekey\"\n                       v-model=\"package.config.recaptha_sitekey\">\n            </div>\n        </div>\n\n        <div class=\"uk-form-row\">\n            <label for=\"form-recaptha_secret_key\" class=\"uk-form-label\">{{ 'Google reCAPTCHA secret key' | trans }}</label>\n\n            <div class=\"uk-form-controls\">\n                <input id=\"form-recaptha_secret_key\" class=\"uk-form-width-large\" type=\"text\" name=\"recaptha_secret_key\"\n                       v-model=\"package.config.recaptha_secret_key\">\n            </div>\n            <p class=\"uk-form-help-block\">\n                <a href=\"https://www.google.com/recaptcha/admin\" class=\"uk-link-muted\" target=\"_blank\">\n                    <i class=\"uk-icon-external-link uk-margin-small-right\"></i>{{ 'Setup your reCaptcha keys at Google Recaptcha' | trans }}</a>\n            </p>\n        </div>\n\n        <div class=\"uk-form-row\">\n            <label class=\"uk-form-label\">{{ 'Submissions per page' | trans }}</label>\n            <div class=\"uk-form-controls uk-form-controls-text\">\n                <p class=\"uk-form-controls-condensed\">\n                    <input type=\"number\" step=\"10\" v-model=\"package.config.submissions_per_page\" class=\"uk-form-width-small\">\n                </p>\n            </div>\n        </div>\n\n    </div>\n\n";

/***/ }

/******/ });