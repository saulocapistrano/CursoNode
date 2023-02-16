const express = require('express')
const exphbs  = require('express-handlebars')

const app = express()

const conn = require('./db/conn.js')

app.engine('handlebars', exphbs.engine())
app.set('view engine',  'handlebars')

// Essa parte do código se chama midleware
app.use(
    express.urlencoded({
        extended:true
    })
)

// app.get('/', function (req, res) {

//     res.render('home', { layout: false })
    
//     })

app.use(express.json())
app.use(express.static('public'))
app.listen(3000)

