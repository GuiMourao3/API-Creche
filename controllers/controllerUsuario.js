const Sequelize = require('sequelize');
const db = require('../config/db_sequelize');
const Usuario = require('../models_postgres/usuario');
const  path  =  require('path');


/*db.sequelize.sync({ force: true }).then(() => {
    console.log('{ force: true }');
});*/

module.exports = {
    async getLogout(req, res) {
        req.session.destroy();
        res.redirect('/');
    },
    async postLogin(req, res) {
        console.log('1111111')
        db.Usuario.findAll({ where: { login: req.body.login, senha: req.body.senha } }).then(usuario => {
            if (usuario.length > 0) {
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
        db.Usuario.findAll({ where: { login: req.params.login } }).then(usuario => {
            if (usuario.length > 0) {
                res.render('usuario/recuperarSenha', { layout: 'noMenu.handlebars', login: req.params.login, pergunta: usuario[0].pergunta_secreta });
            } else {
                res.redirect('/');
            }
        });
    },
    async postRecuperarSenha(req, res) {
        db.Usuario.findAll({ where: { login: req.body.login, resposta_pergunta: req.body.resposta } }).then(usuario => {
            if (usuario.length > 0) {
                res.render('usuario/senhaRecuperada', { layout: 'noMenu.handlebars', senha: usuario[0].senha });
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
        db.Usuario.findAll().then(usuario => {
            res.render('usuario/usuarioList', { usuario: usuario.map(usuario => usuario.toJSON()) });
        });
    },
    async getEdit(req, res) {
        await Usuario.findOne({ id: req.params.id }).then((teste) => {
            res.render('usuario/usuarioEdit', {
                teste: teste.toJSON()
            });
        });
    },
    async postEdit(req, res) {
        await Usuario.update({
            login: req.params.login,
            senha: req.params.senha,
            pergunta: req.params.pergunta,
            resposta: req.params.resposta,

        }, {
            where: {

                id: req.params.id,
            },
        });
        db.Usuario.findByPK(req.prams.id).the((result) => res.json(result));

    },

    async getAlert(req, res) {

        res.render('usuario/alertaDelete', { id: req.params.id });

    },
    async getDelete(req, res) {
        db.Usuario.destroy({ where: { id: req.params.id } });

        res.redirect('/usuarioList');
    }
}