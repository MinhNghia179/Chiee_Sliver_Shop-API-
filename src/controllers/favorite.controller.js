const FavoriteService = require('../services/favorite.service');

exports.getList = (req, res) => {
  const param = req.query;
  FavoriteService.getAll(param,result => {
    res.send(result);
  });
}

exports.addToFavorite = (req, res) => {
  const data = req.body;
  FavoriteService.addToFavorite(data,result => {
    res.send(result);
  });
}

exports.deleteFavoriteItem = (req, res) => {
  const {ids} = req.body;
  FavoriteService.deleteFavoriteItem(ids,result => {
    res.send(result);
  });
}
