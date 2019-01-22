const mysql = require('mysql');

const config = {
    mysql_pool : mysql.createPool({
        host     : process.env.RDS_HOSTNAME || 'trippydatabase.cnioslqsy5gc.us-west-2.rds.amazonaws.com',
        user     : process.env.RDS_USERNAME || 'escott07',
        password : process.env.RDS_PASSWORD || 'password12yu',
        port     : process.env.RDS_PORT || '3306',
        database : process.env.RDS_DATABASE || 'trippydatabase'
    })
};

module.exports = config;