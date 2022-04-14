const Sequelize = require('sequelize');
const db = require('../config/db_sequelize');
//const Usuario = require('../models/models_postgres/Usuario');
const  path  =  require('path');

/*db.sequelize.sync({force: true}).then(() => {
    console.log('{ force: true }');
});*/

module.exports = {
    async getLogout(req, res) {
        req.session.destroy();
        res.redirect('/');
    },
    async postLogin(req, res) {
        console.log('1111111')
        db.Usuario.findAll({ where: { login: req.body.login, senha: req.body.senha } }).then(usuarios => {
            if (usuarios.length > 0) {
                console.log('2222')
                req.session.login = req.body.login;
                res.redirect('/home');
            } else {
                console.log('333333')
                res.redirect('/');
            }
        });
    },


    async getLogin(req, res) {
        res.render('usuario/login', { layout: 'noMenu.handlebars' });
    },

    async getRecuperarSenha(req, res) {
        db.Usuario.findAll({ where: { login: req.params.login } }).then(usuarios => {
            if (usuarios.length > 0) {
                res.render('usuario/recuperarSenha', { layout: 'noMenu.handlebars', login: req.params.login, pergunta: usuarios[0].pergunta_secreta });
            } else {
                res.redirect('/');
            }
        });
    },
    async postRecuperarSenha(req, res) {
        db.Usuario.findAll({ where: { login: req.body.login, resposta_pergunta: req.body.resposta } }).then(usuarios => {
            if (usuarios.length > 0) {
                res.render('usuario/senhaRecuperada', { layout: 'noMenu.handlebars', senha: usuarios[0].senha });
            } else {
                res.redirect('/');
            }
        });
    },
    async getCreate(req, res) {
        res.render('usuario/usuarioCreate');
    },
    async postCreate(req, res) {
        db.Usuario.create({
            login: req.body.login,
            senha: req.body.senha,
            pergunta_secreta: req.body.pergunta,
            resposta_pergunta: req.body.resposta,
        });
        res.redirect('/home');
    },
    async getList(req, res) {
        db.Usuario.findAll().then(usuarios => {
            res.render('usuario/usuarioList', { usuarios: usuarios.map(usuarios => usuarios.toJSON()) });
        });
    }
}