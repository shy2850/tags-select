const dao = require('../dao/source')
module.exports = (req, resp) => {
    const {
        data,
        method = 'get'
    } = req
    
    switch (method.toUpperCase()) {
        case 'GET':
            return Promise.all([dao.count(), dao.getSource(data)]).then(arr => ({total: arr[0], data:arr[1]}))
        case 'PUT':
            return dao.updateTag(data.id, data.tag)
        default:
            return {error: 'no supported method!'}
    }

}