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

// Consultando dados com sql

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


// Buscando livro pelo id

app.get(`/books/:id`, (req,res) =>{
    
    const id = req.params.id
    const sql = `SELECT * FROM books WHERE  id = '${id}'`

    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }
        
        const book= data[0]
        //console.log(book)
        res.render(`book`, {book})
    })
})

// Editando livros

app.get('/books/edit/:id', (req, res)=>{
    const id = req.params.id
    const sql = `SELECT * FROM books WHERE id = '${id}'`
    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }
        const book= data[0]
        //console.log(book)
        res.render(`editbook`, {book})
    })
})

// Criando o update

app.post('/books/updatebook', (req,res)=>{
    const id = req.body.id
    const title = req.body.title
    const pageqty = req.body.pageqty

    const sql = `UPDATE books SET title = '${title}', pageqty = '${pageqty}' WHERE id = '${id}' `

    conn.query(function (err, data){
        if(err){
            console.log(err)
            return
        } 
    })
    res.redirect('/books')
})

// Removendo livros
app.post('/books/remove/:id', (req, res)=>{
    
    const id = req.params.id
    const sql = `DELETE FROM books WHERE id ='${id}'`

    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        } 
        res.redirect('/books')
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