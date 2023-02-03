const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine','handlebars')

app.get('/dashboard', (req,res)=>{

   const itens = ['Item a', 'Item b', 'Item c', 'Item d' ]


    res.render('dashboard',{itens})
})

app.get('post', (req,res)=>{
const post = {
    title: 'Aprendendo Node.js',
    category: 'JavaScript',
    body: 'Este artigo ensina javascript',
    comments: 4,

}
res.render('blogpost', {post})
})

app.get('/', (req, res)=>{

    const user = {
        name: 'Saulo',
        surname: 'Capistrano',
        age: 30  
    } 

    const palavra = 'Teste'

    const auth = false

    const approved = false



    res.render('home', {user: user, palavra, auth, approved})
})

app.listen(3000, ()=>{
    console.log("App funcionando na porta 3000")
})