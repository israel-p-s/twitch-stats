import React, { useEffect, useState } from 'react';
import { getTotalViewersGraph, getTotalTagsGraph, getTotalLanguagesGraph, getTopStreamersGraph, getTopGamesGraph } from '../services/home';
import ViewerLineGraph from '../components/ViewerLineGraph';
import TagsWordCloudGraph from '../components/TagsWordCloudGraph';
import LanguagesBarGraph from '../components/LanguagesBarGraph';
import TopStreamers from '../components/TopStreamers'
import TopGames from '../components/TopGames'


import Navbar from "../components/Navbar"
import '../styles/Home.scss'

function Home() {

    const [totalViewerData, setTotalViewerData] = useState([]);
    const [dayRange, setDayRange] = useState(7);
    const [tagsData, setTagsData] = useState([]);
    const [languagesData, setLanguagesData] = useState([]);
    const [topStreamersData, setTopStreamersData] = useState([]);
    const [topGamesData, setTopGamesData] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            const totalViewerGraphData = await getTotalViewersGraph(dayRange);
            setTotalViewerData(totalViewerGraphData);
            const topStreamersGraphData = await getTopStreamersGraph(dayRange);
            setTopStreamersData(topStreamersGraphData);
            const topGamesGraphData = await getTopGamesGraph(dayRange);
            setTopGamesData(topGamesGraphData);
            const languagesGraphData = await getTotalLanguagesGraph(dayRange);
            setLanguagesData(languagesGraphData);
            const tagsGraphData = await getTotalTagsGraph(dayRange);
            setTagsData(tagsGraphData);
        };

        fetchData();
    }, [dayRange]);

    const changeDayRange = async (e) => {
        setTotalViewerData([]);
        setTopStreamersData([]);
        setTopGamesData([]);
        setTagsData([]);
        setLanguagesData([]);
        setDayRange(e.target.value);
    }

    return (
        <>
            <Navbar></Navbar>
            <div className="home-container">
                <div className="row">
                    <div className='viewer-graph'>
                        <div className="day-range-selector">
                            <label>Mostrar datos de los últimos (test): </label>
                            <select value={dayRange} onChange={e => changeDayRange(e)}>
                                <option value={1}>1 día</option>
                                <option value={7}>7 días</option>
                                <option value={30}>30 días</option>
                                <option value={90}>3 meses</option>
                                <option value={365}>1 año</option>
                                <option value={100000}>Todo</option>
                            </select>
                        </div>
                        <ViewerLineGraph data={totalViewerData} />
                    </div>
                </div>
                <div className="row">
                    <div className="chart-container">

                        <div className="single-chart">
                            <TopStreamers data={topStreamersData} />

                        </div>

                        <div className="single-chart">
                            <TopGames data={topGamesData} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="chart-container">
                        <div className="single-chart">
                            <LanguagesBarGraph data={languagesData} />
                        </div>
                        <div className="single-chart">
                            <TagsWordCloudGraph data={tagsData} />
                        </div>


                    </div>
                </div>
            </div>
        </>

    )
}

export default Home;