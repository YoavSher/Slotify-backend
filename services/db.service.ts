
var mysql = require('mysql')

var connection = mysql.createConnection({
    // host: 'slotify-db.cu4bexvkovko.eu-central-1.rds.amazonaws.com',
    host: 'sql8.freesqldatabase.com',
    port: 3306,
    // user: 'yoavroni',
    user: 'sql8582751',
    // password: 'yoavroni',
    password: '2G1a2nz3Kh',
    // database: 'slotify_db',
    database: 'sql8582751',
    // database: 'test',
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
