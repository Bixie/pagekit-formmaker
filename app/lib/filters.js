module.exports = function (Vue) {

    Vue.filter('datetime', function (date) {
        if (typeof date === 'string') {
            date = new Date(date);
        }
        var momentDate = UIkit.Utils.moment(date);
        return date ? this.$date(date, 'full') + ', ' +  momentDate.format('HH:mm:ss') : '';
        //todo datetime grr
        //return Globalize.formatDate(date, {datetime: 'long'});
        //return Globalize.formatDate(date, {skeleton: 'yMdhm'});
    });

    Vue.filter('shortcode', function (slug, key) {
        return '$$ ' + slug + ':' + key + ' $$';
    });

};