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
/***/ function(module, exports) {

	module.exports = {

	    data: _.extend({
	        formitem: {},
	        fields: [],
	        message: '',
	        error: '',
	        submission: {
	            form_id: 0,
	            data: {}
	        }
	    }, window.$data),

	    created: function () {
	        //prepare submission
	        this.submission.form_id = this.formitem.id;
	        this.fields.forEach(function (field) {
	            this.submission.data[field.id] = {
	                field_id: field.id,
	                field_type: field.type,
	                label: null,
	                value: null
	            };
	        }.bind(this));
	    },

	    methods: {

	        submit: function (e) {
	            e.preventDefault();

	            this.$set('message', '');
	            this.$set('error', '');

	            this.$http.post('api/formmaker/submission/save', {submission: this.submission}, function () {
	                this.message = this.$trans('Form submitted');
	            }).error(function (error) {
	                this.error = error;
	            });
	        }

	    }

	};

	$(function () {

	    new Vue(module.exports).$mount('#formmaker-profile');

	});


/***/ }
/******/ ]);