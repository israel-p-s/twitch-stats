const getGameBasicInfo = async (game) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_BACK_URL}/game/basicinfo/${game}`, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }

        const data = await response.json();

        return data;

    } catch (error) {
        return [];
    }
}

export { getGameBasicInfo };