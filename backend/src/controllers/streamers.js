const axios = require('axios');
const Stream = require('../models/Stream');
const getTwitchToken = require('../config/twitch');

const searchStreamer = async (req, res) => {
    const { query } = req.body;

    try {
        if (query.length >= 3) {
            const pipeline = [
                {
                    $match: {
                        user_name: new RegExp(query, 'i')
                    }
                },
                {
                    $group: {
                        _id: "$user_name"
                    }
                },
                {
                    $limit: 3
                }
            ];
            const aggregatedResults = await Stream.aggregate(pipeline);
            const streamerNames = aggregatedResults.map(result => result._id);
            return res.json(streamerNames);

        } else {
            return res.json([]);
        }

    } catch (error) {
        res.status(500).send("searchStreamer: ", error);
    }
};

const getStreamerBasicInfo = async (req, res) => {
    const { streamer } = req.params;

    try {
        const token = await getTwitchToken();
        if (!token) {
            res.status(500).send("getStreamerBasicInfo: ERROR AL OBTENER EL TOKEN DE TWITCH");
        }
        const response = await axios.get('https://api.twitch.tv/helix/users', {
            params: {
                login: streamer
            },
            headers: {
                'Authorization': `Bearer ${token}`,
                'Client-Id': process.env.CLIENT_ID
            }
        });

        return res.json(response.data);

    } catch (error) {
        if (error.response && error.response.status === 400) {
            return res.json({
                data: [
                    {
                        id: '0',
                        name: error.config.params.login,
                        profile_image_url: 'https://static-cdn.jtvnw.net/ttv-static/404_boxart.jpg',
                        igdb_id: ''
                    }
                ]
            });
        }
        res.status(500).send("getStreamerBasicInfo: ", error);
    }
}

const getViewersGraph = async (req, res) => {
    const { dayRange } = req.body;
    const { streamer } = req.params;

    try {
        const today = new Date();
        const range = new Date();
        range.setDate(today.getDate() - dayRange);

        const data = await Stream.find({
            user_name: streamer,
            timestamp: { $gte: range, $lte: today }
        });
        res.json(data);

    } catch (error) {
        res.status(500).send("getViewersGraph: ", error);
    }
};

const getGamesGraph = async (req, res) => {
    const { dayRange } = req.body;
    const { streamer } = req.params;

    try {
        const today = new Date();
        const range = new Date();
        range.setDate(today.getDate() - dayRange);
        const streams = await Stream.find({
            user_name: streamer,
            timestamp: { $gte: range, $lte: today }
        }).sort({ timestamp: 1 });
        const streamsGrouped = streams.reduce((accumulated, current) => {
            if (!accumulated[current.id]) {
                accumulated[current.id] = [];
            }
            accumulated[current.id].push(current);
            return accumulated;
        }, {});
        let gameDurations = {};
        for (const [streamId, streamData] of Object.entries(streamsGrouped)) {
            let previousTimestamp = new Date(streamData[0].started_at);
            for (let i = 0; i < streamData.length; i++) {
                const currentStream = streamData[i];
                const gameName = currentStream.game_name;
                if (!gameDurations[gameName]) {
                    gameDurations[gameName] = 0;
                }
                let currentTimestamp;
                if (i === streamData.length - 1) {
                    currentTimestamp = new Date(currentStream.timestamp);
                } else {
                    currentTimestamp = new Date(streamData[i + 1].timestamp);
                }
                const duration = currentTimestamp - previousTimestamp;
                gameDurations[gameName] += duration;
                previousTimestamp = currentTimestamp;
            }
        }
        const result = [];
        for (const [gameName, durationMs] of Object.entries(gameDurations)) {
            result.push({
                game: gameName,
                hours: parseFloat((durationMs / (1000 * 60 * 60)).toFixed(2))
            });
        }
        res.json(result);
    } catch (error) {
        res.status(500).send("getGamesGraph: ", error);
    }
};

const getTagsGraph = async (req, res) => {
    const { dayRange } = req.body;
    const { streamer } = req.params;

    try {
        const today = new Date();
        const range = new Date();
        range.setDate(today.getDate() - dayRange);

        const streams = await Stream.find({
            user_name: streamer,
            timestamp: { $gte: range, $lte: today }
        }).sort({ timestamp: 1 });
        const streamsGrouped = streams.reduce((accumulated, current) => {
            if (!accumulated[current.id]) {
                accumulated[current.id] = [];
            }
            accumulated[current.id].push(current);
            return accumulated;
        }, {});
        let tagDurations = {};
        for (const [streamId, streamData] of Object.entries(streamsGrouped)) {
            let previousTimestamp = new Date(streamData[0].started_at);
            for (let i = 0; i < streamData.length; i++) {
                const currentStream = streamData[i];
                const tagsArray = currentStream.tags || [];
                let currentTimestamp;
                if (i === streamData.length - 1) {
                    currentTimestamp = new Date(currentStream.timestamp);
                } else {
                    currentTimestamp = new Date(streamData[i + 1].timestamp);
                }
                const duration = currentTimestamp - previousTimestamp;
                tagsArray.forEach(tag => {
                    if (!tagDurations[tag]) {
                        tagDurations[tag] = 0;
                    }
                    tagDurations[tag] += duration / tagsArray.length;
                });
                previousTimestamp = currentTimestamp;
            }
        }
        const result = [];
        for (const [tagName, durationMs] of Object.entries(tagDurations)) {
            result.push({
                tag: tagName,
                hours: parseFloat((durationMs / (1000 * 60 * 60)).toFixed(2))
            });
        }
        res.json(result);

    } catch (error) {
        res.status(500).send("getTagsGraph: ", error);
    }
};

module.exports = { searchStreamer, getStreamerBasicInfo, getViewersGraph, getGamesGraph, getTagsGraph };