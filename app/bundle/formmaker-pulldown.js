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

	module.exports = __webpack_require__(21)

	if (module.exports.__esModule) module.exports = module.exports.default
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(22)
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "C:\\BixieProjects\\pagekit\\pagekit\\packages\\bixie\\formmaker\\fieldtypes\\pulldown\\pulldown.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
	  }
	})()}

/***/ },

/***/ 21:
/***/ function(module, exports) {

	'use strict';

	// <template>

	//     <div :class="classes(['uk-form-row'], field.data.classSfx)">

	//         <label :for="fieldid" class="uk-form-label" v-show="!field.data.hide_label">{{ fieldLabel | trans }}</label>

	//         <div class="uk-form-controls">

	//             <select v-if="field.data.multiple" class="uk-form-width-large" multiple="multiple"

	//                     :name="fieldid"

	//                     v-bind="{id: fieldid, size:field.data.size > 1 ? field.data.size : false}"

	//                     v-model="dataObject.value"

	//                     v-validate:required="fieldRequired">

	//                 <option v-for="option in field.options" :value="option.value">{{ option.text }}</option>

	//             </select>

	//             <select v-else class="uk-form-width-large"

	//                     :name="fieldid"

	//                     v-bind="{id: fieldid, size:field.data.size > 1 ? field.data.size : false}"

	//                     v-model="dataObject.value"

	//                     v-validate:required="fieldRequired">

	//                 <option v-for="option in field.options" :value="option.value">{{ option.text }}</option>

	//             </select>

	//             <p class="uk-form-help-block uk-text-danger" v-show="fieldInvalid(form)">{{ field.data.requiredError ||

	//                 'Please select a value' | trans }}</p>

	//         </div>

	//     </div>

	// </template>

	// <script>

	module.exports = {

	    mixins: [FormmakerfieldMixin],

	    settings: {},

	    appearance: {
	        'size': {
	            type: 'number',
	            label: 'Size',
	            attrs: { 'class': 'uk-form-width-small uk-text-right', 'min': 1 }
	        }
	    },

	    data: function data() {
	        return {
	            dataObject: {},
	            fieldid: _.uniqueId('formmakerfield_')
	        };
	    },

	    created: function created() {
	        var defaultValue = this.field.data.multiple ? [] : this.field.options.length ? this.field.options[0].value : '';
	        this.$set('dataObject', this.getDataObject(this.field.data.value || defaultValue));
	    }

	};

	window.Formmakerfields.components['pulldown'] = module.exports;

	// </script>

/***/ },

/***/ 22:
/***/ function(module, exports) {

	module.exports = "<div :class=\"classes(['uk-form-row'], field.data.classSfx)\">\r\n        <label :for=\"fieldid\" class=\"uk-form-label\" v-show=\"!field.data.hide_label\">{{ fieldLabel | trans }}</label>\r\n\r\n        <div class=\"uk-form-controls\">\r\n\r\n            <select v-if=\"field.data.multiple\" class=\"uk-form-width-large\" multiple=\"multiple\"\r\n                    :name=\"fieldid\"\r\n                    v-bind=\"{id: fieldid, size:field.data.size > 1 ? field.data.size : false}\"\r\n                    v-model=\"dataObject.value\"\r\n                    v-validate:required=\"fieldRequired\">\r\n                <option v-for=\"option in field.options\" :value=\"option.value\">{{ option.text }}</option>\r\n            </select>\r\n\r\n            <select v-else class=\"uk-form-width-large\"\r\n                    :name=\"fieldid\"\r\n                    v-bind=\"{id: fieldid, size:field.data.size > 1 ? field.data.size : false}\"\r\n                    v-model=\"dataObject.value\"\r\n                    v-validate:required=\"fieldRequired\">\r\n                <option v-for=\"option in field.options\" :value=\"option.value\">{{ option.text }}</option>\r\n            </select>\r\n\r\n            <p class=\"uk-form-help-block uk-text-danger\" v-show=\"fieldInvalid(form)\">{{ field.data.requiredError ||\r\n                'Please select a value' | trans }}</p>\r\n        </div>\r\n    </div>";

/***/ }

/******/ });