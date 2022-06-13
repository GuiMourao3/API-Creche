module.exports = (sequelize, Sequelize) => {
    const VagasCreche = sequelize.define('vagasCreche', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        nomeCreche: {
            type: Sequelize.STRING,
            allowNull: true
        },
        diretorCreche: {
            type: Sequelize.STRING,
            allowNull: true
        },
        enderecoCreche: {
            type: Sequelize.STRING,
            allowNull: true
        },
        contatoCreche: {
            type: Sequelize.STRING,
            allowNull: true
        },
        cepCreche: {
            type: Sequelize.STRING,
            allowNull: true
        }
    });
    return VagasCreche;
}