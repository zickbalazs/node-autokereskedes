require('dotenv').config();

let conn = {
    host:process.env.DBHOST,
    user:process.env.DBUSER,
    password:process.env.DBPASS,
    database:process.env.DBNAME
}
module.exports = conn;