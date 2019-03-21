const express = require('express');
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');

const baseUrl = 'https://api.themoviedb.org/3';
const key = '4fa4dea399a0fe1c63ee186e5b84c2a1'

exports.allMovieInfo = () => {
  const endpoint = 'discover/movie?primary_release_year=2019';

  return parseToJson(`${baseUrl}/${endpoint}&api_key=${key}`)
  .then(res => {
    return res.results;
  })
}

exports.getMovieInfo = (id) => {
  return parseToJson(`${baseUrl}/movie/${id}?api_key=${key}`)
}

exports.getMovieCredits = (id) => {
  return parseToJson(`${baseUrl}/movie/${id}/credits?api_key=${key}`)
}

exports.getPoster = (path) => {
  return `https://image.tmdb.org/t/p/w500${path}`
}

// Parsers
parseToJson = (url) => {
  return fetch(url)
  .then(res => {
    return res.json()
  })
}
