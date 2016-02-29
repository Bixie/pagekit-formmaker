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

	module.exports = {

	    el: '#formmaker-form',

	    data: _.assign({
	        formitem: {},
	        fields: [],
	        message: '',
	        error: '',
	        thankyou: '',
	        submission: {},
	        form: {}
	    }, window.$formmaker),

	    methods: {

	        save: function () {

	            var vm = this, data = {submission: this.submission};

	            this.$set('message', '');
	            this.$set('error', '');

	            this.$broadcast('submit', data);

	            this.$http.post('api/formmaker/submission', data)
	                .then(function (res) {
	                    data = res.data;
	                    this.message = data.message;
	                    if (data.submission.thankyou) {
	                        vm.$set('thankyou', data.submission.thankyou);
	                    }
	                    if (data.submission.redirect) {
	                        window.location.replace(data.submission.redirect);
	                    }
	                }, function (error) {
	                    this.error = this.$trans(error);
	                });
	        }

	    },

	    components: {
	        recaptcha: __webpack_require__(38)
	    }

	};

	Vue.ready(function () {
	    window.Formmaker = new Vue(module.exports);
	});


/***/ },

/***/ 38:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(39)
	__vue_template__ = __webpack_require__(40)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "C:\\BixieProjects\\pagekit\\pagekit\\packages\\bixie\\formmaker\\app\\components\\recaptcha.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 39:
/***/ function(module, exports) {

	'use strict';

	// <template>
	//     <div class="uk-form-row">
	//
	//         <span class="uk-form-label" v-show="formitem.data.recaptcha_label">{{ formitem.data.recaptcha_label | trans }}</span>
	//
	//         <div class="uk-form-controls uk-form-controls-text">
	//             <div id="grecaptcha_el"></div>
	//         </div>
	//
	//     </div>
	//
	// </template>
	//
	// <script>
	window.grecacapthaCallback = function () {
	    Vue.ready(function () {
	        window.Formmaker.$refs.grecaptcha.grecaptchaCallback(grecaptcha);
	    });
	};

	module.exports = {

	    props: ['sitekey', 'formitem'],

	    events: {
	        'submit': function submit(data) {
	            if (window.grecaptcha) {
	                data['g-recaptcha-response'] = grecaptcha.getResponse();
	            }
	        }
	    },

	    methods: {
	        grecaptchaCallback: function grecaptchaCallback(grecaptcha) {
	            grecaptcha.render('grecaptcha_el', {
	                'sitekey': this.sitekey,
	                'theme': this.formitem.data.recaptcha_theme || 'light',
	                'type': this.formitem.data.recaptcha_type || 'image',
	                'size': this.formitem.data.recaptcha_size || 'normal'
	            });
	        }

	    }

	};

	// </script>
	//

/***/ },

/***/ 40:
/***/ function(module, exports) {

	module.exports = "\r\n    <div class=\"uk-form-row\">\r\n\r\n        <span class=\"uk-form-label\" v-show=\"formitem.data.recaptcha_label\">{{ formitem.data.recaptcha_label | trans }}</span>\r\n\r\n        <div class=\"uk-form-controls uk-form-controls-text\">\r\n            <div id=\"grecaptcha_el\"></div>\r\n        </div>\r\n\r\n    </div>\r\n\r\n";

/***/ }

/******/ });