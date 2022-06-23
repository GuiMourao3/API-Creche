const CadastroCrianca = require("./cadastroCrianca");


module.exports = (sequelize, Sequelize) => {
    const Matriculas = sequelize.define('matriculas', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        nome: {
            type: Sequelize.STRING,
            allowNull: false
        },
        nome_pai: {
            type: Sequelize.STRING,
            allowNull: false
        },
        rg: {
            type: Sequelize.STRING,
            allowNull: false
        },
        bairro: {
            type: Sequelize.STRING,
            allowNull: false
        },
        endereco: {
            type: Sequelize.STRING,
            allowNull: false
        }, 
        fone: {
            type: Sequelize.STRING,
            allowNull: false
        },
        comprovante_res:{
            type: Sequelize.STRING,
            allowNull: true
            
        },
        status:{
            type: Sequelize.STRING,
            defaultValue: 'Em analise',
            allowNull: true
            
        },
        createdAt:{
            type: Sequelize.DATEONLY,
            allowNull: true
        },
        Id_Crianca: {
            type: Sequelize.INTEGER,
            reference: {model: 'CadastroCrianca', key: 'id'}
        }
       
    },
   

    );

    return Matriculas;
}