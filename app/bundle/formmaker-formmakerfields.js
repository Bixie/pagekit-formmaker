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
	module.exports.template = __webpack_require__(3)


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	var fieldOptions;
	window.Formmakerfields = module.exports = {

	    props: ['fields', 'editField'],

	    inherit: true,

	    components: {},

	    computed: {
	        isAdmin: function () {
	            return !!this.editField
	        }
	    }

	};

	Vue.component('formmakerfields', function (resolve) {
	    resolve(module.exports);
	});

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = "<component v-show=\"!isAdmin\" v-repeat=\"field: fields | orderBy 'priority'\" is=\"{{ field.type }}\"></component>\n\n    <component v-if=\"isAdmin\" is=\"{{ editField }}\" is-admin=\"true\"></component>";

/***/ }
/******/ ]);