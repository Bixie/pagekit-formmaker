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

	module.exports = __webpack_require__(74)
	module.exports.template = __webpack_require__(75)


/***/ },

/***/ 68:
/***/ function(module, exports) {

	module.exports = {

	    props: ['isAdmin'],

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
	            return form[this.fieldid].invalid;
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

/***/ },

/***/ 74:
/***/ function(module, exports, __webpack_require__) {

	var formmakerfieldMixin = __webpack_require__(68);

	    module.exports = {

	        inherit: true,

	        mixins: [formmakerfieldMixin],

	        data: function () {
	            return {
	                fieldid: _.uniqueId('formmakerfield_')
	            };
	        },

	        created: function () {
	            this.$set('dataObject', this.getDataObject(this.field.data.value || ''));
	        }

	    };

	    window.Formmakerfields.components['htmlcode'] = module.exports;

/***/ },

/***/ 75:
/***/ function(module, exports) {

	module.exports = "<div v-if=\"isAdmin\" class=\"uk-form-row\">\n\n        <div class=\"uk-form-row\">\n            <v-editor id=\"{{ fieldid }}-html\" value=\"{{@ dataObject.value }}\" options=\"{{ {markdown : field.data.markdown} }}\"></v-editor>\n            <p>\n                <label><input type=\"checkbox\" v-model=\"field.data.markdown\"> {{ 'Enable Markdown' | trans }}</label>\n            </p>\n        </div>\n\n    </div>\n\n    <div v-if=\"!isAdmin\" class=\"uk-form-row {{field.data.classSfx || ''}}\">\n\n        {{{ dataObject.prepared }}}\n\n    </div>";

/***/ }

/******/ });