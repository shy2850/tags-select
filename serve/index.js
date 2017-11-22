const JsonOut = require('./misc/JsonOut')
const Route = require('./Route')
const route = new Route()

route.on('source', JsonOut(require('./action/source')))
route.on(/^[\w\/]*$/, (req, resp) => 'index.html')

exports.onRoute = (pathname, req, resp, memory) => {
    try {
        return route.execute(pathname, req, resp, memory)
    } catch (error) {
        JsonOut(() => ({error: error.toString()}))(req, resp)
        return false
    }
}
