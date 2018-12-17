const express = require('express')
const app = express()
const path = require('path')
const exphbs = require('express-handlebars')


app.use('/static', express.static(path.join(__dirname, 'public')))

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


app.get('/', function (req, res) {

    res.render('home', {

        title: 'Hola arquitectura web',
        images: []

    });

})



app.listen(9090, function () {
    console.log('example app!')
})