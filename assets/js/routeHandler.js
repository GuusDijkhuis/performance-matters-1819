const express = require('express')
const getData = require('./getData.js')

exports.homepage = async (req, res, next) => {
  const data = await getData.allMovieInfo()
  const imageUrlArray = data.map(res => {
    if(res.poster_path !== null) {
      return getData.getPoster(res.poster_path);
    } else {
      return 'geen poster'
    }
  })
  const obj = data.map( async (res, index) => {
    const movieMetaData = await getData.getMovieInfo(res.id)
    return {
      meta: movieMetaData,
      image: getData.getPoster(movieMetaData.poster_path),
      genre: movieMetaData.genres.map(res => {
        if (res.name) {
          return res.name
        } else {
          return 'Geen genre bekend'
        }
      })
    }
  })

  const allObj = await Promise.all(obj)

  res.render('overview', {
    data: allObj
  })
}

exports.detailpage = async (req, res, next) => {
  const movieMetaData = await getData.getMovieInfo(req.params.id)
  const movieCreditData = await getData.getMovieCredits(req.params.id)
  const director = movieCreditData.crew.filter(res => {
    return res.job === "Director"
  })

  const obj = {
    meta: movieMetaData,
    image: getData.getPoster(movieMetaData.poster_path),
    genre: movieMetaData.genres.map(res => {
      if (res.name) {
        return res.name
      } else {
        return 'Geen genre bekend'
      }
    }),
    director: director[0].name
  }
  res.render('details', {
    data: obj
  })
}
