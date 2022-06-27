const Sequelize = require('sequelize');
const db = require('../config/db_sequelize');
const path = require('path');
const Diretor = require('../models_postgres/diretor');
const VagasCreche = require('../models_postgres/vagasCreche');
const { VagasCreches } = require('../config/db_sequelize');

/*db.sequelize.sync({
    force: true
}).then(() => {
    console.log('{ force: true }');
});*/

module.exports = {
    async getLogout(req, res) {
        req.session.destroy();
        res.redirect('/');
    },

    async postLogin(req, res) {
        db.Diretor.findAll({ where: { loginDiretor: req.body.loginDiretor, senhaDiretor: req.body.senhaDiretor } }).then(diretor => {
            if (diretor.length > 0) {
                req.session.login = req.body.loginDiretor;
                res.redirect('/home');
            } else {
                res.redirect('/');
            }
        });
    },

    async getLogin(req, res) {
        res.render('diretor/login_Diretor', {
            layout: 'noMenu.handlebars'
        });
    },

    async getRecuperarSenha(req, res) {
        db.Diretor.findAll({
            where: {
                login: req.params.login
            }
        }).then(diretor => {
            if (diretor.length > 0) {
                res.render('diretor/recuperarSenha', {
                    layout: 'noMenu.handlebars',
                    login: req.params.login,
                    pergunta: usuario[0].pergunta_secreta
                });
            } else {
                res.redirect('/');
            }
        });
    },

    async postRecuperarSenha(req, res) {
        db.Diretor.findAll({
            where: {
                login: req.body.login,
                resposta_pergunta: req.body.resposta
            }
        }).then(diretor => {
            if (diretor.length > 0) {
                res.render('diretor/senhaRecuperada', {
                    layout: 'noMenu.handlebars',
                    senha: diretor[0].senha
                });
            } else {
                res.redirect('/');
            }
        });
    },

    async getCreateVagas(req, res) {
        res.render('diretor/vagasCreate');
    },

    async postCreateVagas(req, res) {
        db.VagasCreches.create({
            quantidadeVagas: req.body.quantidadeVagas,
            turno: req.body.turno,
            turma: req.body.turma,
        });
        res.redirect('/vagasList');
    },

    async getListVagas(req, res) {
        db.VagasCreches.findAll().then(vagasCreches => {
            res.render('diretor/vagasList', {
                vagasCreches: vagasCreches.map(vagasCreches => vagasCreches.toJSON())
            });
        });
    },

    async getEditVagas(req, res) {
        await VagasCreches.findOne({
            id: req.params.id
        }).then((vagasCreches) => {

            res.render('diretor/vagasEdit', {
                vagasCreches: vagasCreches.toJSON()
            });
        });
    },

    async postEditVagas(req, res) {
        db.VagasCreches.update(req.body, {
              where: {
                id: req.body.id
              }
            },{
                quantidadeVagas:req.body.quantidadeVagas,
                 turno: req.body.turno,
                 turma: req.body.turma,
            })
        
            res.redirect('/home');
    },

    async getList(req, res) {
        db.Usuario.findAll().then(usuario => {
            res.render('usuario/usuarioList', {
                usuario: usuario.map(usuario => usuario.toJSON())
            });
        });
    },

    async getEdit(req, res) {
        await Usuario.findOne({
            id: req.params.id
        }).then((teste) => {
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
    },

    async getAlert(req, res) {
        res.render('usuario/alertaDelete', {
            id: req.params.id
        });

    },

    async getDelete(req, res) {
        db.Usuario.destroy({
            where: {
                id: req.params.id
            }
        });
        res.redirect('/usuarioList');
    }
}