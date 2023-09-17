const Stream = require('../models/Stream');

const getTotalViewersGraph = async (req, res) => {
    const { dayRange } = req.body;
    try {
        const today = new Date();
        const range = new Date();
        range.setDate(today.getDate() - dayRange);
        const aggregation = [
            {
                $match: {
                    timestamp: { $gte: range, $lte: today }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$timestamp" },
                        month: { $month: "$timestamp" },
                        day: { $dayOfMonth: "$timestamp" },
                        hour: { $hour: "$timestamp" },
                        interval: {
                            $floor: {
                                $divide: [{ $minute: "$timestamp" }, 15]
                            }
                        }
                    },
                    totalViewers: { $sum: "$viewer_count" },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1,
                    "_id.day": 1,
                    "_id.hour": 1,
                    "_id.interval": 1
                }
            }
        ];
        const data = await Stream.aggregate(aggregation);
        const result = data.map(entry => {
            return {
                timestamp: new Date(entry._id.year, entry._id.month - 1, entry._id.day, entry._id.hour, entry._id.interval * 15),
                viewer_count: entry.totalViewers
            };
        });
        res.json(result);

    } catch (error) {
        res.status(500).send("getTotalViewersGraph: ", error);
    }
};

const getTotalTagsGraph = async (req, res) => {
    const { dayRange } = req.body;
    try {
        const today = new Date();
        const range = new Date();
        range.setDate(today.getDate() - dayRange);
        const streams = await Stream.aggregate([
            { $match: { timestamp: { $gte: range, $lte: today } } },
            { $sample: { size: 10000 } }
        ]);
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
        res.status(500).send("getTotalTagsGraph: ", error);
    }
};

const getTotalLanguagesGraph = async (req, res) => {
    const { dayRange } = req.body;
    try {
        const today = new Date();
        const range = new Date();
        range.setDate(today.getDate() - dayRange);
        const streams = await Stream.aggregate([
            { $match: { timestamp: { $gte: range, $lte: today } } },
            { $sample: { size: 10000 } }
        ]);
        const streamsGrouped = streams.reduce((accumulated, current) => {
            if (!accumulated[current.id]) {
                accumulated[current.id] = [];
            }
            accumulated[current.id].push(current);
            return accumulated;
        }, {});
        let languageDurations = {};
        for (const [streamId, streamData] of Object.entries(streamsGrouped)) {
            let previousTimestamp = new Date(streamData[0].started_at);
            for (let i = 0; i < streamData.length; i++) {
                const currentStream = streamData[i];
                const language = currentStream.language;
                let currentTimestamp;
                if (i === streamData.length - 1) {
                    currentTimestamp = new Date(currentStream.timestamp);
                } else {
                    currentTimestamp = new Date(streamData[i + 1].timestamp);
                }
                const duration = currentTimestamp - previousTimestamp;
                if (!languageDurations[language]) {
                    languageDurations[language] = 0;
                }
                languageDurations[language] += duration;

                previousTimestamp = currentTimestamp;
            }
        }
        const result = [];
        for (const [language, durationMs] of Object.entries(languageDurations)) {
            result.push({
                language: language,
                hours: parseFloat((durationMs / (1000 * 60 * 60)).toFixed(2))
            });
        }
        res.json(result);

    } catch (error) {
        res.status(500).send("getTotalLanguagesGraph: ", error);
    }
};

const getTopStreamersGraph = async (req, res) => {
    const { dayRange } = req.body;
    try {
        const today = new Date();
        const range = new Date();
        range.setDate(today.getDate() - dayRange);
        const topStreamers = await Stream.aggregate([
            {
                $match: {
                    timestamp: { $gte: range, $lte: today }
                }
            },
            {
                $group: {
                    _id: "$user_name",
                    maxViewers: { $max: "$viewer_count" },
                }
            },
            {
                $sort: { maxViewers: -1 }
            },
            {
                $limit: 10
            }
        ]);
        const result = topStreamers.map(item => ({
            streamer: item._id,
            viewer_count: item.maxViewers
        }));
        res.json(result);

    } catch (error) {
        res.status(500).send("getTopStreamersGraph: ", error);
    }
};

const getTopGamesGraph = async (req, res) => {
    const { dayRange } = req.body;
    try {
        const today = new Date();
        const range = new Date();
        range.setDate(today.getDate() - dayRange);
        const topGames = await Stream.aggregate([
            {
                $match: {
                    timestamp: { $gte: range, $lte: today }
                }
            },
            {
                $group: {
                    _id: "$game_name",
                    maxViewers: { $max: "$viewer_count" },
                }
            },
            {
                $sort: { maxViewers: -1 }
            },
            {
                $limit: 10
            }
        ]);
        const result = topGames.map(item => ({
            game: item._id,
            viewer_count: item.maxViewers
        }));

        res.json(result);

    } catch (error) {
        res.status(500).send("getTopGamesGraph: ", error);
    }
}


module.exports = { getTotalViewersGraph, getTotalTagsGraph, getTotalLanguagesGraph, getTopStreamersGraph, getTopGamesGraph };