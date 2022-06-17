const FavoriteModel = require('../models/favorite.model');

const FavoriteService = {
  getAll: (param,result) => FavoriteModel.getList(param,result),
  addToFavorite: (cart,result) => FavoriteModel.addToFavorite(cart,result),
  deleteFavoriteItem: (ids,result) => FavoriteModel.deleteFavoriteItem(ids,result),
}

module.exports = FavoriteService;