var mongoose = require('mongoose');
var async = require("async");


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/palermo', {useMongoClient: true});


mongoose.connection.on('error', function(err) {

    console.log('Error connecting to mongo: ' + err);
});


mongoose.connection.on('open', function(err) {

    console.log('connected mongo!');

    // Each schema maps to a MongoDB collection and defines the shape of the
    // documents within that collection.

    // Each key in our blogSchema defines a property in our documents
    // which will be cast to its associated
    var userSchema = mongoose.Schema({

        name: String

    });

    var User = mongoose.model('User', userSchema);

    var u1 = new User({name: 'Diego'});
    var u2 = new User({name: 'Juan'});
    var u3 = new User({name: 'Carlos'});
    var u4 = new User({name: 'Pedro'});


    async.parallel([u1.save.bind(u1), u2.save.bind(u2), u3.save.bind(u3), u4.save.bind(u4)], function() {

        User.find({}, function(err, users) {

            console.log(users);

            User.remove({}, function(err) {

                mongoose.connection.close();

            });

        });

    });

});








