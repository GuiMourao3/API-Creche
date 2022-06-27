module.exports = (sequelize, Sequelize) => {
    const VagasCreche = sequelize.define('vagasCreche', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        quantidadeVagas: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        nomeCreche: {
            type: Sequelize.STRING,
            allowNull: false
        },
        turno: {
            type: Sequelize.STRING,
            allowNull: false
        },
        turma: {
            type: Sequelize.STRING,
            allowNull: false
        },
    });
    return VagasCreche;
}