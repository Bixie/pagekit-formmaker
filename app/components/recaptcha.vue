<template>
    <div class="uk-form-row">

        <span class="uk-form-label" v-show="formitem.data.recaptcha_label">{{ formitem.data.recaptcha_label | trans }}</span>

        <div class="uk-form-controls uk-form-controls-text">
            <div id="grecaptcha_el"></div>
        </div>

    </div>

</template>

<script>
    window.grecacapthaCallback = function () {
        window.Formmaker.$.grecaptcha.grecaptchaCallback(grecaptcha)
    };

    module.exports = {

        props: ['sitekey', 'formitem'],

        ready: function () {


            this.$on('submit', function (data) {
                data['g-recaptcha-response'] = grecaptcha.getResponse();
            });
        },

        methods: {
            grecaptchaCallback: function (grecaptcha) {
                grecaptcha.render('grecaptcha_el', {
                    'sitekey' : this.sitekey,
                    'theme' : this.formitem.data.recaptcha_theme || 'light',
                    'type' : this.formitem.data.recaptcha_type || 'image',
                    'size' : this.formitem.data.recaptcha_size || 'normal'
                });
            }

        }

    };

</script>
