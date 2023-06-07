"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'db4free.net',
    port: 3306,
    user: 'yoavs1',
    password: 'slotify1234',
    database: 'slotify_db',
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