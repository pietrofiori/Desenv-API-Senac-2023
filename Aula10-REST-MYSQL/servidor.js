const restify = require("restify");
const errors = require("restify-errors");



const servidor = restify.createServer({
    name : 'loja',
    version: '1.0.0'

});
// plugins
servidor.use(restify.plugins.acceptParser(servidor.acceptable));
servidor.use(restify.plugins.queryParser());
servidor.use(restify.plugins.bodyParser());

servidor.listen(8001,function(){

    console.log("Servidor Rodando:", "\n", "Nome:", servidor.name, "\n" , "URL", servidor.url );
});
//conexão
var knex = require('knex')({
    client: 'mysql',
    connection:{
        host: "localhost",
        user: "root",
        password: "",
        database: "loja"
    }
})

servidor.get('/',(req,res,next) => {
    res.send("Bem vindo!")
});
//produtos
servidor.get('/produtos',(req,res,next) => {
    knex(' produto ').then( (dados) => {
        res.send(dados);
    }, next);


});
//produtos id
servidor.get('/produtos/:id',(req,res,next) => {
    const idProduto = req.params.id
    knex(' produto ')
    .where('id',idProduto)
    .first()
    .then( (dados) => {
        //tratando erros
        if(!dados){
            return res.send( new errors.BadRequestError("Produto nao encontrado"))
        }
        res.send(dados);
    },next);


});
// http post 
servidor.post('/produtos',(req,res,next) => {
    knex(' produto ')
        .insert(req.body)
        .then( (dados) => {
            res.send(dados);
        }, next);
});

servidor.put('/produtos/:id',(req,res,next) => {
    const idProduto = req.params.id
    knex(' produto ')
    .where('id',idProduto)
    .update(req.body)
    .then( (dados) => {
        //tratando erros
        if(!dados){
            return res.send( new errors.BadRequestError("Produto nao encontrado"))
        }
        res.send(dados);
    },next);


});

servidor.del('/produtos/:id',(req,res,next) => {
    const idProduto = req.params.id
    knex(' produto ')
    .where('id',idProduto)
    .delete()
    .then( (dados) => {
        //tratando erros
        if(!dados){
            return res.send(errors.BadRequestError("Produto nao encontrado"))
        }
        res.send(dados);
    },next);


});