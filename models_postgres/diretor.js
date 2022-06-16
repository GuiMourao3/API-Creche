module.exports = (sequelize, Sequelize) => {
    const Diretor = sequelize.define('diretor', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        loginDiretor: {
            type: Sequelize.STRING,
            allowNull: false
        },
        senhaDiretor: {
            type: Sequelize.STRING,
            allowNull: false
        },
        nomeDiretor: {
            type: Sequelize.STRING,
            allowNull: false
        },
        cidadeDiretor: {
            type: Sequelize.STRING,
            allowNull: false
        },
        bairroDiretor: {
            type: Sequelize.STRING,
            allowNull: false
        },
        ruaDiretor: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return Diretor;
}