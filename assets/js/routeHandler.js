const express = require('express')
const getData = require('./getData.js')

exports.homepage = async (req, res, next) => {
  const data = await getData.allMovieInfo()
  const imageUrlArray = await data.map(res => {
    if(res.poster_path) {
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
      genre: () => {if(movieMetaData.genres.length > 0) {
          movieMetaData.genres.name
        } else {
          movieMetaData.map(res => {
            if (res.name) {
              return res.name
            } else {
              return 'Geen genre bekend'
            }
          })
        }
      }
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

  const obj = {
    meta: movieMetaData,
    image: getData.getPoster(movieMetaData.poster_path)
  }
  res.render('details', {
    data: obj
  })
}

exports.offline = async (req, res, next) => {
  res.render('offline')
}
