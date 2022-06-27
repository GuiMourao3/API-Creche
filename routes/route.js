const express = require('express');
const controllerUsuario = require('../controllers/controllerUsuario');
const controllerDiretor = require('../controllers/controllerDiretor');
const controllerAdministrador = require ('../controllers/controllerAdministrador');
const route = express.Router();

module.exports = route;

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads/")
    },
    filename: (req, file, cb) => {
        req.imageName = req.body.nome + '.png'
        cb(null, req.imageName)
    },
})
const upload = multer({ storage })

//Home
route.get("/home", function(req, res) {
    res.render('home');
});

route.get("/logout", controllerUsuario.getLogout);


//Usuario - Login e Recuperação de Senha
route.get("/", controllerUsuario.getLogin);
route.post("/login", controllerUsuario.postLogin);

//Controller Usuario
route.get("/usuarioCreate", controllerUsuario.getCreate);
route.post("/usuarioCreate", controllerUsuario.postCreate);
route.get("/usuarioList", controllerUsuario.getList);
route.get("/usuarioList", controllerUsuario.getList);
route.get("/usuarioEdit/:id", controllerUsuario.getEdit);
route.post("/usuarioEdit", controllerUsuario.postEdit);
route.get("/usuarioDeleteTela/:id", controllerUsuario.getAlert);
route.get("/usuarioDelete/:id", controllerUsuario.getDelete);
route.get("/cadastrarCrianca", controllerUsuario.getCreateCrianca);
route.post("/cadastrarCrianca", controllerUsuario.postCreateCrianca);
route.get("/matriculaCreate", controllerUsuario.getCreateMatricula);
route.get("/matriculaCreate/:id", controllerUsuario.getCreateMatriculaNew);
route.post("/matriculaCreate",upload.single('comprovante_res'), controllerUsuario.postCreateMatricula);
route.get("/matriculaList", controllerUsuario.getListMatricula);
route.get("/alunoList", controllerUsuario.getListAluno);

//Routes Vagas
route.get("/vagasCreate", controllerDiretor.getCreateVagas);
route.get("/vagasList", controllerDiretor.getListVagas);
route.post("/vagasCreate", controllerDiretor.postCreateVagas);
route.get("/vagasEdit/:id", controllerDiretor.getEditVagas);
route.post("/vagasEdit", controllerDiretor.postEditVagas);

//Controller Diretor
route.get("/usuarioList", controllerDiretor.getList);
route.get("/usuarioEdit/:id", controllerDiretor.getEdit);
route.post("/usuarioEdit", controllerDiretor.postEdit);
route.get("/usuarioDeleteTela/:id", controllerDiretor.getAlert);
route.get("/usuarioDelete/:id", controllerDiretor.getDelete);
route.get("/logout", controllerDiretor.getLogout);

//Diretor - Login
route.get("/", controllerDiretor.getLogin);
route.get("/login_Diretor", controllerDiretor.getLogin);
route.post("/login_Diretor", controllerDiretor.postLogin);

//Route Administrador
route.get("/", controllerAdministrador.getLogin);
route.get("/loginAdm", controllerAdministrador.getLogin);
route.post("/loginAdm", controllerAdministrador.postLoginAdministrador);
route.get("/admCreate", controllerAdministrador.getCreateAdm);
route.post("/admCreate", controllerAdministrador.postCreateAdm);
route.get('/crecheCreate', controllerAdministrador.getCreateCreche);
route.post('/crecheCreate', controllerAdministrador.postCreateCreche);
route.get('/crecheList', controllerAdministrador.getListCreche);
route.get("/diretorCreate", controllerAdministrador.getCreateDiretor);
route.post("/diretorCreate", controllerAdministrador.postCreateDiretor);
route.get("/diretorEdit", controllerAdministrador.getEditDiretor);
route.get("/matriculaListAdm", controllerAdministrador.getListVagasAdm);

//Route Matricula
route.get("/matriculaEditAdm/:id", controllerAdministrador.getEditMatricula);
route.post("/matriculaEditAdm", controllerAdministrador.postEditMatricula);
