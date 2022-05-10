/**
 * @author diego
 * @since
 */
const express    = require('express');
const bodyParser = require('body-parser');
const moment     = require('moment');

const PORT = process.env.PORT || 3000;
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

    res.send(
        `<html>
            <head>
                <title>Hello World</title>
            </head>
            <body>
                <h1>Hello World Express docker container</h1>           
            </body>
        </html>`
    );
});


// start server

app.listen(PORT,  () => {

    console.log(`Express server started @ port ${PORT}...`);

});


