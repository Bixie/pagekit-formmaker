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