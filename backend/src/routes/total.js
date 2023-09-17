const { Router } = require('express');
const router = Router();
const { getTotalViewersGraph, getTotalTagsGraph, getTotalLanguagesGraph, getTopStreamersGraph, getTopGamesGraph } = require('../controllers/total')

router.post('/total/viewersgraph', getTotalViewersGraph);
router.post('/total/topstreamersgraph', getTopStreamersGraph);
router.post('/total/topgamesgraph', getTopGamesGraph);
router.post('/total/languagesgraph', getTotalLanguagesGraph);
router.post('/total/tagsgraph', getTotalTagsGraph);

module.exports = router;