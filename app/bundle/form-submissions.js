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

	    el: '#formmaker-submissions',

	    data: function () {
	        return _.merge({
	            submissions: false,
	            submissionID: 0,
	            pages: 0,
	            count: '',
	            selected: []
	        }, window.$data);
	    },

	    created: function () {
	        this.resource = this.$resource('api/formmaker/submission{/id}', {'export': {method: 'post', url: 'api/formmaker/submission/csv'}});
	        this.config.filter = _.extend({ status: '', form: '', order: 'created desc'}, this.config.filter);
	    },

	    events: {
	        'close.submissionmodal': function () {
	            if (this.$url.current.hash) {
	                window.history.replaceState({}, '', this.$url.current.href.replace('#' + this.$url.current.hash, ''));
	                this.$url.current.hash = '';
	            }
	        },
	        'close.csvmodal': function () {
	            this.load();
	        }
	    },

	    watch: {

	        'config.page': 'load',

	        'config.filter': {
	            handler: function () { this.load(0); },
	            deep: true
	        }

	    },

	    computed: {

	        statusOptions: function () {

	            var options = _.map(this.statuses, function (status, id) {
	                return { text: status, value: id };
	            });

	            return [{ text: this.$trans('Status'), value: '' }, { text: this.$trans('Show all'), value: 'all' }, { label: this.$trans('Filter by'), options: options }];
	        },

	        formOptions: function () {

	            var options = _.map(this.forms, function (form) {
	                return { text: form.title, value: form.id };
	            });

	            return [{ text: this.$trans('Form'), value: '' }, { label: this.$trans('Filter by'), options: options }];
	        }

	    },

	    methods: {

	        load: function (page) {

	            page = page !== undefined ? page : this.config.page;

	            this.resource.query({ filter: this.config.filter, page: page }).then(function (res) {
	                this.$set('submissions', res.data.submissions);
	                this.$set('pages', res.data.pages);
	                this.$set('count', res.data.count);
	                this.$set('config.page', page);
	                this.$set('selected', []);
	                this.checkDetailHash();
	            });
	        },

	        checkDetailHash: function () {
	            if (this.$url.current.hash) {
	                var id = parseInt(this.$url.current.hash, 10), submission = _.find(this.submissions, function (submission) {
	                    return submission.id === id;
	                });
	                if (submission) {
	                    this.submissionDetails(submission);
	                }
	            }
	        },

	        active: function (submission) {
	            return this.selected.indexOf(submission.id) !== -1;
	        },

	        getSelected: function () {
	            return this.submissions.filter(function(submission) { return this.selected.indexOf(submission.id) !== -1; }, this);
	        },

	        getStatusText: function (submission) {
	            return this.statuses[submission.status];
	        },

	        status: function (status, submissions) {

	            submissions = submissions || this.getSelected();

	            submissions.forEach(function (submission) {
	                submission.status = status;
	            });

	            this.resource.save({id: 'bulk'}, {submissions: submissions}).then(function () {
	                this.load();
	                this.$notify('Submission(s) saved.');
	            });
	        },

	        toggleStatus: function (submission) {
	            submission.status = submission.status === 2 ? 0 : submission.status + 1;
	            this.resource.save({id: submission.id}, {submission: submission}).then(function () {
	                this.load();
	                this.$notify('Submission saved.');
	            });
	        },

	        removeSubmissions: function () {

	            this.resource.delete({id: 'bulk'}, {ids: this.selected}).then(function () {
	                this.load();
	                this.$notify('Submission(s) deleted.');
	            });
	        },

	        submissionDetails: function (submission) {
	            window.history.replaceState({}, '', this.$url.current.href.replace('#' + this.$url.current.hash, '') + '#' + submission.id);
	            this.$url.current.hash = '#' + submission.id;
	            this.submissionID = submission.id;
	            this.$refs.submissionmodal.open();
	        },

	        formatValue: function (fieldvalue) {
	            if (window.Formmakerfields.components[fieldvalue.type] && typeof window.Formmakerfields.components[fieldvalue.type].formatValue === 'function') {
	                console.log(fieldvalue.value);
	                return window.Formmakerfields.components[fieldvalue.type].formatValue.apply(this, [fieldvalue]);
	            }
	            return typeof fieldvalue.value === 'string' ? [fieldvalue.value] : fieldvalue.value;
	        }

	    },

	    components: {
	        'submissiondetail': __webpack_require__(32),
	        'submissioncsv': __webpack_require__(35)
	    }

	};

	__webpack_require__(31)(Vue);

	Vue.ready(module.exports);



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

