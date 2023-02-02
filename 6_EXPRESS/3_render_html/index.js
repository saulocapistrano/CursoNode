// Importando o express
const express = require('express')
// Invocação do express
const app = express()
// Definição da porta ( variável de ambiente)
const port = 3000 
// Criação da rota usando a variável app que nada mais é do que o express 
// Com o Método GET

const path = require("path")
// Neste onto em questão, nós estamos acessando o diretório onde fica a página html
const basePath = path.join(__dirname, 'templates')
app.get('/', (req, res) =>{
    res.sendFile(`${basePath}/index.html`)
})

app.listen(port, () =>{
    console.log(`App rodando na porta ${port}`)
})