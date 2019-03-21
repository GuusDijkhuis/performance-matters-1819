const fs = require('fs');
const path = require('path')
const express = require('express');
const compression = require('compression')
const hbs = require('express-handlebars')

const routes = require('./assets/js/routeHandler.js')

const app = express()
const port = 8080

app.get('/', routes.homepage)
app.get('/details/:id', routes.detailpage)

// Server side
app.engine('hbs', hbs({ extname: 'hbs' }));
app.set('views', path.join(__dirname, '/assets/view/'))
app.set('view engine', 'hbs')

// Client side
app.use(compression())
app.use(express.static(__dirname + '/public'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
