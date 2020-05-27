const {cleanDir} = require('./lib/fs');

function clean() {
    return Promise.all([
        cleanDir('build/*', {
            nosort: true,
            dot: true,
        }),
    ]);
}

module.exports = clean;
