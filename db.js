const {Sequelize} = require('sequelize');

const seqeulize = new Sequelize(process.env.DATABASE_URL, {
    // host: process.env.DATABASE_HOST,
    dialect: 'postgres'
})

module.exports = seqeulize;