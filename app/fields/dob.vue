<template>

    <div v-if="isAdmin" class="uk-form-row {{field.data.classSfx}}">
        <span for="form-date-format" class="uk-form-label">{{ 'Date format' | trans }}</span>

        <div class="uk-form-controls">
            <select class="uk-form-width-medium" id="form-date-format"
                    options="dateFormats" v-model="field.data.dateFormat"></select>
        </div>
    </div>

    <div v-if="isAdmin" class="uk-form-row {{field.data.classSfx}}">
        <span for="form-min-age" class="uk-form-label">{{ 'Minimum age' | trans }}</span>

        <div class="uk-form-controls">
            <select class="uk-form-width-small" id="form-min-age"
                    options="numbersList(1,120)"  v-model="field.data.minAge"></select>
        </div>
    </div>

    <div v-if="isAdmin" class="uk-form-row {{field.data.classSfx}}">
        <span for="form-max-age" class="uk-form-label">{{ 'Maximum age' | trans }}</span>

        <div class="uk-form-controls">
            <select class="uk-form-width-small" id="form-max-age"
                    options="numbersList(1,120)"  v-model="field.data.maxAge"></select>
        </div>
    </div>

    <div v-if="!isAdmin" v-el="dob" class="uk-form-row {{field.data.classSfx}}">
        <span class="uk-form-label" v-show="!field.data.hide_label">{{ fieldLabel | trans
            }}</span>

        <div class="uk-form-controls uk-flex">
            <div class="uk-grid uk-grid-small uk-grid-width-1-3 uk-width-1-1">

                <div>
                    <div class="uk-button uk-width-1-1 uk-form-select" data-uk-form-select><span></span>
                        <i class="uk-icon-caret-down uk-margin-left"></i>
                        <select class="" options="months" v-model="month"></select>
                    </div>
                </div>

                <div v-class="uk-flex-order-first: field.data.dateFormat == 'DD-MM-YYYY'">
                    <div class="uk-button uk-width-1-1 uk-form-select" data-uk-form-select><span></span>
                        <i class="uk-icon-caret-down uk-margin-left"></i>
                        <select class="" options="numbersList(1,31, 'Day')" v-model="day"></select>
                    </div>
                </div>

                <div>
                    <div class="uk-button uk-width-1-1 uk-form-select" data-uk-form-select><span></span>
                        <i class="uk-icon-caret-down uk-margin-left"></i>
                        <select class="" options="years" v-model="year"></select>
                    </div>
                </div>

            </div>
        </div>
    </div>

</template>

<script>
    var formmakerfieldMixin = require('../mixins/formmakerfield.js');

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

</script>
