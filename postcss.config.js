const autoprefixer = require('autoprefixer');
const postCssFilters = require('pleeease-filters');
const postCssPixrem = require('pixrem');

module.exports = {
    plugins() {
        return [
            postCssPixrem(),
            postCssFilters(),
            autoprefixer
        ];
    }
};
