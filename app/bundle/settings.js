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

	module.exports = __webpack_require__(88)
	module.exports.template = __webpack_require__(89)


/***/ },

/***/ 88:
/***/ function(module, exports) {

	module.exports = {

	        props: ['package'],

	        settings: true,

	        methods: {

	            save: function () {
	                this.$http.post('admin/system/settings/config', {
	                    name: 'formmaker',
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

/***/ },

/***/ 89:
/***/ function(module, exports) {

	module.exports = "<div class=\"uk-form uk-form-horizontal\">\n\n        <div class=\"uk-margin uk-flex uk-flex-space-between uk-flex-wrap\" data-uk-margin>\n            <div data-uk-margin>\n\n                <h2 class=\"uk-margin-remove\">{{ 'Formmaker Settings' | trans }}</h2>\n\n            </div>\n            <div data-uk-margin>\n\n                <button class=\"uk-button uk-button-primary\" v-on=\"click: save\">{{ 'Save' | trans }}</button>\n\n            </div>\n        </div>\n\n        <div class=\"uk-form-row\">\n            <label for=\"form-mail-address\" class=\"uk-form-label\">{{ 'Default mail address' | trans }}</label>\n\n            <div class=\"uk-form-controls\">\n                <input id=\"form-mail-address\" class=\"uk-form-width-large\" type=\"text\" name=\"fromAddress\"\n                       v-model=\"package.config.from_address\" v-valid=\"email\">\n            </div>\n        </div>\n\n        <div class=\"uk-form-row\">\n            <label for=\"form-recaptha_sitekey\" class=\"uk-form-label\">{{ 'Google reCAPTCHA sitekey' | trans }}</label>\n\n            <div class=\"uk-form-controls\">\n                <input id=\"form-recaptha_sitekey\" class=\"uk-form-width-large\" type=\"text\" name=\"recaptha_sitekey\"\n                       v-model=\"package.config.recaptha_sitekey\">\n            </div>\n        </div>\n\n        <div class=\"uk-form-row\">\n            <label for=\"form-recaptha_secret_key\" class=\"uk-form-label\">{{ 'Google reCAPTCHA secret key' | trans }}</label>\n\n            <div class=\"uk-form-controls\">\n                <input id=\"form-recaptha_secret_key\" class=\"uk-form-width-large\" type=\"text\" name=\"recaptha_secret_key\"\n                       v-model=\"package.config.recaptha_secret_key\">\n            </div>\n            <p class=\"uk-form-help-block\">\n                <a href=\"https://www.google.com/recaptcha/admin\" class=\"uk-link-muted\" target=\"_blank\">\n                    <i class=\"uk-icon-external-link uk-margin-small-right\"></i>{{ 'Setup your reCaptcha keys at Google Recaptcha' | trans }}</a>\n            </p>\n        </div>\n\n        <div class=\"uk-form-row\">\n            <label class=\"uk-form-label\">{{ 'Submissions per page' | trans }}</label>\n            <div class=\"uk-form-controls uk-form-controls-text\">\n                <p class=\"uk-form-controls-condensed\">\n                    <input type=\"number\" step=\"10\" v-model=\"package.config.submissions_per_page\" class=\"uk-form-width-small\">\n                </p>\n            </div>\n        </div>\n\n    </div>";

/***/ }

/******/ });