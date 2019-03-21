const path = require('path'); 
const gulp = require('gulp'); 
const uglify = require('gulp-uglify'); 
const cleanCSS = require('gulp-clean-css'); 
const rename = require('gulp-rename'); 

const baseDir = 'assets/'; 


gulp.task('jquery-min', function() {
  return gulp.src(baseDir + '/js/jquery.js') 
    .pipe(uglify()) 
    .pipe(rename(function (path) {
      path.basename += "-min";
      path.extname = ".js";
    }))
    .pipe(gulp.dest('public/js/'));
});

gulp.task('css-min', () => {
  return gulp.src(baseDir + '/css/main.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename(function (path) {
      path.basename += "-min";
      path.extname = ".css";
    }))
    .pipe(gulp.dest('public/css/'));
});
