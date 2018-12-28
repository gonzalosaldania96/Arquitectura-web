const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');
const PubSub = require('./app/pubsub');

/**
 * @author diego
 * @since 1.0.0
 */

const app = express();
const blockchain = new Blockchain();
const pubsub = new PubSub({blockchain});
const DEFAULT_PORT = 3000;
const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`;



app.use(bodyParser.json());


/**
 *
 */
app.get('/api/blocks', (req, res) => {

    res.json(blockchain.chain);
});


/**
 *
 */
app.post('/api/mine', (req, res) => {

    const {data} = req.body;

    blockchain.addBlock({data});

    pubsub.broadcastChain();

    res.redirect('/api/blocks');
});



// Sync method
const syncChain = () => {

    request({url: `${ROOT_NODE_ADDRESS}/api/blocks`}, (error, response, body) => {

       if(!error && response.statusCode === 200) {

           const rootChain = JSON.parse(body);
           console.log('replace chain on sync with: %o', rootChain);
           blockchain.replaceChain(rootChain);
       }
    });
};

// Start server


let PEER_PORT;

if(process.env.GENERATE_PEER_PORT === 'true') {

    PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}

const PORT = PEER_PORT ||DEFAULT_PORT;
app.listen(PORT, () => {

    console.log('listening at localhost: %d', PORT);

    // do not sync if I am the first node
    if(PORT !== DEFAULT_PORT) syncChain();
});