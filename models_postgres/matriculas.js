module.exports = (sequelize, Sequelize) => {
    const Matriculas = sequelize.define('matriculas', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        Nome_Creche: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Nome_pai: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Nome_pai: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Bairro: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Rua: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Cidade: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Fone: {
            type: Sequelize.STRING,
            allowNull: false
        }
       
    });
    return Matriculas;
}