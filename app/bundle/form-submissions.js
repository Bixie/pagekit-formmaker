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

	module.exports = {

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
	        this.resource = this.$resource('api/formmaker/submission/:id', {}, {'export': {method: 'post', url: 'api/formmaker/submission/csv'}});
	        this.config.filter = _.extend({ status: '', form: '', order: 'created desc'}, this.config.filter);
	        this.$on('close.submissionmodal', function () {
	            if (this.$url.current.hash) {
	                window.history.replaceState({}, '', this.$url.current.href.replace('#' + this.$url.current.hash, ''));
	                this.$url.current.hash = '';
	            }
	        });
	        this.$on('close.csvmodal', function () {
	            this.load();
	        });

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

	            var options = _.map(this.$data.statuses, function (status, id) {
	                return { text: status, value: id };
	            });

	            return [{ text: this.$trans('Status'), value: '' }, { text: this.$trans('Show all'), value: 'all' }, { label: this.$trans('Filter by'), options: options }];
	        },

	        formOptions: function () {

	            var options = _.map(this.$data.forms, function (form) {
	                return { text: form.title, value: form.id };
	            });

	            return [{ text: this.$trans('Form'), value: '' }, { label: this.$trans('Filter by'), options: options }];
	        }

	    },

	    methods: {

	        load: function (page) {

	            page = page !== undefined ? page : this.config.page;

	            this.resource.query({ filter: this.config.filter, page: page }, function (data) {
	                this.$set('submissions', data.submissions);
	                this.$set('pages', data.pages);
	                this.$set('count', data.count);
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

	            this.resource.save({id: 'bulk'}, {submissions: submissions}, function (data) {
	                this.load();
	                this.$notify('Submission(s) saved.');
	            });
	        },

	        toggleStatus: function (submission) {
	            submission.status = submission.status === 2 ? 0 : submission.status + 1;
	            this.resource.save({id: submission.id}, {submission: submission}, function (data) {
	                this.load();
	                this.$notify('Submission saved.');
	            });
	        },

	        removeSubmissions: function () {

	            this.resource.delete({id: 'bulk'}, {ids: this.selected}, function () {
	                this.load();
	                this.$notify('Submission(s) deleted.');
	            });
	        },

	        submissionDetails: function (submission) {
	            window.history.replaceState({}, '', this.$url.current.href.replace('#' + this.$url.current.hash, '') + '#' + submission.id);
	            this.$url.current.hash = '#' + submission.id;
	            this.submissionID = submission.id;
	            this.$.submissionmodal.open();
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
	        'submissiondetail': __webpack_require__(57),
	        'submissioncsv': __webpack_require__(60)
	    }

	};

	__webpack_require__(56)(Vue);

	$(function () {

	    new Vue(module.exports).$mount('#formmaker-submissions');

	});



/***/ },

/***/ 56:
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

/***/ 57:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(58)
	module.exports.template = __webpack_require__(59)


/***/ },

/***/ 58:
/***/ function(module, exports) {

	module.exports = {
	        data: function () {
	            return {
	                submission: {status: null},
	                loaded: false
	            };
	        },

	        inherit: true,

	        props: ['submissionid'],

	        created: function () {

	            this.resource.query({id: 'detail', submission_id: this.submissionid}, function (data) {
	                this.$set('submission', data);
	                this.loaded = true;
	            }.bind(this));

	        },

	        beforeDestroy: function () {
	            this.$dispatch('close.submissionmodal');
	        },

	        computed: {
	            submissionStatuses: function () {

	                return _.map(this.statuses, function (status, id) {
	                    return { text: status, value: id };
	                });

	            }
	        },

	        watch: {
	            'submission.status': function (value, oldValue) {
	                if (oldValue !== null && oldValue !== value) {
	                    this.status(value, [this.submission])
	                }
	            }
	        }

	    };

/***/ },

