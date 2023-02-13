const {Sequelize } = require('sequelize')
const sequelize = new Sequelize('nodesequelize', 'root', '', {
   host: 'localhost',
   dialect: 'mysql'
})
try {
    sequelize.authenticate()
    console.log('Conectado ao banco com sucesso!')
} catch (error) {
    console.log('Não foi possível conectar: ', error)
}

// Agora é preciso disponibilizar através do export
module.exports = sequelize