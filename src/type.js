define([
    'exports'
], function(exports) {
    'use strict';
    let tags = []
    let list = $include['../serve/fieldType.json']
    let map = list.reduce((m, {children}) =>  {
        children.map(({name, value}) => {
            tags.push(value)
            m[value] = name
        })
        return m
    }, {})

    exports.list = list
    exports.tags = tags
    exports.map = k => map[k]
});