const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const User = require('./User')

const Address = db.define('Adress', {
     
    street:{
        type: DataTypes.STRING,
        require: true,
    },
    number:{
        type: DataTypes.STRING,
        require: true,
    },
    city:{
        type: DataTypes.STRING,
        require: true,
    },
})
User.hasMany(Address)
// Criando a relação de um endereço para um usuário 
Address.belongsTo(User)
module.exports = Address
