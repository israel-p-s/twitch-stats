const axios = require('axios');
const getTwitchToken = require('../config/twitch');

const getGameBasicInfo = async (req, res) => {
    const { game } = req.params;

    try {
        const token = await getTwitchToken();
        if (!token) {
            res.status(500).send("getGameBasicInfo: ERROR AL OBTENER EL TOKEN DE TWITCH");
        }
        const response = await axios.get('https://api.twitch.tv/helix/games', {
            params: {
                name: game
            },
            headers: {
                'Authorization': `Bearer ${token}`,
                'Client-Id': process.env.CLIENT_ID
            }
        });

        return res.json(response.data);

    } catch (error) {
        console.error("getGameBasicInfo: ", error);
        res.status(500).send("getGameBasicInfo: ", error);
    }
}

module.exports = { getGameBasicInfo };