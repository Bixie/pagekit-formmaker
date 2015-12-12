<template>

    <div v-if="!isAdmin" v-el:dob class="uk-form-row {{field.data.classSfx}}">

        <span class="uk-form-label" v-show="!field.data.hide_label">{{ fieldLabel | trans }}</span>

        <div class="uk-form-controls uk-flex">
            <div class="uk-grid uk-grid-small uk-grid-width-1-3 uk-width-1-1">

                <div>
                    <div class="uk-button uk-width-1-1 uk-form-select" data-uk-form-select><span></span>
                        <i class="uk-icon-caret-down uk-margin-left"></i>
                        <select class="" v-model="month">
                            <option v-for="option in months" :value="option.value">{{ option.text }}</option>
                        </select>
                    </div>
                </div>

                <div :class="{'uk-flex-order-first': field.data.dateFormat == 'DD-MM-YYYY'}">
                    <div class="uk-button uk-width-1-1 uk-form-select" data-uk-form-select><span></span>
                        <i class="uk-icon-caret-down uk-margin-left"></i>
                        <select class="" v-model="day">
                            <option v-for="option in days" :value="option">{{ $key }}</option>
                        </select>
                    </div>
                </div>

                <div>
                    <div class="uk-button uk-width-1-1 uk-form-select" data-uk-form-select><span></span>
                        <i class="uk-icon-caret-down uk-margin-left"></i>
                        <select class="" v-model="year">
                            <option v-for="option in years" :value="option">{{ $key }}</option>
                        </select>
                    </div>
                </div>

            </div>
        </div>
    </div>

</template>

<script>

    var numbersList = function (start, end, first) {
        var nrs = {};
        if (first) nrs[first] = '';
        for (var i = start; i <= end ; i++) nrs[String(i)] = i;
        return nrs;
    };

    module.exports = {

        mixins: [FormmakerfieldMixin],

        settings: {
            'minAge': {
                type: 'select',
                label: 'Minimum age',
                options: numbersList(1,120),
                attrs: {'class': 'uk-form-width-medium'}
            },
            'maxAge': {
                type: 'select',
                label: 'Maximum age',
                options: numbersList(1,120),
                attrs: {'class': 'uk-form-width-medium'}
            }
        },

        appearance: {
            'dateFormat': {
                type: 'select',
                label: 'Date format',
                options: {
                    'MM-DD-YYYY': 'MM-DD-YYYY',
                    'DD-MM-YYYY': 'DD-MM-YYYY'
                },
                attrs: {'class': 'uk-form-width-medium'}
            }
        },

        data: function () {
            return {
                dataObject: {},
                fieldid: _.uniqueId('profilefield_'),
                dobDate: false,
                day: '',
                month: '',
                year: ''
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
            UIkit.init(this.$els.dob);
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
            days: function () {
                return numbersList(1,31, this.$trans('Day'));
            },
            years: function () {
                var now = UIkit.Utils.moment();
                return numbersList(now.year() - this.field.data.maxAge, now.year() - this.field.data.minAge, this.$trans('Year'));
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
