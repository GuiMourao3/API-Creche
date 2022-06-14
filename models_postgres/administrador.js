module.exports = (sequelize, Sequelize) => {
    const Administrador = sequelize.define('administrador', {
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
        rg: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return Administrador;
}