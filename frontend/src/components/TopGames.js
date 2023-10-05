import React, { useState, useEffect } from 'react';
import '../styles/TopGames.scss';
import { getGameBasicInfo } from '../services/games';

function generateTwitchURL(gameName) {
    const slug = gameName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return `https://www.twitch.tv/directory/category/${slug}`;
}

function TopGames({ data }) {
    const [gamesWithImages, setGamesWithImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchGameImages = async () => {
            const gamesData = await Promise.all(data.map(async (game) => {
                let imageUrl = 'https://static-cdn.jtvnw.net/ttv-static/404_boxart.jpg';
                let gameInfo;

                try {
                    gameInfo = await getGameBasicInfo(game.game);
                    imageUrl = gameInfo.data[0].box_art_url;
                } catch (error) {
                    console.log("");
                }

                return {
                    ...game,
                    imageUrl: imageUrl,
                    twitchURL: generateTwitchURL(game.game)
                };
            }));

            setGamesWithImages(gamesData);
            setIsLoading(!data.length);
        };

        fetchGameImages();
    }, [data]);

    return (
        <>
            <h1>Top Juegos</h1>
            <div className="topGames">
                {isLoading ? (
                    <p className="loader">Cargando...</p>
                ) : (
                    gamesWithImages.map((game, index) => (
                        <div key={index} className="gameItem">
                            <div className="gameImage">
                                <img src={game.imageUrl.replace('{width}', 200).replace('{height}', 300)} alt={game.game} />
                            </div>
                            <div className="gameName">
                                <a href={game.twitchURL} target="_blank" rel="noopener noreferrer">{game.game}</a>
                            </div>
                            <div className="gameValue">
                                {game.viewer_count}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
}

export default TopGames;