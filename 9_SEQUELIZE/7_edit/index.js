const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/conn')

const User = require('./models/User')

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

app.get('/users/create', (req, res)=>{
    res.render('adduser')
})

// Create do banco!
app.post('/users/create', async (req, res)=>{
   // Colocamos em cada constane o que é requerido no formulário para persistir no banco 
   const name = req.body.name
   const occupation = req.body.occupation
   let newsletter = req.body.newsletter

   if(newsletter === 'on'){
    newsletter = true
   } else{
    newsletter = false
   }
   console.log(req.body)

   // Cria o usuário com os campos no banco 
  await User.create({name, occupation, newsletter})

   res.redirect('/')

})

app.get('/users/:id', async(req, res) => {
   const id = req.params.id 

   const user = await User.findOne({raw: true, where: {id: id}})

   res.render('userview', {user})
})

// Função de delete do banco
app.post('/users/delete/:id', async (req, res)=>{
    const id = req.params.id
    await User.destroy({where: {id :id}})
    res.redirect('/')
})

// Função de edição 
app.get('/users/edit/:id', async (req, res)=>{
    const id = req.params.id
    const user =  await User.findOne({raw: true, where: {id :id}})
    res.render('useredit', {user})
})

// Aqui a função onde se define uma rota
app.get('/', async (req, res)=>{

    const users = await User.findAll({raw: true})
    console.log(users)

    res.render('home', {users: users })
}) 

console.log('Conecxão ativa ao mysql')
conn.sync().then(()=>{
    app.listen(3000)
})
.catch((err)=> console.log(err))
