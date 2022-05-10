const express = require('express')
const app = express()
const path = require('path')
var hbsEngine = require('express-handlebars');


app.use('/static', express.static(path.join(__dirname, 'public')))

//
// Configure template engine
// https://www.npmjs.com/package/express-handlebars
app.engine('.hbs', hbsEngine({

    defaultLayout: 'index',
    extname      : '.hbs'
}));


//
// Set as default view engine
//
app.set('views', './views');
app.set('view engine', '.hbs');
app.set('trust proxy', true);


app.get('/', function (req, res) {



    res.render('home', {

        layout: false,
        title: 'Hola arquitectura web',
        images: ['jade.png', 'velocity.png', 'freemarker.png']

    });

})



app.listen(9090, function () {
    console.log('example app!')
})
