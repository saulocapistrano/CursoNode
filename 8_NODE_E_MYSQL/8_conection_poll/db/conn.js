const mysql = require('mysql')
const pool = mysql.createPool({
    // Mostra o objeto com os dados do acesso ao banco 
   connectionLimit:10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql2',
})

module.exports = pool