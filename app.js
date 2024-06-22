const routes = require('./routes/route');
const handlebars = require('express-handlebars');
const express = require('express');
var session = require('express-session');
const middlewares = require('./middlewares/middlewares');
const unirest = require("unirest");
const app = express();
var receitas = unirest.get('http://localhost:8081/receitas');
const multer = require('multer');
const upload = multer({ dest: 'imagens/' });

const path = require('path');
const { CadastroCrianca, Usuario } = require('./config/db_sequelize');
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'textosecreto', saveUninitialized: true, cookie: { maxAge: 30 * 60 * 1000 } }));
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
//app.use(middlewares.logRegister, middlewares.sessionControl)
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.use(express.urlencoded({ extended: true }))

app.listen(3000, function () {
    console.log("Servidor online")
});
