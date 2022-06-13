const Sequelize = require('sequelize');
const db = require('../config/db_sequelize');
const Diretor = require('../models_postgres/diretor');
const  path  =  require('path');


db.sequelize.sync({ force: true }).then(() => {
    console.log('{ force: true }');
});
module.exports = {
    async getLogout(req, res) {
        req.session.destroy();
        res.redirect('/');
    },
    async postLogin(req, res) {

        db.Diretor.findAll({ where: { login: req.body.login, senha: req.body.senha } }).then(diretor => {
            if (diretor.length > 0) {

                req.session.login = req.body.login;
                res.redirect('/home');
            } else {

                res.redirect('/');
            }
        });
    },


    async getLogin(req, res) {
        // res.render('login_Diretor');
        res.render('diretor/login_Diretor', { layout: 'noMenu.handlebars' });
    },

    async getRecuperarSenha(req, res) {
        db.Diretor.findAll({ where: { login: req.params.login } }).then(diretor => {
            if (diretor.length > 0) {
                res.render('diretor/recuperarSenha', { layout: 'noMenu.handlebars', login: req.params.login, pergunta: usuario[0].pergunta_secreta });
            } else {
                res.redirect('/');
            }
        });
    },
    async postRecuperarSenha(req, res) {
        db.Diretor.findAll({ where: { login: req.body.login, resposta_pergunta: req.body.resposta } }).then(diretor => {
            if (diretor.length > 0) {
                res.render('diretor/senhaRecuperada', { layout: 'noMenu.handlebars', senha: diretor[0].senha });
            } else {
                res.redirect('/');
            }
        });
    },
    async getCreate(req, res) {
        res.render('diretor/diretorCreate');
    },
    async postCreate(req, res) {
        db.Diretor.create({
            login: req.body.login,
            senha: req.body.senha,
            pergunta_secreta: req.body.pergunta,
            resposta_pergunta: req.body.resposta,
            turma: req.body.turma,
            turno: req.body.turno
           

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