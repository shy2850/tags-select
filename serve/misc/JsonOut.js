const zlib = require('zlib')
module.exports = (fn) => (req, resp) => {
    resp.writeHead(200, {
        'Content-Encoding': 'gzip',
        'Content-Type': 'application/json; charset=utf-8'
    })
    const res = fn(req, resp)
    if (res instanceof Promise) {
        res.then(data => {
            resp.end(zlib.gzipSync(JSON.stringify(data)))
        }).catch(e => {
            resp.end(zlib.gzipSync(e.toString()))
        })
    } else {
        resp.end(zlib.gzipSync(JSON.stringify(res)))
    }
    return false
}
