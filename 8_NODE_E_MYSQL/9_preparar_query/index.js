const express = require('express')
const exphbs = require('express-handlebars')
const poll = require('./db/conn')

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

    const sql = `INSERT INTO books (??, ??) VALUES (?, ?)`
    const data = ['title', 'pageqty', title, pageqty]

    poll.query(sql, data, function(err){
        if(err){
            console.log(err)
        }
        res.redirect('/')
    })    
})

// Consultando dados com sql

app.get('/books', (req, res)=>{
    const sql = 'SELECT * FROM BOOKS'

    poll.query(sql, function(err, data){
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
    const sql = `SELECT * FROM books WHERE  ?? = ?`
    const data = ['id', id]

    poll.query(sql, data, function(err, data){
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
    const sql = `SELECT * FROM books WHERE  ?? = ?`
    const data = ['id', id]
    poll.query(sql, function(err, data){
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

    const sql = `UPDATE books SET ?? = ?, ?? = ? WHERE ?? = ? `
    const data = ['title', title, 'pageqty', pageqty, 'id', id]

    poll.query(sql, data, function (err, data){
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
    const sql = `DELETE FROM books WHERE ?? = ?`
    const data = ['id', id]

    poll.query(sql, data, function(err, data){
        if(err){
            console.log(err)
            return
        } 
        res.redirect('/books')
    })

})

console.log('Conecxão ativa ao mysql')
app.listen(3000)