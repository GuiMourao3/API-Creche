module.exports = (sequelize, Sequelize) => {
    const Diretor = sequelize.define('diretor', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        login: {
            type: Sequelize.STRING,
            allowNull: false
        },
        senha: {
            type: Sequelize.STRING,
            allowNull: false
        },
        nome: {
            type: Sequelize.STRING,
            allowNull: false
        },
        cidade: {
            type: Sequelize.STRING,
            allowNull: false
        },
        bairro: {
            type: Sequelize.STRING,
            allowNull: false
        },
        rua: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return Diretor;
}