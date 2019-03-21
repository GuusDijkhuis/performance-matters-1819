# Performance Matters @cmda-minor-web · 2018-2019

Ik heb er voor gekozen om niet met mijn OBA opdracht verder te gaan omdat ik persoonlijk de OBA API heel frustrerend vind. Ik heb daarom gekozen voor de API van Themoviedb. Ik laat de films zien die afgelopen week zijn uitgekomen en je kunt ook de detailpagina laten zien.

![Image of prototype](assets/img/readme-img/screenshot-app.png)

# Wat heb ik gedaan
## First view
### CSS
#### Probleem
Ik als eerst gekeken of er een mogelijk is dat de css kleiner gemaakt kunnen worden waardoor deze sneller laadt. Hieronder staat een screenshot van mijn requests van de `main.css`. Hier zie je dat de grootte van dit bestand is `2.5KB`.
![Image of slow requests](assets/img/readme-img/css-normal-fast-3g.png)
#### Oplossing
Ik heb met `gulp-css` het bestand van CSS verkleind naar `2.0KB`. Deze CSS wordt geminified naar een bestand met de naam `main-min.css` om het verschil te laten zien.
![Image of slow requests](assets/img/readme-img/css-minified-fast-3g.png)

### JS
#### Probleem
Ik als eerst gekeken of er een mogelijk is dat de css kleiner gemaakt kunnen worden waardoor deze sneller laadt. Hieronder staat een screenshot van mijn requests van de `jquery.js`. Hier zie je dat de grootte van dit bestand is `266KB`.
![Image of slow requests](assets/img/readme-img/js-normal-fast-3g.png)
#### Oplossing
Ik heb met `gulp-css` het bestand van JS verkleind naar `84.7KB`. Deze JS wordt geminified naar een bestand met de naam `jquery-min.js` om het verschil te laten zien.
![Image of slow requests](assets/img/readme-img/js-minified-fast-3g.png)


Na het verkleinen van CSS en JS heb ik de `npm` package `compression` gebruikt om mijn css en JS nog kleiner te maken. Het JS bestand is nog eens kleiner gemaakt tot `30KB`.
![Image of slow requests](assets/img/readme-img/css-compressed-fast-3g.png)
Het CSS bestand is kleiner gemaakt tot `1014B`.
![Image of slow requests](assets/img/readme-img/css-compressed-fast-3g.png)


### Wat wil ik nog doen
- [x] CSS minify
- [x] JS minify

### Wat wil ik nog doen
- [ ] Cache


### Week 1 - Server Side rendering

Doel: Webpagina's server side renderen

[Opdrachten](https://github.com/cmda-minor-web/performance-matters-1819/blob/master/week-1.md)
