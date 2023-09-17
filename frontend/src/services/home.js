const getTotalViewersGraph = async (dayRange) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_BACK_URL}/total/viewersgraph`, {
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

const getTopStreamersGraph = async (dayRange) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_BACK_URL}/total/topstreamersgraph`, {
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

const getTopGamesGraph = async (dayRange) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_BACK_URL}/total/topgamesgraph`, {
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

const getTotalTagsGraph = async (dayRange) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_BACK_URL}/total/tagsgraph`, {
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

const getTotalLanguagesGraph = async (dayRange) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_BACK_URL}/total/languagesgraph`, {
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

export { getTotalViewersGraph, getTopStreamersGraph, getTotalTagsGraph, getTotalLanguagesGraph, getTopGamesGraph };