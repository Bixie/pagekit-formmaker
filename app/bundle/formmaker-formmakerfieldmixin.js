var FormmakerfieldMixin =
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
/***/ function(module, exports) {

	module.exports = window.FormmakerfieldMixin = {

	    props: ['isAdmin', 'submission', 'field', 'form'],

	    methods: {
	        getDataObject: function (defaultValue) {
	            if (this.isAdmin) {
	                this.field.data.value = this.field.data.value || defaultValue;
	                return this.field.data;
	            }
	            this.submission.data[this.field.id].type = this.field.type;
	            this.submission.data[this.field.id].label = this.field.label;
	            this.submission.data[this.field.id].value = defaultValue;
	            this.submission.data[this.field.id].prepared = this.field.prepared;
	            return this.submission.data[this.field.id];
	        },
	        fieldInvalid: function (form) {
	            return form && form[this.fieldid] ? form[this.fieldid].invalid : false;
	        },
	        classes: function (classes_array, classes_string) {
	            return (classes_array || []).concat(String(classes_string || '').split(' '));
	        }

	    },

	    computed: {
	        fieldRequired: function () {
	            return this.field.data.required && !this.isAdmin ? true : false;
	        },
	        fieldLabel: function () {
	            return this.isAdmin ? 'Default value' : this.field.label;
	        }
	    }

	};

/***/ }
/******/ ]);