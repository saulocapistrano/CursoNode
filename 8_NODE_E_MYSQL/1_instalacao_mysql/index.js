const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql')

const app = express()

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

// Aqui a função onde se define uma rota
app.get('/', (req, res)=>{
    res.render('home')
})

// Criando a conexão 
const conn = mysql.createConnection({
    // Mostra o objeto com os dados do acesso ao banco 
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql2',
})

// Executando a função de conexão
 conn.connect(function(err){
    if(err){
        console.log(err)
    }
    console.log('Conecxão ativa ao mysql')
    app.listen(3000)
})
