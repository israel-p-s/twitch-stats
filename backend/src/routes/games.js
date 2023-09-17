const { Router } = require('express');
const router = Router();
const { getGameBasicInfo } = require('../controllers/games')

router.get('/game/basicinfo/:game', getGameBasicInfo);

module.exports = router;