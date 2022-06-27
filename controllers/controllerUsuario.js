const Sequelize = require('sequelize');
const db = require('../config/db_sequelize');
const { redirect } = require('express/lib/response');
const  path  =  require('path');
const Usuario = require('../models_postgres/usuario');
const CadastroCrianca = require('../models_postgres/cadastroCrianca');
const Matricula = require('../models_postgres/matriculas');
const cadastroCrianca = require('../models_postgres/cadastroCrianca');

/* db.sequelize.sync({ force: true }).then(() => {
    console.log('{ force: true }');
}); */

module.exports = {
    async getLogout(req, res) {
        req.session.destroy();
        res.redirect('/');
    },

    async postLogin(req, res) {
        db.Usuario.findAll({ where: { login: req.body.login, senha: req.body.senha } }).then(usuario => {
            if (usuario.length > 0) {
                req.session.login = req.body.login;
                res.redirect('/home');
            } else {
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
            contato: req.body.contato,
            cpf: req.body.cpf,
        });
        res.redirect('/home');
    },

    async getCreateCrianca(req, res) {
        res.render('usuario/cadastrarCrianca');
    },

    async postCreateCrianca(req, res) {
        db.CadastroCrianca.create({
            nome: req.body.nome,
            nome_pai: req.body.nome_pai,
            rg: req.body.rg,
            bairro: req.body.bairro,
            endereco: req.body.endereco,
        });
        res.redirect('/home');
    },

    async getCreateMatricula(req, res) {
        res.render('usuario/matriculaCreate');
    },

    async getCreateMatriculaNew(req, res) {
        await db.CadastroCrianca.findOne({
            id: req.body.id
        }).then((cadastroCrianca) => {
            res.render('usuario/matriculaCreate', {
                cadastroCrianca: cadastroCrianca.toJSON()
            });
        });
    },

    async postCreateMatricula(req, res) {
        const imagem =  req.body.imageName;
         db.Matriculas.create({
            nome: req.body.nome,
            nome_pai: req.body.nome_pai,
            rg: req.body.rg,
            bairro: req.body.bairro,
            endereco: req.body.endereco,
            fone: req.body.fone,
            comprovante_res: req.body.nome,
        });
        res.redirect('/home');
    },

    async getList(req, res) {
        db.Matriculas.findAll().then(matriculas => {
            res.render('usuario/usuarioList', { matriculas: matriculas.map(matriculas => matriculas.toJSON()) });
        });
    },

    async getListMatricula(req, res) {
        db.Matriculas.findAll().then(matriculas => {
            res.render('usuario/matriculaList', { matriculas: matriculas.map(matriculas => matriculas.toJSON()) });
        });
    }, 

    async getListAluno(req, res){
            db.CadastroCrianca.findAll().then(cadastroCrianca => {
                res.render('usuario/alunoList', {
                    cadastroCrianca: cadastroCrianca.map(cadastroCrianca => cadastroCrianca.toJSON())
                });
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
    },

    async getAlert(req, res) {
        res.render('usuario/alertaDelete', { id: req.params.id });

    },

    async getDelete(req, res) {
        db.Usuario.destroy({ where: { id: req.params.id } });
        res.redirect('/usuarioList');
    }
}