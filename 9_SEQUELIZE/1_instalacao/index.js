const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/conn')

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

console.log('Conecxão ativa ao mysql')
app.listen(3000)
