const mysql = require('mysql')
const con = mysql.createConnection({
    host: '172.16.0.171',
    user: 'root',
    password: 'np360+noah',
    database: 'tags-select'
})
con.connect()
module.exports = con