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

	module.exports = __webpack_require__(10)

	if (module.exports.__esModule) module.exports = module.exports.default
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(11)
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "C:\\BixieProjects\\pagekit\\pagekit\\packages\\bixie\\formmaker\\fieldtypes\\checkbox\\checkbox.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
	  }
	})()}

/***/ },

/***/ 10:
/***/ function(module, exports) {

	'use strict';

	// <template>

	//     <div class="uk-form-row {{field.data.classSfx || ''}}">

	//         <span class="uk-form-label" v-show="!field.data.hide_label">{{ fieldLabel | trans }}</span>

	//         <div class="uk-form-controls uk-form-controls-text">

	//             <p v-for="option in field.options" class="uk-form-controls-condensed">

	//                 <label><input type="checkbox" value="{{ option.value }}"

	//                               v-model="dataObject.value"> {{ option.text }}</label>

	//             </p>

	//             <p class="uk-form-help-block uk-text-danger" v-show="fieldInvalid(form)">{{ field.data.requiredError ||

	//                 'Please select a value' | trans }}</p>

	//         </div>

	//     </div>

	// </template>

	// <script>

	module.exports = {

	    mixins: [FormmakerfieldMixin],

	    settings: {},

	    appearance: {},

	    data: function data() {
	        return {
	            dataObject: {},
	            fieldid: _.uniqueId('formmakerfield_')
	        };
	    },

	    created: function created() {
	        this.$set('dataObject', this.getDataObject(this.field.data.value || []));
	    }

	};

	window.Formmakerfields.components['checkbox'] = module.exports;

	// </script>

/***/ },

/***/ 11:
/***/ function(module, exports) {

	module.exports = "<div class=\"uk-form-row {{field.data.classSfx || ''}}\">\r\n        <span class=\"uk-form-label\" v-show=\"!field.data.hide_label\">{{ fieldLabel | trans }}</span>\r\n\r\n        <div class=\"uk-form-controls uk-form-controls-text\">\r\n            <p v-for=\"option in field.options\" class=\"uk-form-controls-condensed\">\r\n                <label><input type=\"checkbox\" value=\"{{ option.value }}\"\r\n                              v-model=\"dataObject.value\"> {{ option.text }}</label>\r\n            </p>\r\n            <p class=\"uk-form-help-block uk-text-danger\" v-show=\"fieldInvalid(form)\">{{ field.data.requiredError ||\r\n                'Please select a value' | trans }}</p>\r\n        </div>\r\n    </div>";

/***/ }

/******/ });