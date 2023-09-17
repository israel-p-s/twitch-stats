const { Router } = require('express');
const router = Router();
const { searchStreamer, getStreamerBasicInfo, getViewersGraph, getGamesGraph, getTagsGraph } = require('../controllers/streamers')

router.post('/search', searchStreamer);
router.get('/streamer/basicinfo/:streamer', getStreamerBasicInfo);
router.post('/streamer/viewersgraph/:streamer', getViewersGraph);
router.post('/streamer/gamesgraph/:streamer', getGamesGraph);
router.post('/streamer/tagsgraph/:streamer', getTagsGraph);

module.exports = router;