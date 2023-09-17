const axios = require('axios');

async function getTwitchToken() {
    const data = {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: 'client_credentials'
    };

    try {
        const response = await axios.post('https://id.twitch.tv/oauth2/token', data);
        return response.data.access_token;

    } catch (error) {
        console.log("* ERROR OBTENIENDO EL TOKEN DE TWITCH: ", error.message);
        return null;
    }
}

module.exports = getTwitchToken;