const path = require('path'); 
const gulp = require('gulp'); 
const uglify = require('gulp-uglify'); 
const cleanCSS = require('gulp-clean-css'); 
const rename = require('gulp-rename'); 
const rev = require('gulp-rev'); 
const revReplace = require('gulp-rev-replace');


gulp.task('jquery-min', async () => {
  await gulp.src('assets/js/jquery.js') 
    .pipe(uglify()) 
    .pipe(rename(function (path) {
      path.basename += "-min";
      path.extname = ".js";
    }))
    .pipe(gulp.dest('public/'));
});

gulp.task('css-min', async () => {
  await gulp.src('assets/css/main.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename(function (path) {
      path.basename += "-min";
      path.extname = ".css";
    }))
    .pipe(gulp.dest('public/'));
});

gulp.task('revision', async () => {


  await gulp.src([ 
    'public/**/*.{css,js}' 
  ]) 
  .pipe(rev()) 
  .pipe(gulp.dest('public/')) 
  .pipe(rev.manifest('rev-manifest.json')) 
  .pipe(gulp.dest('public/'));
})
