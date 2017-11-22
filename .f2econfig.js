const { argv } = process
const build = argv[argv.length - 1] === 'build'
const getModuleId = pathname => pathname.replace('src/', '')
const { onRoute } = require('./serve/index')
module.exports = {
    port: 5555,
    livereload: !build,
    build,
    gzip: true,
    middlewares: [
        {
            middleware: 'template',
            test: /index\.html|require/
        },
        {
            middleware: 'typescript'
        }
    ],
    onRoute,
    output: require('path').join(__dirname, '../f2e-output')
}
