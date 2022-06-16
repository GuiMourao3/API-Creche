const Sequelize = require('sequelize');
const db = require('../config/db_sequelize');
const path  =  require('path');

const Administrador = require('../models_postgres/administrador');
const administrador = require('../models_postgres/administrador');



/*db.sequelize.sync({ force: true }).then(() => {
    console.log('{ force: true }');
});*/

module.exports = {
    async getLogout(req, res) {
        req.session.destroy();
        res.redirect('/');
    },
    async postLogin(req, res) {

        db.Administrador.findAll({ where: { login: req.body.login, senha: req.body.senha } }).then(administrador => {
            if (administrador.length > 0) {

                req.session.login = req.body.login;
                res.redirect('/home');
            } else {

                res.redirect('/');
            }
        });
    },


    async getLogin(req, res) {
        res.render('aadministrador/loginAdm', { layout: 'noMenu.handlebars' });
    },

    async getRecuperarSenha(req, res) {
        db.Administrador.findAll({ where: { login: req.params.login } }).then(administrador => {
            if (administrador.length > 0) {
                res.render('administrador/recuperarSenha', { layout: 'noMenu.handlebars', login: req.params.login, pergunta: usuario[0].pergunta_secreta });
            } else {
                res.redirect('/');
            }
        });
    },
    async postRecuperarSenha(req, res) {
        db.Administrador.findAll({ where: { login: req.body.login, resposta_pergunta: req.body.resposta } }).then(administrador => {
            if (administrador.length > 0) {
                res.render('administrador/senhaRecuperada', { layout: 'noMenu.handlebars', senha: usuario[0].senha });
            } else {
                res.redirect('/');
            }
        });
    },
    async getCreateAdm(req, res) {
        res.render('administrador/admCreate');
    },

    async postCreateAdm(req, res) {
        db.Administrador.create({
            login: req.body.login,
            senha: req.body.senha,
            rg: req.body.rg
        });
        res.redirect('/home');
    },

  
}