/***/ 32:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(33)
	__vue_template__ = __webpack_require__(34)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "C:\\BixieProjects\\pagekit\\pagekit\\packages\\bixie\\formmaker\\app\\components\\submission-detail.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 33:
/***/ function(module, exports) {

	'use strict';

	// <template>
	//     <div class="uk-modal-spinner" v-if="!loaded"></div>
	//     <div v-show="loaded">
	//         <div class="uk-grid">
	//             <div class="uk-width-medium-3-4">
	//
	//                 <h2 class="uk-margin-top-remove">{{ 'Submission for form "%formtitle%"' | trans {formtitle:submission.form_title} }}</h2>
	//                 <dl class="uk-description-list uk-description-list-horizontal">
	//                     <dt>{{ 'Submission date' | trans }}</dt><dd>{{ submission.created | datetime }}</dd>
	//                     <dt>{{ 'Submission status' | trans }}</dt><dd :class="{'uk-text-danger': submission.status == 0,
	// 							  'uk-text-primary': submission.status == 1,
	// 							  'uk-text-success': submission.status == 2}">{{ $root.getStatusText(submission) | trans }}</dd>
	//                     <dt>{{ 'Remote IP address' | trans }}</dt><dd>{{ submission.ip }}</dd>
	//                     <dt>{{ 'Email sent to' | trans }}</dt>
	//                     <dd>
	//                         <a v-if="submission.email" href="mailto:{{ submission.email }}">{{ submission.email }}</a>
	//                         <span v-else>{{ 'No email provided' | trans }}</span>
	//                     </dd>
	//                 </dl>
	//                 <h3>{{ 'Submission data' | trans }}</h3>
	//                 <dl class="uk-description-list uk-description-list-horizontal">
	//                     <template v-for="fieldsubmission in submission.fieldsubmissions">
	//                         <dt>{{ fieldsubmission.field.label}}</dt>
	//                         <dd v-for="value in fieldsubmission.formatted">{{{ value }}}</dd>
	//                     </template>
	//                 </dl>
	//
	//             </div>
	//             <div class="uk-width-medium-1-4 uk-form">
	//
	//                <div class="uk-form-row">
	//                     <label for="form-status" class="uk-form-label">{{ 'Status' | trans }}</label>
	//
	//                     <div class="uk-form-controls">
	//                         <select id="form-status" class="uk-width-1-1" v-model="submission.status" number>
	//                             <option v-for="option in $root.statuses" :value="$key">{{ option }}</option>
	//                         </select>
	//                     </div>
	//                 </div>
	//
	//             </div>
	//         </div>
	//
	//     </div>
	//
	//     <div class="uk-modal-footer uk-text-right">
	//         <button type="button" class="uk-button uk-modal-close">{{ 'Close' | trans }}</button>
	//     </div>
	//
	// </template>
	//
	// <script>

	module.exports = {
	    data: function data() {
	        return {
	            submission: { status: null },
	            loaded: false
	        };
	    },

	    props: ['submissionid'],

	    created: function created() {

	        this.$root.resource.query({ id: 'detail', submission_id: this.submissionid }).then(function (res) {
	            this.$set('submission', res.data);
	            this.loaded = true;
	        }.bind(this));
	    },

	    beforeDestroy: function beforeDestroy() {
	        this.$dispatch('close.submissionmodal');
	    },

	    watch: {
	        'submission.status': function submissionStatus(value, oldValue) {
	            if (oldValue !== null && oldValue !== value) {
	                this.$root.status(value, [this.submission]);
	            }
	        }
	    }
	};

	// </script>
	//

/***/ },

