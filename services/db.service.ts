
var mysql = require('mysql')

var connection = mysql.createConnection({
    host: 'slotify-db.cu4bexvkovko.eu-central-1.rds.amazonaws.com',
    port: 3306,
    user: 'yoavroni',
    password: 'yoavroni',
    // database: 'slotify_db',
    database: 'test',
    insecureAuth: true
})



connection.connect((err: any) => {
    if (err) throw new Error('mysql failed to connect')
    console.log('connected to sql server');
})


function runSQL(sqlCommand: any) {
    return new Promise((resolve, reject) => {
        connection.query(sqlCommand,  function (error: unknown, results: any) {
            if (error) reject(error)
            else resolve(results)
        })
    })
}


module.exports = {
    runSQL
}
