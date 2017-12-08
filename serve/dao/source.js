
const conn = require ('../db/connect')
const { escape } = require('mysql')
const SQL = {
    count: () => `select count(1) from data`,
    addItem: ({name, value, url, tags = []}) => `INSERT INTO data VALUES (0, ${escape(name)}, ${escape(value)}, ${escape(url)}, '${tags.join(',')}', null)`,
    query: ({pageSize = 20, pageNo = 1}) => `select * from data limit ${pageSize * (pageNo - 1) || 0},${pageSize | 0}`,
    updateTag: (id, tag = '') => {
		tag = tag ? `"${tag.toString().substring(0, 32).replace(/\W/g, '')}"` : null
		return `update data set tag=${tag} where id=${id | 0}`
	}
}
const SQLPromise = sql => new Promise((resolve, reject) => conn.query(sql, (error, rs) => {
    if (error) {
        reject(error)
    } else {
        resolve(rs)
    }
})).catch(err => console.error(err))

const count = () => SQLPromise(SQL.count()).then(rs => rs[0]['count(1)'])
const addItem = (item) => SQLPromise(SQL.addItem(item))
const getSource = (page = {}) => SQLPromise(SQL.query(page))
const updateTag = (id, tag) => SQLPromise(SQL.updateTag(id, tag))

exports.count = count
exports.addItem = addItem
exports.getSource = getSource
exports.updateTag = updateTag

// test
// exports.updateTag(1)
// exports.count().then(rs => console.log(rs))
// Promise.all([count(), getSource()]).then(data => console.log(JSON.stringify(data, null, 2)))