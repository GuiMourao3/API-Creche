module.exports = (sequelize, Sequelize) => {
    const Creches = sequelize.define('creches', {
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
    return Creches;
}