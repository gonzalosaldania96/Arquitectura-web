const express = require('express')
const app = express()
const path = require('path')

app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/', function (req, res) {

    res.sendFile(path.join(__dirname, 'public/index.html'));
})

app.listen(9090, function () {

    console.log('example app!')
})