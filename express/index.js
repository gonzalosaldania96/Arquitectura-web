const express = require("express");


//comment 1
const app = express();


let clients = [

    {id: 1, nombre: 'Juan', document: '12345'},
    {id: 2, nombre: 'Agustin', document: '435324'},
    {id: 3, nombre: 'Catalina', document: '3333333'},
    {id: 4, nombre: 'Fabian', document: '66666'},
    {id: 5, nombre: 'Clara', document: '88888'}

];


app.use(express.json());


app.use((request, response, next) => {

    console.log(request.method, request.path);

    next();

});


app.use((request, response, next ) => {

    if(request.headers['user-agent'].match('ios|android')) {

        response.redirect('version mobile')


    } else {

        next();

    }


});



app.get('/', (request, response) => {

    // params

});



app.get('/api/clients', (request, response) => {


    // acceder a ls db

    response.json(clients);

});



app.post('/api/clients', (resquest, response) => {

    clients.push(resquest.body);

    response.status(201).send(resquest.body);

});



app.delete('/api/clients/:id', (request, response) => {


    const idClient = request.params.id;

    clients = clients.filter(cliente => (cliente.id != idClient));

    response.status(204).end();


});





app.listen(3000, () => {

   console.log("app express running...");

});


