const { argv } = process
const build = argv[argv.length - 1] === 'build'
const { onRoute } = require('./serve/index')
module.exports = {
    livereload: !build,
    build,
    gzip: true,
    // app: 'static',
    middlewares: [
        {
            middleware: 'template'
        },
        {
            middleware: 'typescript'
        }
    ],
    onRoute,
    output: require('path').join(__dirname, '../f2e-output')
}