/***/ 34:
/***/ function(module, exports) {

	module.exports = "\r\n    <div class=\"uk-modal-spinner\" v-if=\"!loaded\"></div>\r\n    <div v-show=\"loaded\">\r\n        <div class=\"uk-grid\">\r\n            <div class=\"uk-width-medium-3-4\">\r\n\r\n                <h2 class=\"uk-margin-top-remove\">{{ 'Submission for form \"%formtitle%\"' | trans {formtitle:submission.form_title} }}</h2>\r\n                <dl class=\"uk-description-list uk-description-list-horizontal\">\r\n                    <dt>{{ 'Submission date' | trans }}</dt><dd>{{ submission.created | datetime }}</dd>\r\n                    <dt>{{ 'Submission status' | trans }}</dt><dd :class=\"{'uk-text-danger': submission.status == 0,\r\n\t\t\t\t\t\t\t  'uk-text-primary': submission.status == 1,\r\n\t\t\t\t\t\t\t  'uk-text-success': submission.status == 2}\">{{ $root.getStatusText(submission) | trans }}</dd>\r\n                    <dt>{{ 'Remote IP address' | trans }}</dt><dd>{{ submission.ip }}</dd>\r\n                    <dt>{{ 'Email sent to' | trans }}</dt>\r\n                    <dd>\r\n                        <a v-if=\"submission.email\" href=\"mailto:{{ submission.email }}\">{{ submission.email }}</a>\r\n                        <span v-else>{{ 'No email provided' | trans }}</span>\r\n                    </dd>\r\n                </dl>\r\n                <h3>{{ 'Submission data' | trans }}</h3>\r\n                <dl class=\"uk-description-list uk-description-list-horizontal\">\r\n                    <template v-for=\"fieldsubmission in submission.fieldsubmissions\">\r\n                        <dt>{{ fieldsubmission.field.label}}</dt>\r\n                        <dd v-for=\"value in fieldsubmission.formatted\">{{{ value }}}</dd>\r\n                    </template>\r\n                </dl>\r\n\r\n            </div>\r\n            <div class=\"uk-width-medium-1-4 uk-form\">\r\n\r\n               <div class=\"uk-form-row\">\r\n                    <label for=\"form-status\" class=\"uk-form-label\">{{ 'Status' | trans }}</label>\r\n\r\n                    <div class=\"uk-form-controls\">\r\n                        <select id=\"form-status\" class=\"uk-width-1-1\" v-model=\"submission.status\" number>\r\n                            <option v-for=\"option in $root.statuses\" :value=\"$key\">{{ option }}</option>\r\n                        </select>\r\n                    </div>\r\n                </div>\r\n\r\n            </div>\r\n        </div>\r\n\r\n    </div>\r\n\r\n    <div class=\"uk-modal-footer uk-text-right\">\r\n        <button type=\"button\" class=\"uk-button uk-modal-close\">{{ 'Close' | trans }}</button>\r\n    </div>\r\n\r\n";

/***/ },

/***/ 35:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(36)
	__vue_template__ = __webpack_require__(37)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "C:\\BixieProjects\\pagekit\\pagekit\\packages\\bixie\\formmaker\\app\\components\\submission-csv.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 36:
