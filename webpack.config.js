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
            "site": "./app/components/site.vue",
            "link": "./app/components/link.vue",
            /*fields*/
            "formmaker-checkbox": "./app/fields/checkbox.vue",
            "formmaker-dob": "./app/fields/dob.vue",
            "formmaker-pulldown": "./app/fields/pulldown.vue",
            "formmaker-radio": "./app/fields/radio.vue",
            "formmaker-text": "./app/fields/text.vue",
            /*frontpage views*/
            "formmaker": "./app/views/profile.js",
            "registration": "./app/views/registration.js",
            /*admin views*/
            "form-edit": "./app/views/admin/edit.js",
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
