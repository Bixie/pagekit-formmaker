
var glob = require("glob");
var path = require("path");
var fieldtypes = {};

glob.sync(path.join(__dirname, 'fieldtypes/*/*.vue')).forEach(function (file) {
    var type = path.basename(file, '.vue');
    fieldtypes['formmaker-' + type] = './fieldtypes/' + type + '/' + type + '.vue';
});

module.exports = [

    {
        entry: fieldtypes,
        output: {
            filename: "./app/bundle/[name].js"
        },
        module: {
            loaders: [
                { test: /\.vue$/, loader: "vue" }
            ]
        }
    },

    {
        entry: {
            /*pagekit addons*/
            "settings": "./app/components/settings.vue",
            "link-formmaker": "./app/components/link-formmaker.vue",
            "widget-formmaker": "./app/components/widget-formmaker.vue",
            "widget-siteform": "./app/components/widget-siteform.vue",
            /*frontpage views*/
            "formmaker": "./app/views/form.js",
            /*admin views*/
            "form-edit": "./app/views/admin/edit.js",
            "form-submissions": "./app/views/admin/submissions.js",
            "forms": "./app/views/admin/forms.js"
        },
        output: {
            filename: "./app/bundle/[name].js"
        },
        externals: {
            "lodash": "_",
            "jquery": "jQuery",
            "uikit": "UIkit",
            "vue": "Vue"
        },
        module: {
            loaders: [
                {test: /\.vue$/, loader: "vue"},
                {test: /\.html$/, loader: "vue-html"}
            ]
        }

    }

];
