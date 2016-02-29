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
	__vue_script__ = __webpack_require__(45)
	__vue_template__ = __webpack_require__(46)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "C:\\BixieProjects\\pagekit\\pagekit\\packages\\bixie\\formmaker\\app\\components\\widget-formmaker.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 31:
/***/ function(module, exports) {

	module.exports = function (Vue) {

	    Vue.filter('datetime', function (date) {
	        if (typeof date === 'string') {
	            date = new Date(date);
	        }
	        return date ? this.$date(date, 'mediumDate') + ', ' + this.$date(date, 'HH:mm:ss') : '';
	    });

	    Vue.filter('shortcode', function (slug, key) {
	        return '$$ ' + slug + ':' + key + ' $$';
	    });

	};

/***/ },

/***/ 45:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// <template>
	//
	//     <form class="pk-panel-teaser uk-form uk-form-stacked" v-if="editing">
	//
	//         <div class="uk-form-row ">
	//             <span class="uk-form-label">{{ 'Filter forms' | trans }}</span>
	//
	//             <div class="uk-form-controls uk-form-controls-text">
	//                 <p class="uk-form-controls-condensed">
	//                     <label><input type="checkbox" value="all" v-model="widget.form"> {{ 'Show all' | trans }}</label>
	//                 </p>
	//                 <p v-for="form in forms" class="uk-form-controls-condensed">
	//                     <label><input type="checkbox" :value="form.id" v-model="widget.form"> {{ form.title }}</label>
	//                 </p>
	//             </div>
	//         </div>
	//
	//         <div class="uk-form-row">
	//             <span class="uk-form-label">{{ 'Done submissions' | trans }}</span>
	//
	//             <div class="uk-form-controls uk-form-controls-text">
	//                 <p class="uk-form-controls-condensed">
	//                     <label><input type="radio" value="1" v-model="widget.done"> {{ 'Show' | trans }}</label>
	//                 </p>
	//
	//                 <p class="uk-form-controls-condensed">
	//                     <label><input type="radio" value="" v-model="widget.done"> {{ 'Hide' | trans }}</label>
	//                 </p>
	//             </div>
	//         </div>
	//
	//         <div class="uk-form-row">
	//             <label class="uk-form-label" for="form-submissions-number">{{ 'Number of submissions' | trans }}</label>
	//
	//             <div class="uk-form-controls">
	//                 <select id="form-submissions-number" class="uk-width-1-1" v-model="widget.count" number>
	//                     <option value="6">6</option>
	//                     <option value="12">12</option>
	//                     <option value="18">16</option>
	//                 </select>
	//             </div>
	//         </div>
	//
	//     </form>
	//
	//     <div class="pk-text-large">{{ count }}</div>
	//
	//     <h3 class="uk-panel-title" v-show="!widget.done">{{ '{0} Active submissions|{1} Active submission|]1,Inf[ Active submissions' | transChoice count}}</h3>
	//
	//     <h3 class="uk-panel-title" v-else>{{ '{0} Submissions|{1} Submission|]1,Inf[ Submissions' | transChoice count}}</h3>
	//
	//     <ul v-show="submissions.length" class="uk-list uk-list-line">
	//         <li class="" v-for="submission in submissions | orderBy 'status ASC, created DESC'">
	//             <span class="uk-float-right" :class="{'pk-icon-circle-danger': !submission.status,
	// 							  'pk-icon-circle-primary': submission.status == 1,
	// 							  'pk-icon-circle-success': submission.status == 2}"></span>
	//
	//             <a :href="$url.route('admin/formmaker/submissions#' + submission.id )">{{ submission.created | datetime }}</a>
	//             <div class="uk-text-truncate uk-text-muted">
	//                 {{ submission.form_title }}<span v-if="submission.email"> | {{ submission.email }}</span>
	//             </div>
	//         </li>
	//     </ul>
	//
	// </template>
	//
	// <script>
	__webpack_require__(31)(Vue);

	module.exports = {

	    type: {

	        id: 'formmaker',
	        label: 'New form submissions',
	        description: function description() {},
	        defaults: {
	            form: ['all'],
	            done: false,
	            count: 12
	        }

	    },

	    replace: false,

	    props: ['widget', 'editing'],

	    watch: {

	        'widget.form': {
	            handler: 'load',
	            immediate: true
	        },

	        'editing': 'loadForms',

	        'widget.count': 'load',

	        'widget.done': 'load'

	    },

	    methods: {

	        load: function load() {

	            var filter = {
	                status: 1,
	                limit: this.widget.count
	            };

	            if (this.$get('widget.form').indexOf('all') === -1) {
	                filter['form'] = this.$get('widget.form');
	            }

	            if (this.$get('widget.done')) {
	                filter['status'] = '';
	            }

	            this.$resource('api/formmaker/submission{/id}').query({ filter: filter }).then(function (res) {

	                this.$set('count', res.data.count);
	                this.$set('submissions', res.data.submissions);
	            });
	        },

	        loadForms: function loadForms(editing) {
	            if (editing && !this.$get('forms')) {

	                this.$resource('api/formmaker/form{/id}').query().then(function (res) {
	                    this.$set('forms', res.data);
	                });
	            }
	        }

	    }

	};

	window.Dashboard.components['formmaker'] = module.exports;

	// </script>
	//

