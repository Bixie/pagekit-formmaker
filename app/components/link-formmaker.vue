<template>

    <div class="uk-form-row">
        <label for="form-link-formmaker" class="uk-form-label">{{ 'Form' | trans }}</label>
        <div class="uk-form-controls">
            <select id="form-link-formmaker" class="uk-width-1-1" v-model="formid">
                <option v-for="form in forms" :value="form.id">{{ form.title }}</option>
            </select>
        </div>
    </div>

</template>

<script>

const vm = {

    name: 'LinkFormmaker',

    link: {
        label: 'Formmaker',
    },

    props: {'link': String,},

    data: () => ({
        forms: [],
        formid: '',
    }),

    watch: {

        formid(formid) {
            this.link = '@formmaker/form/front?id=' + formid;
        },

    },

    created() {
        //TODO don't retrieve entire form objects
        this.$resource('api/formmaker/form').get().then(res => {
            this.forms = res.data;
            if (res.data.length) {
                this.formid = res.data[0].id;
            }
        });
    },

};

window.Links.components.formmaker = vm;

</script>
