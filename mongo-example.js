
var MongoClient = require('mongodb').MongoClient;

// Connection URL
var url = 'mongodb://localhost:27017/palermo';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {

    console.log("Connected successfully to server");

    var palermoCol = db.collection('users');

    // no funciona como esperamos
    /*
    palermoCol.insertOne({name: 'diego'});
    palermoCol.insertOne({name: 'juan'});
    palermoCol.insertOne({name: 'carlos'});
    palermoCol.insertOne({name: 'pedro'});
    */

    palermoCol.insertMany([

        {name: 'diego'},
        {name: 'juan'},
        {name: 'carlos'},
        {name: 'pedro'}

    ], function(err, res) {


        palermoCol.find().toArray(function(err, docs) {

            console.log(docs);

            db.close();

            palermoCol.drop(function(err, res) {

                db.close();

            });

        });

    });

});