/***/ 59:
/***/ function(module, exports) {

	module.exports = "<div class=\"uk-modal-spinner\" v-if=\"!loaded\"></div>\r\n    <div v-show=\"loaded\">\r\n        <div class=\"uk-grid\">\r\n            <div class=\"uk-width-medium-3-4\">\r\n\r\n                <h2 class=\"uk-margin-top-remove\">{{ 'Submission for form \"%formtitle%\"' | trans {formtitle:submission.form_title} }}</h2>\r\n                <dl class=\"uk-description-list uk-description-list-horizontal\">\r\n                    <dt>{{ 'Submission date' | trans }}</dt><dd>{{ submission.created | datetime }}</dd>\r\n                    <dt>{{ 'Submission status' | trans }}</dt><dd v-class=\"uk-text-danger: submission.status == 0,\r\n\t\t\t\t\t\t\t  uk-text-primary: submission.status == 1,\r\n\t\t\t\t\t\t\t  uk-text-success: submission.status == 2\">{{ getStatusText(submission) | trans }}</dd>\r\n                    <dt>{{ 'Remote IP address' | trans }}</dt><dd>{{ submission.ip }}</dd>\r\n                    <dt>{{ 'Email sent to' | trans }}</dt>\r\n                    <dd>\r\n                        <a v-if=\"submission.email\" href=\"mailto:{{ submission.email }}\">{{ submission.email }}</a>\r\n                        <span v-if=\"!submission.email\">{{ 'No email provided' | trans }}</span>\r\n                    </dd>\r\n                </dl>\r\n                <h3>{{ 'Submission data' | trans }}</h3>\r\n                <dl class=\"uk-description-list uk-description-list-horizontal\">\r\n                    <template v-repeat=\"fieldsubmission: submission.fieldsubmissions\">\r\n                        <dt>{{ fieldsubmission.field.label}}</dt>\r\n                        <dd v-repeat=\"fieldsubmission.value\">{{ $value }}</dd>\r\n                    </template>\r\n                </dl>\r\n\r\n            </div>\r\n            <div class=\"uk-width-medium-1-4 uk-form\">\r\n\r\n               <div class=\"uk-form-row\">\r\n                    <label for=\"form-status\" class=\"uk-form-label\">{{ 'Status' | trans }}</label>\r\n\r\n                    <div class=\"uk-form-controls\">\r\n                        <select id=\"form-status\" class=\"uk-width-1-1\" options=\"submissionStatuses\" v-model=\"submission.status\" number></select>\r\n                    </div>\r\n                </div>\r\n\r\n            </div>\r\n        </div>\r\n\r\n    </div>\r\n\r\n    <div class=\"uk-modal-footer uk-text-right\">\r\n        <button type=\"button\" class=\"uk-button uk-modal-close\">{{ 'Close' | trans }}</button>\r\n    </div>";

/***/ },

/***/ 60:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(61)
	module.exports.template = __webpack_require__(62)


/***/ },

