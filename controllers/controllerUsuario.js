const Sequelize = require('sequelize');
const db = require('../config/db_sequelize');
const { redirect } = require('express/lib/response');
const  path  =  require('path');

const Usuario = require('../models_postgres/usuario');
const CadastroCrianca = require('../models_postgres/cadastroCrianca');
const Matricula = require('../models_postgres/matriculas');


/*db.sequelize.sync({ force: true }).then(() => {
    console.log('{ force: true }');
});*/

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
        const id_pai = req.params.Usuario.
        console.log("ID pai:" + id_pai);
       db.CadastroCrianca.create({
            nome: req.body.nome,
            nome_pai: req.body.nome_pai,
            rg: req.body.rg,
            bairro: req.body.bairro,
            endereco: req.body.endereco,
        
        });
       // console.log("Entrou aqui")
        res.redirect('/home');
    },
    //----
    async getCreateMatricula(req, res) {
        res.render('usuario/matriculaCreate');
    },
    async postCreateMatricula(req, res) {
        const imagem =  req.body.imageName;
        
       
         db.matriculas.create({
       
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
        db.matriculas.findAll().then(matriculas => {
            res.render('usuario/usuarioList', { matriculas: matriculas.map(matriculas => matriculas.toJSON()) });
        });
    },
    async getListMatricula(req, res) {
        db.matriculas.findAll().then(matriculas => {
            res.render('usuario/matriculaList', { matriculas: matriculas.map(matriculas => matriculas.toJSON()) });
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