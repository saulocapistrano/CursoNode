const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql')

const app = express()

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

// Aqui a função onde se define uma rota
app.get('/', (req, res)=>{
    res.render('home')
})

// Iserindo dados no banco 
app.post('/books/insertbook', (req,res)=>{
    const title = req.body.title
    const pageqty = req.body.pageqty

    const sql = `INSERT INTO books(title, pageqty) VALUES('${title}', '${pageqty}')`

    conn.query(sql, function(err){
        if(err){
            console.log(err)
        }
        res.redirect('/')
    })    
})

// Consultando dados 

app.get('/books', (req, res)=>{
    const sql = 'SELECT * FROM BOOKS'

    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }
        const books = data
        console.log(books)
       res.render('books', {books})
    })
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
