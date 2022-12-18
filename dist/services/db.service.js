"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require('mysql');
// var connection = mysql.createConnection({
//     host: 'sql8.freesqldatabase.com',
//     port: 3306,
//     user: 'sql8582751',
//     password: '2G1a2nz3Kh',
//     database: 'sql8582751',
//     insecureAuth: true
// })
// connection.connect((err: any) => {
//     if (err) throw new Error('mysql failed to connect')
//     console.log('connected to sql server');
// })
// function runSQL(sqlCommand: any) {
//     return new Promise((resolve, reject) => {
//         connection.query(sqlCommand,  function (error: unknown, results: any) {
//             if (error) reject(error)
//             else resolve(results)
//         })
//     })
// }
// module.exports = {
//     runSQL
// }
var pool = mysql.createPool({
    host: 'sql8.freesqldatabase.com',
    port: 3306,
    user: 'sql8582751',
    password: '2G1a2nz3Kh',
    database: 'sql8582751',
    insecureAuth: true
});
pool.on('connection', function (connection) {
    console.log('DB Connection established');
    connection.on('error', function (err) {
        console.error(new Date(), 'MySQL error', err.code);
    });
    connection.on('close', function (err) {
        console.error(new Date(), 'MySQL close', err);
    });
});
function runSQL(sqlCommand) {
    return new Promise((resolve, reject) => {
        pool.query(sqlCommand, function (error, results) {
            if (error)
                reject(error);
            else
                resolve(results);
        });
    });
}
module.exports = {
    runSQL
};
//# sourceMappingURL=db.service.js.map