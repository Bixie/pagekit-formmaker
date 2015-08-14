module.exports = [

    {
        entry: {
            "formmaker-formmakerfields": "./app/components/formmakerfields.vue"
        },
        output: {
            filename: "./app/bundle/[name].js",
            library: "Formmakerfields"
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
            "node-formmaker": "./app/components/node-formmaker.vue",
            "link-formmaker": "./app/components/link-formmaker.vue",
            "widget-formmaker": "./app/components/widget-formmaker.vue",
            /*fields*/
            "formmaker-checkbox": "./app/fields/checkbox.vue",
            "formmaker-dob": "./app/fields/dob.vue",
            "formmaker-email": "./app/fields/email.vue",
            "formmaker-htmlcode": "./app/fields/htmlcode.vue",
            "formmaker-pulldown": "./app/fields/pulldown.vue",
            "formmaker-radio": "./app/fields/radio.vue",
            "formmaker-text": "./app/fields/text.vue",
            "formmaker-textbox": "./app/fields/textbox.vue",
            /*frontpage views*/
            "formmaker": "./app/views/form.js",
            /*admin views*/
            "form-edit": "./app/views/admin/edit.js",
            "form-submissions": "./app/views/admin/submissions.js",
            "forms": "./app/views/admin/forms.js"
        },
        output: {
            filename: "./app/bundle/[name].js",
            library: "Forms"
        },
        externals: {
            "lodash": "_",
            "jquery": "jQuery",
            "uikit": "UIkit",
            "vue": "Vue"
        },
        module: {
            loaders: [
                {test: /\.vue$/, loader: "vue"}
            ]
        }
    }

];
