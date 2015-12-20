var Formmakerfields =
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

	module.exports = __webpack_require__(2)

	if (module.exports.__esModule) module.exports = module.exports.default
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(3)
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "C:\\BixieProjects\\pagekit\\pagekit\\packages\\bixie\\formmaker\\app\\components\\formmakerfields.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
	  }
	})()}

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	'use strict';

	// <template>

	//     <div>

	//         <component v-for="field in fields | orderBy 'priority'"

	//                    :is="field.type"

	//                    :is-admin="isAdmin"

	//                    :submission="submission"

	//                    :field="field"

	//                    :form="form"></component>

	//     </div>

	// </template>

	// <script>
	var fieldOptions; //??
	window.Formmakerfields = module.exports = {

	    props: ['fields', 'field', 'submission', 'editType', 'form'],

	    computed: {
	        isAdmin: function isAdmin() {
	            return !!this.editType;
	        }
	    },

	    components: {}

	};

	Vue.component('formmakerfields', function (resolve) {
	    resolve(module.exports);
	});

	// </script>

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = "<div>\r\n        <component v-for=\"field in fields | orderBy 'priority'\"\r\n                   :is=\"field.type\"\r\n                   :is-admin=\"isAdmin\"\r\n                   :submission=\"submission\"\r\n                   :field=\"field\"\r\n                   :form=\"form\"></component>\r\n    </div>";

/***/ }
/******/ ]);