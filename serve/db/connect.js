const mysql = require('mysql')
const con = mysql.createConnection({
    host: 'localhost',
    // host: '172.16.0.171',
    user: 'root',
    password: '123456',
    // password: 'np360+noah',
    database: 'tags-select'
})
con.connect()
module.exports = con