/***/ 61:
/***/ function(module, exports) {

	module.exports = {
	        data: function () {
	            return {
	                options: {
	                    form_id: 0,
	                    mark_archived: true,
	                    status: [1, 2],
	                    field_ids: [],
	                    datafields: ['id', 'status', 'email', 'ip', 'created']
	                },
	                forms: [],
	                formitem: {
	                    id: 0,
	                    fields: []
	                },
	                csvLink: '',
	                exporting: false,
	                loaded: false
	            };
	        },

	        inherit: true,

	        created: function () {
	            this.load();
	        },

	        beforeDestroy: function () {
	            this.$dispatch('close.csvmodal');
	        },

	        filters: {
	            formsList: function (value) {
	                var vm = this, options = [{value: 0, text: vm.$trans('Select form')}];
	                 value.forEach(function (form) {
	                    options.push({value: form.id, text: vm.$trans(form.title)});
	                });
	                return options;
	            }
	        },

	        computed: {
	            formLoaded: function () {
	                return this.options.form_id && this.options.form_id == this.formitem.id;
	            }
	        },

	        methods: {
	            load: function () {
	                this.resource.query({id: 'csv', options: this.options}, function (data) {
	                    this.$set('options', data.options);
	                    if (data.forms.length) {
	                        this.$set('count', 0);
	                        this.$set('forms', data.forms);
	                    }
	                    if (data.formitem.id) {
	                        this.$set('formitem', data.formitem);
	                        this.$set('formitem.fields', data.fields);
	                        this.$set('count', data.count);
	                        this.options.filename = 'export_' + this.formitem.slug + '.csv'
	                    }
	                    this.loaded = true;
	                }.bind(this));

	            },

	            doExport: function () {

	                if (this.exporting || !this.options.form_id || this.formitem.id !== this.options.form_id) {
	                    return false;
	                }
	                this.exporting = true;
	                this.resource.export({options: this.options}, function (data) {
	                    if (data.csv) {
	                        var $url = window.URL || window.webkitURL;
	                        this.csvLink = $url.createObjectURL(new Blob([data.csv], {type: "application/force-download"}));
	                        this.exporting = false;
	                    }
	                }.bind(this));
	            }
	        },

	        watch: {
	            'options': {handler: function (value) {
	                this.csvLink = '';
	            }, deep: true},

	            'options.form_id': function (value) {
	                this.load();
	            }
	        }


	    };

/***/ },

