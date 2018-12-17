
var myModule = require('./modules/ module-1.js');

var User = require('./modules/module-2.js');

var pepe = new User(123, 'Pepe Argento');

var diego = new User(432, 'Arquitectura web');

console.log(diego.getName());