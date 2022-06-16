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
        }
       
    });
    return Matriculas;
}