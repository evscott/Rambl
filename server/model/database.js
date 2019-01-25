require('dotenv').config()
const mysql = require('mysql');
let pool;

module.exports = {
    getPool: function () {
        if (pool) return pool;
        console.log('Creating pool...');
        pool = mysql.createPool({
            host     : process.env.RDS_HOSTNAME,
            user     : process.env.RDS_USERNAME,
            password : process.env.RDS_PASSWORD,
            port     : process.env.RDS_PORT,
            database : process.env.RDS_DATABASE
        });
        return pool;
    }
};