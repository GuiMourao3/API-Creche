module.exports = (sequelize, Sequelize) => {
    const Creches = sequelize.define('creches', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        nome_Creche: {
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
        },
        cidade: {
            type: Sequelize.STRING,
            allowNull: false
        },
        fone: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return Creches;
}