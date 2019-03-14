const fs = require('fs');
const path = require('path')
const express = require('express');
const hbs = require('express-handlebars')

const routes = require('./public/js/routes/routeHandler.js')

const app = express()
const port = 8080

app.get('/', routes.homepage)
app.get('/details/:id', routes.detailpage)

app.engine('hbs', hbs({ extname: 'hbs' }));
app.set('views', path.join(__dirname, '/public/view/'))
app.set('view engine', 'hbs')

app.use(express.static(__dirname + '/public/'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
