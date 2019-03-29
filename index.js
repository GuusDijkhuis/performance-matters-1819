const fs = require('fs');
const path = require('path')
const express = require('express');
const hbs = require('express-handlebars')
const shrinkRay = require('shrink-ray-current')

const routes = require('./assets/js/routeHandler.js')

const app = express()
const port = 3000


// Server side
app.engine('hbs', hbs({ extname: 'hbs' }));
app.set('views', path.join(__dirname, '/assets/view/'))
app.set('view engine', 'hbs')

// Client side

app.use(function (req, res, next) {
  res.locals = {
    cssFilepath: revUrl("main-min.css"),
    jsFilepath: revUrl("jquery-min.js")
  };
  next();
});
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'max-age=' + 365 * 24 * 60 * 60);
  next();
});
app.use(shrinkRay({ 
  filter: (req) => req.headers['accept'].includes('text/html') 
}));

app.use(express.static(__dirname + '/public'))

app.get(['*.js', '*.css'], (req, res, next) => {
  const encoding = req.headers['accept-encoding']
  const extensionIndex = req.originalUrl.lastIndexOf('.')
  const extension = req.originalUrl.slice(extensionIndex)

  if (encoding && encoding.includes('br')) {
    req.url = `${req.url}.br`
    res.set('Content-Encoding', 'br')
  } else if (encoding && encoding.includes('gzip')) {
    req.url = `${req.url}.gz`
    res.set('Content-Encoding', 'gzip')
  }

  res.set('Content-Type', extension === '.js' ? 'text/javascript' : 'text/css')
  next()
})
app.get('/', routes.homepage)
app.get('/offline', routes.offline)
app.get('/details/:id', routes.detailpage)

app.listen((process.env.PORT || port), () => console.log(`Example app listening on port ${port}!`))

function revUrl(url) {
  let fileName = JSON.parse(fs.readFileSync("public/rev-manifest.json", 'utf8'))
  return fileName[url]
}
