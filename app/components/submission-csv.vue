<template>

    <div>
        <div class="uk-modal-header">
            <h2>{{ 'Export submissions as CSV file' | trans }}</h2>
        </div>

        <div class="uk-margin uk-form uk-form-stacked">
            <div class="uk-modal-spinner" v-if="!loaded"></div>
            <div v-show="loaded">

                <div class="uk-grid">
                    <div class="uk-width-medium-1-2">
                        <select class="uk-width-1-1" v-model="options.form_id" number>
                            <option value="">{{ 'Select form' | trans }}</option>
                            <option v-for="form in forms" :value="form.id">{{ form.title }}</option>
                        </select>

                    </div>
                    <div class="uk-width-medium-1-2">
                        <div class="uk-form-controls uk-form-controls-text uk-flex uk-margin-small-top">
                            <div class="uk-width-1-3">
                                <label><input type="checkbox" :value="0" v-model="options.status" number>
                                    {{ 'Archived' | trans
                                    }}</label>
                            </div>
                            <div class="uk-width-1-3">
                                <label><input type="checkbox" :value="1" v-model="options.status" number>
                                    {{ 'Active' | trans
                                    }}</label>
                            </div>
                            <div class="uk-width-1-3">
                                <label><input type="checkbox" :value="2" v-model="options.status" number>
                                    {{ 'Done' | trans
                                    }}</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="uk-grid" v-if="formLoaded">
                    <div class="uk-width-medium-2-3">

                        <div class="uk-grid">
                            <div class="uk-width-medium-1-2">

                                <div class="uk-form-row">
                                    <span class="uk-form-label">{{ 'Data to export' | trans }}</span>

                                    <div class="uk-form-controls uk-form-controls-text">
                                        <p class="uk-form-controls-condensed">
                                            <label><input type="checkbox" value="id" v-model="options.datafields"> {{
                                                'Id' | trans
                                                }}</label>
                                        </p>

                                        <p class="uk-form-controls-condensed">
                                            <label><input type="checkbox" value="status" v-model="options.datafields">
                                                {{ 'Status' | trans
                                                }}</label>
                                        </p>

                                        <p class="uk-form-controls-condensed">
                                            <label><input type="checkbox" value="email" v-model="options.datafields"> {{
                                                'Email' | trans
                                                }}</label>
                                        </p>

                                        <p class="uk-form-controls-condensed">
                                            <label><input type="checkbox" value="ip" v-model="options.datafields"> {{
                                                'IP address' | trans
                                                }}</label>
                                        </p>

                                        <p class="uk-form-controls-condensed">
                                            <label><input type="checkbox" value="created" v-model="options.datafields">
                                                {{ 'Created' | trans
                                                }}</label>
                                        </p>
                                    </div>
                                </div>

                            </div>
                            <div class="uk-width-medium-1-2">

                                <div class="uk-form-row">
                                    <span class="uk-form-label">{{ 'Fields to export' | trans }}</span>

                                    <div class="uk-form-controls uk-form-controls-text">
                                        <p v-for="field in formitem.fields" class="uk-form-controls-condensed">
                                            <label><input type="checkbox" value="{{ field.id }}"
                                                          v-model="options.field_ids" number> {{ field.label | trans
                                                }}</label>
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                    <div class="uk-width-medium-1-3">
                        <div class="uk-panel uk-panel-box">

                            <div class="uk-form-row">
                                <label for="form-filename" class="uk-form-label">{{ 'Filename' | trans }}</label>

                                <div class="uk-form-controls">
                                    <input id="form-filename" class="uk-width-1-1" type="text"
                                           v-model="options.filename">
                                </div>
                            </div>


                            <div class="uk-form-row">
                                <span class="uk-form-label">{{ 'Archive' | trans }}</span>

                                <div class="uk-form-controls uk-form-controls-text">
                                    <label><input type="checkbox" value="archived" v-model="options.mark_archived"> {{
                                        'Mark exported as "Archived"' | trans
                                        }}</label>
                                </div>
                            </div>

                            <div class="uk-badge uk-badge-success uk-margin">
                                {{ count }} {{ '{0} submissions to be exported|{1} submission to be exported|]1,Inf[
                                submissions to be exported' | transChoice count}}
                            </div>

                        </div>
                    </div>
                </div>

            </div>

        </div>

        <div class="uk-modal-footer uk-text-right">
            <button type="button" class="uk-button uk-modal-close">{{ 'Close' | trans }}</button>
            <button type="button" class="uk-button uk-button-primary"
                    v-show="!csvLink" @click="doExport" v-el:export
                    :disabled="!formLoaded">
                <i v-show="exporting" class="uk-icon-spinner uk-icon-spin"></i>
                <span v-else>{{ 'Export' | trans }}</span>
            </button>
            <a :href="csvLink" class="uk-button uk-button-success" download="{{ options.filename }}"
               v-show="csvLink" v-el:exportlink><i class="uk-icon-download uk-margin-small-right"></i>{{ 'Download' |
                trans }}</a>
        </div>
    </div>


</template>

<script>

    module.exports = {

        props: ['forms'],

        data: function () {
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

        created: function () {
            this.load();
        },

        beforeDestroy: function () {
            this.$dispatch('close.csvmodal');
        },

        computed: {
            formLoaded: function () {
                return this.options.form_id && this.options.form_id == this.formitem.id;
            }
        },

        methods: {
            load: function () {
                this.$root.resource.query({id: 'csv', options: this.options}).then(function (res) {
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
                this.$root.resource.export({options: this.options}).then(function (res) {
                    if (res.data.csv) {
                        var $url = window.URL || window.webkitURL;
                        this.csvLink = $url.createObjectURL(new Blob([res.data.csv], {type: "application/force-download"}));
                        this.exporting = false;
                    }
                }.bind(this));
            }
        },

        watch: {
            'options': {handler: function (value) {
                this.csvLink = '';
            }, deep: true},

            'options.form_id,options.status': function (value) {
                this.load();
            }
        }


    };

</script>
