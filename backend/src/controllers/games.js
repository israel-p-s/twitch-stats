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
        if (error.response && error.response.status === 400) {
            return res.json({
                data: [
                    {
                        id: '0',
                        name: error.config.params.login,
                        box_art_url: 'https://static-cdn.jtvnw.net/ttv-static/404_boxart.jpg',
                        igdb_id: ''
                    }
                ]
            });
        }
        res.status(500).send("getGameBasicInfo: ", error);
    }
}

module.exports = { getGameBasicInfo };