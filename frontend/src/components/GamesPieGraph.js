import { Pie } from 'react-chartjs-2';
import React, { useState, useEffect } from 'react';

function GamesPieChart({ data }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(!data.length);
    }, [data]);

    const gameNames = data.map(d => d.game);
    const gameHours = data.map(d => d.hours);

    const chartData = {
        labels: gameNames,
        datasets: [{
            data: gameHours,
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#FF6F61',
                '#46BFBD',
                '#F7464A',
                '#949FB1',
                '#4D5360',
                '#AC64AD',
                '#FF9F40',
                '#7AD9FF',
                '#FFD700',
                '#39E600',
                '#FF7373',
                '#6699FF',
                '#5A009D',
                '#B366FF',
                '#4CAF50',
                '#FFC107',
                '#009688'
            ]
        }]
    };

    return (
        <>
            {isLoading ? (
                <p className="loader">Cargando...</p>
            ) : (
                <>
                    <h1>Juegos más jugados</h1>
                    <Pie data={chartData} />
                </>
            )}
        </>
    );
}

export default GamesPieChart;