/***/ function(module, exports) {

	'use strict';

	// <template>
	//
	//     <div>
	//         <div class="uk-modal-header">
	//             <h2>{{ 'Export submissions as CSV file' | trans }}</h2>
	//         </div>
	//
	//         <div class="uk-margin uk-form uk-form-stacked">
	//             <div class="uk-modal-spinner" v-if="!loaded"></div>
	//             <div v-show="loaded">
	//
	//                 <div class="uk-grid">
	//                     <div class="uk-width-medium-1-2">
	//                         <select class="uk-width-1-1" v-model="options.form_id" number>
	//                             <option value="">{{ 'Select form' | trans }}</option>
	//                             <option v-for="form in forms" :value="form.id">{{ form.title }}</option>
	//                         </select>
	//
	//                     </div>
	//                     <div class="uk-width-medium-1-2">
	//                         <div class="uk-form-controls uk-form-controls-text uk-flex uk-margin-small-top">
	//                             <div class="uk-width-1-3">
	//                                 <label><input type="checkbox" :value="0" v-model="options.status" number>
	//                                     {{ 'Archived' | trans
	//                                     }}</label>
	//                             </div>
	//                             <div class="uk-width-1-3">
	//                                 <label><input type="checkbox" :value="1" v-model="options.status" number>
	//                                     {{ 'Active' | trans
	//                                     }}</label>
	//                             </div>
	//                             <div class="uk-width-1-3">
	//                                 <label><input type="checkbox" :value="2" v-model="options.status" number>
	//                                     {{ 'Done' | trans
	//                                     }}</label>
	//                             </div>
	//                         </div>
	//                     </div>
	//                 </div>
	//
	//                 <div class="uk-grid" v-if="formLoaded">
	//                     <div class="uk-width-medium-2-3">
	//
	//                         <div class="uk-grid">
	//                             <div class="uk-width-medium-1-2">
	//
	//                                 <div class="uk-form-row">
	//                                     <span class="uk-form-label">{{ 'Data to export' | trans }}</span>
	//
	//                                     <div class="uk-form-controls uk-form-controls-text">
	//                                         <p class="uk-form-controls-condensed">
	//                                             <label><input type="checkbox" value="id" v-model="options.datafields"> {{
	//                                                 'Id' | trans
	//                                                 }}</label>
	//                                         </p>
	//
	//                                         <p class="uk-form-controls-condensed">
	//                                             <label><input type="checkbox" value="status" v-model="options.datafields">
	//                                                 {{ 'Status' | trans
	//                                                 }}</label>
	//                                         </p>
	//
	//                                         <p class="uk-form-controls-condensed">
	//                                             <label><input type="checkbox" value="email" v-model="options.datafields"> {{
	//                                                 'Email' | trans
	//                                                 }}</label>
	//                                         </p>
	//
	//                                         <p class="uk-form-controls-condensed">
	//                                             <label><input type="checkbox" value="ip" v-model="options.datafields"> {{
	//                                                 'IP address' | trans
	//                                                 }}</label>
	//                                         </p>
	//
	//                                         <p class="uk-form-controls-condensed">
	//                                             <label><input type="checkbox" value="created" v-model="options.datafields">
	//                                                 {{ 'Created' | trans
	//                                                 }}</label>
	//                                         </p>
	//                                     </div>
	//                                 </div>
	//
	//                             </div>
	//                             <div class="uk-width-medium-1-2">
	//
	//                                 <div class="uk-form-row">
	//                                     <span class="uk-form-label">{{ 'Fields to export' | trans }}</span>
	//
	//                                     <div class="uk-form-controls uk-form-controls-text">
	//                                         <p v-for="field in formitem.fields" class="uk-form-controls-condensed">
	//                                             <label><input type="checkbox" value="{{ field.id }}"
	//                                                           v-model="options.field_ids" number> {{ field.label | trans
	//                                                 }}</label>
	//                                         </p>
	//                                     </div>
	//                                 </div>
	//
	//                             </div>
	//                         </div>
	//
	//                     </div>
	//                     <div class="uk-width-medium-1-3">
	//                         <div class="uk-panel uk-panel-box">
	//
	//                             <div class="uk-form-row">
	//                                 <label for="form-filename" class="uk-form-label">{{ 'Filename' | trans }}</label>
	//
	//                                 <div class="uk-form-controls">
	//                                     <input id="form-filename" class="uk-width-1-1" type="text"
	//                                            v-model="options.filename">
	//                                 </div>
	//                             </div>
	//
	//
	//                             <div class="uk-form-row">
	//                                 <span class="uk-form-label">{{ 'Archive' | trans }}</span>
	//
	//                                 <div class="uk-form-controls uk-form-controls-text">
	//                                     <label><input type="checkbox" value="archived" v-model="options.mark_archived"> {{
	//                                         'Mark exported as "Archived"' | trans
	//                                         }}</label>
	//                                 </div>
	//                             </div>
	//
	//                             <div class="uk-badge uk-badge-success uk-margin">
	//                                 {{ count }} {{ '{0} submissions to be exported|{1} submission to be exported|]1,Inf[
	//                                 submissions to be exported' | transChoice count}}
	//                             </div>
	//
	//                         </div>
	//                     </div>
	//                 </div>
	//
	//             </div>
	//
	//         </div>
	//
	//         <div class="uk-modal-footer uk-text-right">
	//             <button type="button" class="uk-button uk-modal-close">{{ 'Close' | trans }}</button>
	//             <button type="button" class="uk-button uk-button-primary"
	//                     v-show="!csvLink" @click="doExport" v-el:export
	//                     :disabled="!formLoaded">
	//                 <i v-show="exporting" class="uk-icon-spinner uk-icon-spin"></i>
	//                 <span v-else>{{ 'Export' | trans }}</span>
	//             </button>
	//             <a :href="csvLink" class="uk-button uk-button-success" download="{{ options.filename }}"
	//                v-show="csvLink" v-el:exportlink><i class="uk-icon-download uk-margin-small-right"></i>{{ 'Download' |
	//                 trans }}</a>
	//         </div>
	//     </div>
	//
	//
	// </template>
	//
	// <script>

	module.exports = {

	    props: ['forms'],

	    data: function data() {
	        return {
	            options: {
	                form_id: 0,
	                filename: 'csv-export.csv',
	                mark_archived: true,
	                status: [1, 2],
	                field_ids: [],
	                datafields: ['id', 'status', 'email', 'ip', 'created']
	            },
	            formitem: {
	                id: 0,
	                fields: []
	            },
	            csvLink: '',
	            exporting: false,
	            count: 0,
	            loaded: false
	        };
	    },

	    created: function created() {
	        this.load();
	    },

	    beforeDestroy: function beforeDestroy() {
	        this.$dispatch('close.csvmodal');
	    },

	    computed: {
	        formLoaded: function formLoaded() {
	            return this.options.form_id && this.options.form_id == this.formitem.id;
	        }
	    },

	    methods: {
	        load: function load() {
	            this.$root.resource.query({ id: 'csv', options: this.options }).then(function (res) {
	                var data = res.data;
	                this.$set('options.field_ids', data.options.field_ids);
	                this.$set('options.filename', data.options.filename);
	                if (data.forms.length) {
	                    this.$set('count', 0);
	                    this.$set('forms', data.forms);
	                }
	                if (data.formitem.id) {
	                    this.$set('formitem', data.formitem);
	                    this.$set('formitem.fields', data.fields);
	                    this.$set('count', data.count);
	                    this.options.filename = 'export_' + this.formitem.slug + '.csv';
	                }
	                this.loaded = true;
	            }.bind(this));
	        },

	        doExport: function doExport() {

	            if (this.exporting || !this.options.form_id || this.formitem.id !== this.options.form_id) {
	                return false;
	            }
	            this.exporting = true;
	            this.$root.resource.export({ options: this.options }).then(function (res) {
	                if (res.data.csv) {
	                    var $url = window.URL || window.webkitURL;
	                    this.csvLink = $url.createObjectURL(new Blob([res.data.csv], { type: "application/force-download" }));
	                    this.exporting = false;
	                }
	            }.bind(this));
	        }
	    },

	    watch: {
	        'options': { handler: function handler(value) {
	                this.csvLink = '';
	            }, deep: true },

	        'options.form_id,options.status': function optionsForm_idOptionsStatus(value) {
	            this.load();
	        }
	    }

	};

	// </script>
	//

/***/ },

