
var mysql = require('mysql')

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'yoavroni',
    password: 'yoavroni',
    database: 'slotify_db',
    insecureAuth: true
})

connection.connect((err: any) => {
    if (err) throw new Error('mysql failed to connect')
    console.log('connected to sql server');
})


function runSQL(sqlCommand: any) {
    return new Promise((reject, resolve) => {
        connection.query(sqlCommand, function (error: unknown, results: any, fields: any) {
            if (error) reject(error)
            else resolve(results)
        })
    })
}


module.exports = {
    runSQL
}