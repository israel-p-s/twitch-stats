import React, { useState, useEffect } from 'react';
import ReactWordcloud from 'react-wordcloud';

function TagsWordCloudGraph({ data }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(!data.length);
    }, [data]);

    const words = data.map(item => ({
        text: item.tag,
        value: item.hours
    }));

    const options = {
        rotations: 1,
        rotationAngles: [0, 90],
        fontSizes: [10, 96],
    };

    return (
        <>
            {isLoading ? (
                <p className="loader">Cargando...</p>
            ) : (
                <div>
                    <h1>Tags más usados - Horas</h1>
                    <div className="wordcloud-tooltip"></div>
                    <ReactWordcloud words={words} options={options} />
                </div>

            )}
        </>
    );
}

export default TagsWordCloudGraph;