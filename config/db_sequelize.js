const Sequelize = require('sequelize');
const sequelize = new Sequelize('Proj_Integrador', 'postgres', 'leandro1710', {
    host: 'localhost',
    dialect: 'postgres'
})

var db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Usuario = require('../models_postgres/usuario.js')(sequelize, Sequelize);
db.Diretor = require('../models_postgres/diretor.js')(sequelize, Sequelize);
db.cadastroCrianca = require('../models_postgres/cadastroCrianca')(sequelize , Sequelize);
db.creches = require ('../models_postgres/creches')(sequelize, Sequelize);
db.matriculas = require ('../models_postgres/matriculas') (sequelize, Sequelize );

module.exports = db;