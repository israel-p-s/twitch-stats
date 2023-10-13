import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import '../styles/TopStreamers.scss';
import { getStreamerBasicInfo } from '../services/streamers'; 

function TopStreamers({ data }) {
    const [streamersWithImages, setStreamersWithImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStreamerImages = async () => {
            const streamersData = await Promise.all(data.map(async (streamer) => {
                const streamerInfo = await getStreamerBasicInfo(streamer.streamer);
                return {
                    ...streamer,
                    imageUrl: streamerInfo.data[0].profile_image_url
                };
            }));

            setStreamersWithImages(streamersData);
            setIsLoading(!data.length);
        };

        fetchStreamerImages();
    }, [data]);

    return (
        <>
            <h1>Top Streamers - Espectadores en el minuto de oro</h1>
            <div className="topStreamers">
                {isLoading ? (
                    <p className="loader">Cargando...</p>
                ) : (

                    streamersWithImages.map((streamer, index) => (
                        <div key={index} className="streamerItem">
                            <div className="streamerImage">
                                <img src={streamer.imageUrl} alt={streamer.streamer} />
                            </div>
                            <div className="streamerUserName">
                                <Link to={`/streamer/${streamer.streamer}`}>
                                    {streamer.streamer}
                                </Link>
                            </div>
                            <div className="streamerValue">
                                {new Intl.NumberFormat('es-ES', { style: 'decimal' }).format(streamer.viewer_count)}
                            </div>
                        </div>
                    )))}
            </div>
        </>
    );
}

export default TopStreamers;