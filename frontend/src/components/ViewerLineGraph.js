import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { registerables } from 'chart.js'; 
import 'chartjs-adapter-date-fns';

import { Chart as ChartJS } from 'chart.js';
ChartJS.register(...registerables);

function ViewerLineGraph({ data }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(!data.length);
    }, [data]);

    function processGraphData(inputData) {
        let processedData = [];
        for (let i = 0; i < inputData.length; i++) {
            if (i > 0 && (new Date(inputData[i].timestamp) - new Date(inputData[i - 1].timestamp)) > (15 * 60 * 1000)) {
                processedData.push({
                    timestamp: inputData[i].timestamp,
                    viewer_count: null
                });
            }
            processedData.push(inputData[i]);
        }
        return processedData;
    }

    const modifiedData = processGraphData(data);

    const chartData = {
        labels: modifiedData.map(d => new Date(d.timestamp)),
        datasets: [
            {
                label: 'Viewers',
                data: modifiedData.map(d => d.viewer_count),
                borderColor: 'rgba(101,23,189,1)',
                fill: false,
            }
        ],
    };

    const options = {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day',
                    displayFormats: {
                        day: 'MMM d'
                    }
                },
            },
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            filler: {
                propagate: false
            },
            tooltip: {
                callbacks: {
                    title: function (context) {
                        const index = context[0].dataIndex;
                        const date = new Date(data[index].timestamp);
                        return `Fecha: ${date.toLocaleString()}`;
                    },
                    label: function (context) {
                        const viewers = context.parsed.y;
                        return `Espectadores: ${viewers}`;
                    },
                    footer: function (context) {
                        const index = context[0].dataIndex;
                        const game = data[index].game_name;
                        const title = data[index].title;

                        let footerLines = [];

                        if (game) {
                            footerLines.push(`Juego: ${game}`);
                        }

                        if (title) {
                            footerLines.push(`Título: ${title}`);
                        }

                        return footerLines;
                    }
                }
            },
            legend: {
                display: false
            },
            title: {
                display: true,
                font: {
                    size: 16,
                    weight: 'bold'
                },
                padding: {
                    top: 10,
                    bottom: 30
                }
            }
        }
    };

    return (
        <>
            {isLoading ? (
                <p className="loader">Cargando...</p>
            ) : (
                <>
                    <h1>Espectadores</h1>
                    <Line data={chartData} options={options} />
                </>
            )}
        </>
    );

}

export default ViewerLineGraph;