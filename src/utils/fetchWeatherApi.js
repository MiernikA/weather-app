import { useState, useEffect } from 'react';

const useWeatherData = (coords) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            if (!coords.latitude || !coords.longitude) return;

            try {
                const response = await fetch(`https://weather-endpoint.vercel.app/weather/${coords.latitude}/${coords.longitude}`);
                if (response.ok) {
                    const json = await response.json();
                    setData(json);
                } else {
                    throw new Error('Network response was not ok.');
                }
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        if (coords.latitude !== null && coords.longitude !== null) {
            fetchWeatherData();
        }
    }, [coords.latitude, coords.longitude]);

    return data;
};

export default useWeatherData;
