const express    = require('express');
const bodyParser = require('body-parser');
const moment     = require('moment');
const clientsService = require('./services/clientsService');

const app = express();



// parse body as json

app.use(bodyParser.json());


// all requests

app.use((req, res, next) => {

    console.log(`${req.method}: ${req.path} - ${moment().format(moment.HTML5_FMT.DATETIME_LOCAL_MS)}`);

    next();

});



// get home

app.get('/', async (req, res) => {

    let clients = await clientsService.getAll();

    let list = [];

    clients.forEach((c) => {

        list.push(`<li>${c.nombre} con id: ${c.id}</li>`);

    });

    res.send(
        `<html>
            <head>
                <title>Title</title>
            </head>
            <body>
                <ul>
                    ${list.join('')}
                </ul>            
            </body>
        </html>`
    );
});



// api


app.get('/api/clients', async (req, res) => {

    let clients = await clientsService.getAll();

    res.json(clients);

});



// get clients by id

app.get('/api/clients/:id', async (req, res) => {

    try {

        let cli = await clientsService.getById(req.params.id);

        res.json(cli);

    } catch(ex) {

        res.status(404).end();

    }

});


// add new client - Content Type: json

app.post('/api/clients', (req, res) => {

    clientsService.add(req.body);

    res.status(201).send(req.body);

});



app.delete('/api/clients/:id', (req, res) => {

    clientsService.deleteById(req.params.id);

    res.status(204).end();
});



// start server

app.listen(process.env.PORT || 3000, function () {

    console.log('API andando con express...');

});


