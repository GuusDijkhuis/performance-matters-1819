const express = require('express');
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');

exports.allInfo = () => {
  return parseToJson(`https://api.themoviedb.org/3/discover/movie?primary_release_year=2019&api_key=4fa4dea399a0fe1c63ee186e5b84c2a1`)
  .then(res => {
    return res.results;
  })
}

exports.getPoster = (path) => {
  return `https://image.tmdb.org/t/p/w500${path}`
}

exports.getGenre = (id) => {
  return parseToJson(`https://api.themoviedb.org/3/genre/movie/list?api_key=4fa4dea399a0fe1c63ee186e5b84c2a1`)
  .then(res => {
    return res.genres.filter(res => {
     return res.id == id
    })
  })
  .then(res => {
    if(res.length > 0) {
      return res[0].name;
    }
    else {
      return 'geen genre';
    }
  })
}

exports.getSingleInfo = (id) => {
  return parseToJson(`http://api.themoviedb.org/3/movie/${id}?api_key=4fa4dea399a0fe1c63ee186e5b84c2a1`)
}

parseToJson = (url) => {
  return fetch(url)
  .then(res => {
    return res.json()
  })
}
