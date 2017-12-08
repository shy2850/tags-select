const { addItem } = require('../dao/source')
const preTags = require('./preTags')
const { join } = require('path')
const readline = require('readline')
const {
    createReadStream,
    writeFileSync,
    appendFileSync
} = require('fs')

const render = ({name, value, url}, t) => {
    let item = {
        name,
        value,
        url,
        tags: []
    }
    try {
        value = decodeURIComponent(value)
    } catch (e) {
        // TODO
    }
    setTimeout(function () {
        item.tags = preTags(name, value)
        addItem(item)
    }, 50 * t)
}

let t = 0
const saveLine = line => {
    
    if (
        line.match(/^[\u0000-\ufff0]+$/) &&
        /=.+/.test(line) &&
        !/\.(js|css|png|gif|jpe?g)\?(.{0,20})$/.test(line) &&
        true
    ) {
        line.replace(/(\?|&)(\w+)=([^?&]*)/g, (all, split, name, value) => {
            render({
                name,
                value,
                url: line
            }, t++)
        })
        return true
    }
}

readline.createInterface({
    input: createReadStream(join(__dirname, '../../data/urls.txt'))
}).on('line', saveLine)
