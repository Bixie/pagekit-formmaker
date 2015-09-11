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

	module.exports = __webpack_require__(70)
	module.exports.template = __webpack_require__(71)


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

/***/ 70:
/***/ function(module, exports, __webpack_require__) {

	var formmakerfieldMixin = __webpack_require__(68);

	    module.exports = {

	        inherit: true,

	        mixins: [formmakerfieldMixin],

	        data: function () {
	            return {
	                fieldid: _.uniqueId('formmakerfield_'),
	                dobDate: false,
	                day: '',
	                month: '',
	                year: '',
	                dateFormats: ['MM-DD-YYYY', 'DD-MM-YYYY']
	            };
	        },

	        created: function () {
	            this.$set('dataObject', this.getDataObject(this.field.data.value || ''));
	            //value dob
	            if (this.dataObject.value) {
	                this.setDate(this.dataObject.value);
	            } else {
	                this.dobDate = UIkit.Utils.moment();
	            }
	            //defaults admin
	            this.field.data.minAge = this.field.data.minAge || 1;
	            this.field.data.maxAge = this.field.data.maxAge || 120;
	            this.field.data.dateFormat = this.field.data.dateFormat || 'MM-DD-YYYY';
	        },

	        ready: function () {
	            UIkit.init(this.$$.dob);
	        },

	        computed: {
	            months: function () {
	                return [
	                    {value: '', text: this.$trans('Month')},
	                    {value: '0', text: this.$trans('January')},
	                    {value: '1', text: this.$trans('February')},
	                    {value: '2', text: this.$trans('March')},
	                    {value: '3', text: this.$trans('April')},
	                    {value: '4', text: this.$trans('May')},
	                    {value: '5', text: this.$trans('June')},
	                    {value: '6', text: this.$trans('July')},
	                    {value: '7', text: this.$trans('August')},
	                    {value: '8', text: this.$trans('September')},
	                    {value: '9', text: this.$trans('October')},
	                    {value: '10', text: this.$trans('November')},
	                    {value: '11', text: this.$trans('December')}
	                ];
	            },
	            years: function () {
	                var now = UIkit.Utils.moment();
	                return this.numbersList(now.year() - this.field.data.maxAge, now.year() - this.field.data.minAge, 'Year');
	            }
	        },

	        methods: {
	            setDate: function (strDate) {
	                try {
	                    this.dobDate = UIkit.Utils.moment(strDate);
	                    this.day = this.dobDate.date();
	                    this.month = this.dobDate.month();
	                    this.year = this.dobDate.year();

	                } catch (e) {}
	            },
	            updateDate: function () {
	                if (this.day && this.month && this.year) {
	                    this.dataObject.value = this.dobDate.format('YYYY-MM-DD');
	                } else {
	                    this.dataObject.value = '';
	                }
	            },
	            numbersList: function (start, end, first) {
	                var nrs = first ? [{value: "", text: this.$trans(first)}] : [];
	                for (var i = start; i <= end ; i++) nrs.push({value: i + "", text: i});
	                return nrs;
	            }
	        },
	        watch: {
	            day: function (value) {
	                if (value !== '') {
	                    this.dobDate.date(parseInt(value, 10));
	                }
	                this.updateDate();
	            },
	            month: function (value) {
	                if (value !== '') {
	                    this.dobDate.month(parseInt(value, 10));
	                }
	                this.updateDate();
	            },
	            year: function (value) {
	                if (value !== '') {
	                    this.dobDate.year(parseInt(value, 10));
	                 }
	                this.updateDate();
	            }
	        }

	    };

	    window.Formmakerfields.components['dob'] = module.exports;

/***/ },

/***/ 71:
/***/ function(module, exports) {

	module.exports = "<div v-if=\"isAdmin\" class=\"uk-form-row\">\n        <span for=\"form-date-format\" class=\"uk-form-label\">{{ 'Date format' | trans }}</span>\n\n        <div class=\"uk-form-controls\">\n            <select class=\"uk-form-width-medium\" id=\"form-date-format\"\n                    options=\"dateFormats\" v-model=\"field.data.dateFormat\"></select>\n        </div>\n    </div>\n\n    <div v-if=\"isAdmin\" class=\"uk-form-row\">\n        <span for=\"form-min-age\" class=\"uk-form-label\">{{ 'Minimum age' | trans }}</span>\n\n        <div class=\"uk-form-controls\">\n            <select class=\"uk-form-width-small\" id=\"form-min-age\"\n                    options=\"numbersList(1,120)\"  v-model=\"field.data.minAge\"></select>\n        </div>\n    </div>\n\n    <div v-if=\"isAdmin\" class=\"uk-form-row\">\n        <span for=\"form-max-age\" class=\"uk-form-label\">{{ 'Maximum age' | trans }}</span>\n\n        <div class=\"uk-form-controls\">\n            <select class=\"uk-form-width-small\" id=\"form-max-age\"\n                    options=\"numbersList(1,120)\"  v-model=\"field.data.maxAge\"></select>\n        </div>\n    </div>\n\n    <div v-if=\"!isAdmin\" v-el=\"dob\" class=\"uk-form-row {{field.data.classSfx || ''}}\">\n        <span class=\"uk-form-label\" v-show=\"!field.data.hide_label\">{{ fieldLabel | trans\n            }}</span>\n\n        <div class=\"uk-form-controls uk-flex\">\n            <div class=\"uk-grid uk-grid-small uk-grid-width-1-3 uk-width-1-1\">\n\n                <div>\n                    <div class=\"uk-button uk-width-1-1 uk-form-select\" data-uk-form-select><span></span>\n                        <i class=\"uk-icon-caret-down uk-margin-left\"></i>\n                        <select class=\"\" options=\"months\" v-model=\"month\"></select>\n                    </div>\n                </div>\n\n                <div v-class=\"uk-flex-order-first: field.data.dateFormat == 'DD-MM-YYYY'\">\n                    <div class=\"uk-button uk-width-1-1 uk-form-select\" data-uk-form-select><span></span>\n                        <i class=\"uk-icon-caret-down uk-margin-left\"></i>\n                        <select class=\"\" options=\"numbersList(1,31, 'Day')\" v-model=\"day\"></select>\n                    </div>\n                </div>\n\n                <div>\n                    <div class=\"uk-button uk-width-1-1 uk-form-select\" data-uk-form-select><span></span>\n                        <i class=\"uk-icon-caret-down uk-margin-left\"></i>\n                        <select class=\"\" options=\"years\" v-model=\"year\"></select>\n                    </div>\n                </div>\n\n            </div>\n        </div>\n    </div>";

/***/ }

/******/ });