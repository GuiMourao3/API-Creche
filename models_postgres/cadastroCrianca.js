
module.exports = (sequelize, Sequelize) => {
    const CadastroCrianca = sequelize.define('cadastrocrianca', {
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
        Rg: {
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
        }
    });
    return CadastroCrianca;
}