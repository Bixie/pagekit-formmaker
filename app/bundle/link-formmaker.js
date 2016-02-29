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
	__vue_script__ = __webpack_require__(41)
	__vue_template__ = __webpack_require__(42)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "C:\\BixieProjects\\pagekit\\pagekit\\packages\\bixie\\formmaker\\app\\components\\link-formmaker.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 41:
/***/ function(module, exports) {

	'use strict';

	// <template>
	//
	//     <div class="uk-form-row">
	//         <label for="form-link-formmaker" class="uk-form-label">{{ 'Form' | trans }}</label>
	//         <div class="uk-form-controls">
	//             <select id="form-link-formmaker" class="uk-width-1-1" v-model="formid">
	//                 <option v-for="form in forms" :value="form.id">{{ form.title }}</option>
	//             </select>
	//         </div>
	//     </div>
	//
	// </template>
	//
	// <script>

	module.exports = {

	    link: {
	        label: 'Formmaker'
	    },

	    props: ['link'],

	    data: function data() {
	        return {
	            forms: [],
	            formid: ''
	        };
	    },

	    created: function created() {
	        //TODO don't retrieve entire form objects
	        this.$resource('api/formmaker/form').get().then(function (res) {
	            this.forms = res.data;
	            if (res.data.length) {
	                this.formid = res.data[0].id;
	            }
	        });
	    },

	    watch: {

	        formid: function formid(_formid) {
	            this.link = '@formmaker/form/front?id=' + _formid;
	        }

	    }

	};

	window.Links.components['formmaker'] = module.exports;

	// </script>
	//

/***/ },

/***/ 42:
/***/ function(module, exports) {

	module.exports = "\r\n\r\n    <div class=\"uk-form-row\">\r\n        <label for=\"form-link-formmaker\" class=\"uk-form-label\">{{ 'Form' | trans }}</label>\r\n        <div class=\"uk-form-controls\">\r\n            <select id=\"form-link-formmaker\" class=\"uk-width-1-1\" v-model=\"formid\">\r\n                <option v-for=\"form in forms\" :value=\"form.id\">{{ form.title }}</option>\r\n            </select>\r\n        </div>\r\n    </div>\r\n\r\n";

/***/ }

/******/ });