/***/ 37:
/***/ function(module, exports) {

	module.exports = "\r\n\r\n    <div>\r\n        <div class=\"uk-modal-header\">\r\n            <h2>{{ 'Export submissions as CSV file' | trans }}</h2>\r\n        </div>\r\n\r\n        <div class=\"uk-margin uk-form uk-form-stacked\">\r\n            <div class=\"uk-modal-spinner\" v-if=\"!loaded\"></div>\r\n            <div v-show=\"loaded\">\r\n\r\n                <div class=\"uk-grid\">\r\n                    <div class=\"uk-width-medium-1-2\">\r\n                        <select class=\"uk-width-1-1\" v-model=\"options.form_id\" number>\r\n                            <option value=\"\">{{ 'Select form' | trans }}</option>\r\n                            <option v-for=\"form in forms\" :value=\"form.id\">{{ form.title }}</option>\r\n                        </select>\r\n\r\n                    </div>\r\n                    <div class=\"uk-width-medium-1-2\">\r\n                        <div class=\"uk-form-controls uk-form-controls-text uk-flex uk-margin-small-top\">\r\n                            <div class=\"uk-width-1-3\">\r\n                                <label><input type=\"checkbox\" :value=\"0\" v-model=\"options.status\" number>\r\n                                    {{ 'Archived' | trans\r\n                                    }}</label>\r\n                            </div>\r\n                            <div class=\"uk-width-1-3\">\r\n                                <label><input type=\"checkbox\" :value=\"1\" v-model=\"options.status\" number>\r\n                                    {{ 'Active' | trans\r\n                                    }}</label>\r\n                            </div>\r\n                            <div class=\"uk-width-1-3\">\r\n                                <label><input type=\"checkbox\" :value=\"2\" v-model=\"options.status\" number>\r\n                                    {{ 'Done' | trans\r\n                                    }}</label>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"uk-grid\" v-if=\"formLoaded\">\r\n                    <div class=\"uk-width-medium-2-3\">\r\n\r\n                        <div class=\"uk-grid\">\r\n                            <div class=\"uk-width-medium-1-2\">\r\n\r\n                                <div class=\"uk-form-row\">\r\n                                    <span class=\"uk-form-label\">{{ 'Data to export' | trans }}</span>\r\n\r\n                                    <div class=\"uk-form-controls uk-form-controls-text\">\r\n                                        <p class=\"uk-form-controls-condensed\">\r\n                                            <label><input type=\"checkbox\" value=\"id\" v-model=\"options.datafields\"> {{\r\n                                                'Id' | trans\r\n                                                }}</label>\r\n                                        </p>\r\n\r\n                                        <p class=\"uk-form-controls-condensed\">\r\n                                            <label><input type=\"checkbox\" value=\"status\" v-model=\"options.datafields\">\r\n                                                {{ 'Status' | trans\r\n                                                }}</label>\r\n                                        </p>\r\n\r\n                                        <p class=\"uk-form-controls-condensed\">\r\n                                            <label><input type=\"checkbox\" value=\"email\" v-model=\"options.datafields\"> {{\r\n                                                'Email' | trans\r\n                                                }}</label>\r\n                                        </p>\r\n\r\n                                        <p class=\"uk-form-controls-condensed\">\r\n                                            <label><input type=\"checkbox\" value=\"ip\" v-model=\"options.datafields\"> {{\r\n                                                'IP address' | trans\r\n                                                }}</label>\r\n                                        </p>\r\n\r\n                                        <p class=\"uk-form-controls-condensed\">\r\n                                            <label><input type=\"checkbox\" value=\"created\" v-model=\"options.datafields\">\r\n                                                {{ 'Created' | trans\r\n                                                }}</label>\r\n                                        </p>\r\n                                    </div>\r\n                                </div>\r\n\r\n                            </div>\r\n                            <div class=\"uk-width-medium-1-2\">\r\n\r\n                                <div class=\"uk-form-row\">\r\n                                    <span class=\"uk-form-label\">{{ 'Fields to export' | trans }}</span>\r\n\r\n                                    <div class=\"uk-form-controls uk-form-controls-text\">\r\n                                        <p v-for=\"field in formitem.fields\" class=\"uk-form-controls-condensed\">\r\n                                            <label><input type=\"checkbox\" value=\"{{ field.id }}\"\r\n                                                          v-model=\"options.field_ids\" number> {{ field.label | trans\r\n                                                }}</label>\r\n                                        </p>\r\n                                    </div>\r\n                                </div>\r\n\r\n                            </div>\r\n                        </div>\r\n\r\n                    </div>\r\n                    <div class=\"uk-width-medium-1-3\">\r\n                        <div class=\"uk-panel uk-panel-box\">\r\n\r\n                            <div class=\"uk-form-row\">\r\n                                <label for=\"form-filename\" class=\"uk-form-label\">{{ 'Filename' | trans }}</label>\r\n\r\n                                <div class=\"uk-form-controls\">\r\n                                    <input id=\"form-filename\" class=\"uk-width-1-1\" type=\"text\"\r\n                                           v-model=\"options.filename\">\r\n                                </div>\r\n                            </div>\r\n\r\n\r\n                            <div class=\"uk-form-row\">\r\n                                <span class=\"uk-form-label\">{{ 'Archive' | trans }}</span>\r\n\r\n                                <div class=\"uk-form-controls uk-form-controls-text\">\r\n                                    <label><input type=\"checkbox\" value=\"archived\" v-model=\"options.mark_archived\"> {{\r\n                                        'Mark exported as \"Archived\"' | trans\r\n                                        }}</label>\r\n                                </div>\r\n                            </div>\r\n\r\n                            <div class=\"uk-badge uk-badge-success uk-margin\">\r\n                                {{ count }} {{ '{0} submissions to be exported|{1} submission to be exported|]1,Inf[\r\n                                submissions to be exported' | transChoice count}}\r\n                            </div>\r\n\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n\r\n            </div>\r\n\r\n        </div>\r\n\r\n        <div class=\"uk-modal-footer uk-text-right\">\r\n            <button type=\"button\" class=\"uk-button uk-modal-close\">{{ 'Close' | trans }}</button>\r\n            <button type=\"button\" class=\"uk-button uk-button-primary\"\r\n                    v-show=\"!csvLink\" @click=\"doExport\" v-el:export\r\n                    :disabled=\"!formLoaded\">\r\n                <i v-show=\"exporting\" class=\"uk-icon-spinner uk-icon-spin\"></i>\r\n                <span v-else>{{ 'Export' | trans }}</span>\r\n            </button>\r\n            <a :href=\"csvLink\" class=\"uk-button uk-button-success\" download=\"{{ options.filename }}\"\r\n               v-show=\"csvLink\" v-el:exportlink><i class=\"uk-icon-download uk-margin-small-right\"></i>{{ 'Download' |\r\n                trans }}</a>\r\n        </div>\r\n    </div>\r\n\r\n\r\n";

/***/ }

/******/ });