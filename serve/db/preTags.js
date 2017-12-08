const list = require('../fieldType.json')
const map = list.reduce((m, {children}) =>  {
    children.map(({name, value, keys = []}) => {
        m[value] = value
        keys.map(key => {
            m[key] = value
        })
    })
    return m
}, {})

module.exports = (name, value) => {
    let tags = []
    if (/^15(\d{8}|\d{11})\.?(\d+)?$/.test(value) || /^2017-?\d/.test(value)) {
        tags.push('timestamp')
    } else if (/^http:\/\//.test(value)) {
        tags.push('url')
    } else if (/wifi\b/i.test(value)) {
        tags.push('access_net')
    } else if (/^\d+(\.\d{1,3}){3}$/.test(value)) {
        tags.push(/^(10|172|192)\./.test(value) ? 'ip_int' : 'ip_ext')
    }

    const list = Object.keys(map)
    for (let i = 0; i < list.length; i++) {
        const t = list[i]
        const tag = map[t]
        if (t === name) {
            tags.push(tag)
        } else if (!t.indexOf(name + '_') || name.length > 1 && !t.indexOf(name)) {
            tags.push(tag)
        } else if (name.length > 2 && t.indexOf(name) !== -1) {
            tags.push(tag)
        } else if (t.length > 2 && name.indexOf(t) !== -1) {
            tags.push(tag)
        }
    }
    tags.push('unknown')
    let uniq = {}
    return tags.filter(t => {
        if (uniq[t]) {
            return false
        }
        uniq[t] = 1
        return true
    }).slice(0, 3)
}
