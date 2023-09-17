const fetchSuggestions = async (searchTerm) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_BACK_URL}/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: searchTerm })
        });

        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }

        const data = await response.json();

        return data;

    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

const getStreamerBasicInfo = async (streamer) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_BACK_URL}/streamer/basicinfo/${streamer}`, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }

        const data = await response.json();

        return data;

    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

const getViewersGraph = async (streamer, dayRange) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_BACK_URL}/streamer/viewersgraph/${streamer}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                dayRange: dayRange
            })
        });

        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }

        const data = await response.json();

        return data;

    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

const getGamesGraph = async (streamer, dayRange) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_BACK_URL}/streamer/gamesgraph/${streamer}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                dayRange: dayRange
            })
        });

        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }

        const data = await response.json();

        return data;

    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

const getTagsGraph = async (streamer, dayRange) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_BACK_URL}/streamer/tagsgraph/${streamer}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                dayRange: dayRange
            })
        });

        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }

        const data = await response.json();


        return data;

    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}
export { fetchSuggestions, getStreamerBasicInfo, getViewersGraph, getGamesGraph, getTagsGraph };