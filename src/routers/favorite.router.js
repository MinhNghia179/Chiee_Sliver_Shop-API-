const express = require('express');
const Auth = require('../middleware/auth.middleware');
const FavoriteController = require('../controllers/favorite.controller');

const router = express.Router();

router.get('/favorite',Auth.isAuth , FavoriteController.getList);
router.post('/favorite',Auth.isAuth , FavoriteController.addToFavorite);
router.delete('/favorite',Auth.isAuth , FavoriteController.deleteFavoriteItem);

module.exports = router;