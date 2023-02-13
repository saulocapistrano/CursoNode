const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/conn')

const User = require('./models/User')
const Adress = require('./models/Adress')

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

// Função de update
app.post('/users/update', async (req, res)=>{
    const id = req.body.id
    const name = req.body.name
    const occupation = req.body.occupation
    let newsletter = req.body.newsletter

    if(newsletter === 'on'){
        newsletter = true
    } else {
        newsletter = false
    }

    const userData = {
        id, 
        name, 
        occupation, 
        newsletter 
    }

    await User.update(userData, {where : {id:id}})

    res.redirect('/')

})



// Aqui a função onde se define uma rota
app.get('/', async (req, res)=>{

    const users = await User.findAll({raw: true})
    console.log(users)

    res.render('home', {users: users })
}) 

app.post('/adress/create', async (req, res) => {
    const UserId = req.body.UserId
    const street = req.body.street
    const number = req.body.number
    const city = req.body.city
//  Instanciando como um objeto
    const address = {
        UserId, 
        street, 
        number, 
        city,
    }

  await   Adress.create(address)
  res.redirect(`/users/edit/${UserId}`)
})


console.log('Conecxão ativa ao mysql')
conn
    .sync()
    //.sync({force: true}) // Dropa os dados da tabela, é usado para quando for necessário resetar tudo
    .then(()=>{
    app.listen(3000)
})
.catch((err)=> console.log(err))