/***/ 62:
/***/ function(module, exports) {

	module.exports = "<div class=\"uk-modal-header\">\r\n        <h2>{{ 'Export submissions as CSV file' | trans }}</h2>\r\n    </div>\r\n\r\n    <div class=\"uk-margin uk-form uk-form-stacked\">\r\n        <div class=\"uk-modal-spinner\" v-if=\"!loaded\"></div>\r\n        <div v-show=\"loaded\">\r\n\r\n            <div class=\"uk-grid\">\r\n                <div class=\"uk-width-medium-1-2\">\r\n                    <select class=\"uk-width-1-1\" v-model=\"options.form_id\" options=\"forms | formsList\" number></select>\r\n\r\n                </div>\r\n                <div class=\"uk-width-medium-1-2\">\r\n                    <div class=\"uk-form-controls uk-form-controls-text uk-flex uk-margin-small-top\">\r\n                        <div class=\"uk-width-1-3\">\r\n                            <label><input type=\"checkbox\" value=\"0\"v-on=\"click: load\" v-checkbox=\"options.status\" number> {{ 'Archived' | trans\r\n                                }}</label>\r\n                        </div>\r\n                        <div class=\"uk-width-1-3\">\r\n                            <label><input type=\"checkbox\" value=\"1\"v-on=\"click: load\" v-checkbox=\"options.status\" number> {{ 'Active' | trans\r\n                                }}</label>\r\n                        </div>\r\n                        <div class=\"uk-width-1-3\">\r\n                            <label><input type=\"checkbox\" value=\"2\"v-on=\"click: load\" v-checkbox=\"options.status\" number> {{ 'Done' | trans\r\n                                }}</label>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"uk-grid\" v-if=\"formLoaded\">\r\n                <div class=\"uk-width-medium-2-3\">\r\n\r\n                    <div class=\"uk-grid\">\r\n                        <div class=\"uk-width-medium-1-2\">\r\n\r\n                            <div class=\"uk-form-row\">\r\n                                <span class=\"uk-form-label\">{{ 'Data to export' | trans }}</span>\r\n\r\n                                <div class=\"uk-form-controls uk-form-controls-text\">\r\n                                    <p class=\"uk-form-controls-condensed\">\r\n                                        <label><input type=\"checkbox\" value=\"id\" v-checkbox=\"options.datafields\"> {{ 'Id' | trans\r\n                                            }}</label>\r\n                                    </p>\r\n                                    <p class=\"uk-form-controls-condensed\">\r\n                                        <label><input type=\"checkbox\" value=\"status\" v-checkbox=\"options.datafields\"> {{ 'Status' | trans\r\n                                            }}</label>\r\n                                    </p>\r\n                                    <p class=\"uk-form-controls-condensed\">\r\n                                        <label><input type=\"checkbox\" value=\"email\" v-checkbox=\"options.datafields\"> {{ 'Email' | trans\r\n                                            }}</label>\r\n                                    </p>\r\n                                    <p class=\"uk-form-controls-condensed\">\r\n                                        <label><input type=\"checkbox\" value=\"ip\" v-checkbox=\"options.datafields\"> {{ 'IP address' | trans\r\n                                            }}</label>\r\n                                    </p>\r\n                                    <p class=\"uk-form-controls-condensed\">\r\n                                        <label><input type=\"checkbox\" value=\"created\" v-checkbox=\"options.datafields\"> {{ 'Created' | trans\r\n                                            }}</label>\r\n                                    </p>\r\n                                </div>\r\n                            </div>\r\n\r\n                        </div>\r\n                        <div class=\"uk-width-medium-1-2\">\r\n\r\n                            <div class=\"uk-form-row\">\r\n                                <span class=\"uk-form-label\">{{ 'Fields to export' | trans }}</span>\r\n\r\n                                <div class=\"uk-form-controls uk-form-controls-text\">\r\n                                    <p v-repeat=\"field: formitem.fields\" class=\"uk-form-controls-condensed\">\r\n                                        <label><input type=\"checkbox\" value=\"{{ field.id }}\" v-checkbox=\"options.field_ids\" number> {{ field.label | trans\r\n                                            }}</label>\r\n                                    </p>\r\n                                </div>\r\n                            </div>\r\n\r\n                        </div>\r\n                    </div>\r\n\r\n                </div>\r\n                <div class=\"uk-width-medium-1-3\">\r\n                    <div class=\"uk-panel uk-panel-box\">\r\n\r\n                        <div class=\"uk-form-row\">\r\n                            <label for=\"form-filename\" class=\"uk-form-label\">{{ 'Filename' | trans }}</label>\r\n\r\n                            <div class=\"uk-form-controls\">\r\n                                <input id=\"form-filename\" class=\"uk-width-1-1\" type=\"text\" v-model=\"options.filename\">\r\n                            </div>\r\n                        </div>\r\n\r\n\r\n                        <div class=\"uk-form-row\">\r\n                            <span class=\"uk-form-label\">{{ 'Archive' | trans }}</span>\r\n\r\n                            <div class=\"uk-form-controls uk-form-controls-text\">\r\n                                <label><input type=\"checkbox\" value=\"archived\" v-model=\"options.mark_archived\"> {{ 'Mark exported as \"Archived\"' | trans\r\n                                    }}</label>\r\n                            </div>\r\n                        </div>\r\n\r\n                        <div class=\"uk-badge uk-badge-success uk-margin\">\r\n                            {{ count }} {{ '{0} submissions to be exported|{1} submission to be exported|]1,Inf[ submissions to be exported' | transChoice count}}\r\n                        </div>\r\n\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n        </div>\r\n\r\n    </div>\r\n\r\n    <div class=\"uk-modal-footer uk-text-right\">\r\n        <button type=\"button\" class=\"uk-button uk-modal-close\">{{ 'Close' | trans }}</button>\r\n        <button type=\"button\" class=\"uk-button uk-button-primary\"\r\n                v-show=\"!csvLink\" v-on=\"click: doExport\" v-el=\"export\"\r\n                v-attr=\"disabled: !formLoaded\">\r\n            <i v-show=\"exporting\" class=\"uk-icon-spinner uk-icon-spin\"></i>\r\n            <span v-show=\"!exporting\">{{ 'Export' | trans }}</span>\r\n        </button>\r\n        <!-- //todo downloadname is buggy-->\r\n        <a v-attr=\"href: csvLink\" class=\"uk-button uk-button-success\" download=\"{{ options.filename }}\"\r\n               v-show=\"csvLink\" v-el=\"exportlink\"><i class=\"uk-icon-download uk-margin-small-right\"></i>{{ 'Download' | trans }}</a>\r\n    </div>";

/***/ }

/******/ });