/***/ },

/***/ 46:
/***/ function(module, exports) {

	module.exports = "\r\n\r\n    <form class=\"pk-panel-teaser uk-form uk-form-stacked\" v-if=\"editing\">\r\n\r\n        <div class=\"uk-form-row \">\r\n            <span class=\"uk-form-label\">{{ 'Filter forms' | trans }}</span>\r\n\r\n            <div class=\"uk-form-controls uk-form-controls-text\">\r\n                <p class=\"uk-form-controls-condensed\">\r\n                    <label><input type=\"checkbox\" value=\"all\" v-model=\"widget.form\"> {{ 'Show all' | trans }}</label>\r\n                </p>\r\n                <p v-for=\"form in forms\" class=\"uk-form-controls-condensed\">\r\n                    <label><input type=\"checkbox\" :value=\"form.id\" v-model=\"widget.form\"> {{ form.title }}</label>\r\n                </p>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"uk-form-row\">\r\n            <span class=\"uk-form-label\">{{ 'Done submissions' | trans }}</span>\r\n\r\n            <div class=\"uk-form-controls uk-form-controls-text\">\r\n                <p class=\"uk-form-controls-condensed\">\r\n                    <label><input type=\"radio\" value=\"1\" v-model=\"widget.done\"> {{ 'Show' | trans }}</label>\r\n                </p>\r\n\r\n                <p class=\"uk-form-controls-condensed\">\r\n                    <label><input type=\"radio\" value=\"\" v-model=\"widget.done\"> {{ 'Hide' | trans }}</label>\r\n                </p>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"uk-form-row\">\r\n            <label class=\"uk-form-label\" for=\"form-submissions-number\">{{ 'Number of submissions' | trans }}</label>\r\n\r\n            <div class=\"uk-form-controls\">\r\n                <select id=\"form-submissions-number\" class=\"uk-width-1-1\" v-model=\"widget.count\" number>\r\n                    <option value=\"6\">6</option>\r\n                    <option value=\"12\">12</option>\r\n                    <option value=\"18\">16</option>\r\n                </select>\r\n            </div>\r\n        </div>\r\n\r\n    </form>\r\n\r\n    <div class=\"pk-text-large\">{{ count }}</div>\r\n\r\n    <h3 class=\"uk-panel-title\" v-show=\"!widget.done\">{{ '{0} Active submissions|{1} Active submission|]1,Inf[ Active submissions' | transChoice count}}</h3>\r\n\r\n    <h3 class=\"uk-panel-title\" v-else>{{ '{0} Submissions|{1} Submission|]1,Inf[ Submissions' | transChoice count}}</h3>\r\n\r\n    <ul v-show=\"submissions.length\" class=\"uk-list uk-list-line\">\r\n        <li class=\"\" v-for=\"submission in submissions | orderBy 'status ASC, created DESC'\">\r\n            <span class=\"uk-float-right\" :class=\"{'pk-icon-circle-danger': !submission.status,\r\n\t\t\t\t\t\t\t  'pk-icon-circle-primary': submission.status == 1,\r\n\t\t\t\t\t\t\t  'pk-icon-circle-success': submission.status == 2}\"></span>\r\n\r\n            <a :href=\"$url.route('admin/formmaker/submissions#' + submission.id )\">{{ submission.created | datetime }}</a>\r\n            <div class=\"uk-text-truncate uk-text-muted\">\r\n                {{ submission.form_title }}<span v-if=\"submission.email\"> | {{ submission.email }}</span>\r\n            </div>\r\n        </li>\r\n    </ul>\r\n\r\n";

/***/ }

/******/ });