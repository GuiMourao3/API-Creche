const db_mongoose = require('./config/db_mongoose');
const routes = require('./routes/route');
const mongoose = require('mongoose');
const handlebars = require('express-handlebars');
const  express  =  require('express');
var session = require('express-session');
const middlewares = require('./middlewares/middlewares');
const unirest = require("unirest");
const  app  =  express();
var receitas = unirest.get('http://localhost:8081/receitas');
//console.log(animal);
//const swaggerUI = require('swagger-ui-express');
//const swaggerDocument = require('./Swagger.json');
//app.use("/api-docs",swaggerUI.serve, swaggerUI.setup(swaggerDocument));
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'textosecreto', saveUninitialized: true, cookie: { maxAge: 30 * 60 * 1000 } }));
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
//app.use(middlewares.logRegister, middlewares.sessionControl)
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(routes);

mongoose.connect(db_mongoose.connection, { useUnifiedTopology: true, useNewUrlParser: true }).then(() => {
    console.log('Conectado com o BD');
}).catch((err) => {        
    console.log(err);
});

app.use(    express.urlencoded({       extended:  true     }))

app.listen(8081,  function() {    
    console.log("Servidor online")
});
/*
var req = unirest.get('http://localhost:8081/api/animal').then((res) => {
    var aux = res.body.data.animal;
    for (var i = 0; i < aux.length; i++)
        console.log(aux[i]._id + ' ' + aux[i].nome)
});
var req = unirest.get('http://localhost:8081/api/animal/60f73d323e5d092df8ddc0bc').then((res) => {
    console.log(res.body.data)
});
var req = unirest.post('http://localhost:8081/api/animal/')
    .send({
        "nome": "nome",
        "proprietario": "proprietario ",
        "endereco": "endereco",
        "tipo": "tipo",
        "raca": "raca",
        "imagem": "imagem"
    })
    .then((res) => {
        console.log(res.body.data)
    });
//nome, proprietario, endereco, tipo, raca, imagem
*/