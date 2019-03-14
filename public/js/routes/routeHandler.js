let express = require('express')
let getData = require('../getData.js')

exports.homepage = async (req, res, next) => {
  let data = await getData.allInfo()
  let imageUrlArray = data.map(res => {
    if(res.poster_path !== null) {
      return getData.getPoster(res.poster_path);
    } else {
      return 'geen poster'
    }
  })
  let obj = data.map( async (res, index) => {
    if(res.genre_ids.length > 0) {
      let genre = await getData.getGenre(res.genre_ids);
      return {
        meta: res,
        image: imageUrlArray[index],
        genre: genre
      }
    }
  })

  const allObj = await Promise.all(obj)
  res.render('overview', {
    data: allObj
  })
}

exports.detailpage = async (req, res, next) => {
  let data = await getData.getSingleInfo(req.params.id)
  let image = getData.getPoster(data.poster_path)
  let genre = await getData.getGenre(data.genre_ids);
  let obj = {
    meta: data,
    image: image,
    genre: genre
  }

  res.render('details', {
    data: obj
  })
}
