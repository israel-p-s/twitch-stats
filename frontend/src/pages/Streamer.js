import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Streamer.scss'
import Navbar from '../components/Navbar';
import ViewerLineGraph from '../components/ViewerLineGraph';
import GamesPieGraph from '../components/GamesPieGraph';
import { getStreamerBasicInfo, getViewersGraph, getGamesGraph, getTagsGraph } from '../services/streamers';
import TagsWordCloudGraph from '../components/TagsWordCloudGraph';

function Streamer() {
    const { streamer } = useParams();
    const [streamerData, setStreamerData] = useState(null);
    const [viewerData, setViewerData] = useState([]);
    const [gameData, setGameData] = useState([]);
    const [tagsData, setTagsData] = useState([]);
    const [dayRange, setDayRange] = useState(30);

    useEffect(() => {
        const fetchData = async () => {
            const basicInfoData = await getStreamerBasicInfo(streamer);
            setStreamerData(basicInfoData.data[0]);
            const viewersGraphData = await getViewersGraph(streamer, dayRange);
            setViewerData(viewersGraphData);
            const gamesGraphData = await getGamesGraph(streamer, dayRange);
            setGameData(gamesGraphData);
            const tagsGraphData = await getTagsGraph(streamer, dayRange);
            setTagsData(tagsGraphData);
        };

        fetchData();
    }, [streamer, dayRange]);

    const changeDayRange = async (e) => {
        setViewerData([]);
        setGameData([]);
        setTagsData([]);
        setDayRange(e.target.value);
    }

    if (!streamerData || !viewerData || !gameData || !tagsData) return <p className="loader">Cargando...</p>

    return (
        <>
            <Navbar />
            <div className="streamer-container">
                <div className="row">
                    <div className="streamer-view">
                        <img src={streamerData.profile_image_url} alt={streamerData.display_name} className="streamer-image" />

                        <h1 className="streamer-name">{streamerData.display_name}</h1>

                        <p className="streamer-description">{streamerData.description}</p>

                        <div className="streamer-info">
                            <p><strong>Tipo de streamer:</strong> {streamerData.broadcaster_type}</p>
                            <p><strong>Fecha de creación:</strong> {new Date(streamerData.created_at).toLocaleDateString()}</p>
                            <a href={`https://www.twitch.tv/${streamer}`} target="_blank" rel="noopener noreferrer">▶️ VER EN TWITCH</a>
                        </div>
                    </div>
                    <div className='viewer-graph'>
                        <div className="day-range-selector">
                            <label>Mostrar datos de los últimos: </label>
                            <select value={dayRange} onChange={e => changeDayRange(e)}>
                                <option value={1}>1 día</option>
                                <option value={7}>7 días</option>
                                <option value={30}>30 días</option>
                                <option value={90}>3 meses</option>
                                <option value={365}>1 año</option>
                                <option value={100000}>Todo</option>
                            </select>
                        </div>
                        <ViewerLineGraph data={viewerData} />
                    </div>
                </div>
                <div className="row">
                    <div className="chart-container">

                        <div className="single-chart">
                            <GamesPieGraph data={gameData} />
                        </div>
                        <div className="single-chart">
                            <TagsWordCloudGraph data={tagsData} />
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Streamer;
