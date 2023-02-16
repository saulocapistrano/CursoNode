const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('nodemvc', 'root', '',{

    host: 'localhost',
    dialect: 'mysql',
})

try {
    sequelize.authenticate()
    console.log('Conectado com sucesso!')

} catch (error) {
   console.log(`Não foi possível conectar: ${error}`) 
}

module.exports = sequelize