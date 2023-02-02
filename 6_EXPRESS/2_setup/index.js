// Importando o express
const express = require('express')
// Invocação do express
const app = express()
// Definição da porta ( variável de ambiente)
const port = 3000 
// Criação da rota usando a variável app que nada mais é do que o express 
// Com o Método GET
app.get('/', (req, res) =>{
    res.send('Hello World - : ) aplicação com NODE JS')
})
// Com o Método POST 
app.post('/', (req, res) =>{
    res.send('POST request to homepage')
    next()
})

app.listen(port, () =>{
    console.log(`App rodando na porta ${port}`)
})