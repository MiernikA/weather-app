import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Switch from '@mui/material/Switch';
import WeatherTile from './WeatherTile';
import Map from './Map';
import { StyledCard } from '../constants/ComponentStyles';
import useWeatherData from '../utils/fetchWeatherApi';


function Main() {

    const [coords, setCoords] = useState({ latitude: null, longitude: null });
    const [mode, setMode] = useState(1);

    const data = useWeatherData(coords);

    useEffect(() => {
        const getDefaultLocation = () => {
            setCoords({ latitude: 50, longitude: 50 });
        };

        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setCoords({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        });
                    },
                    getDefaultLocation,
                    { timeout: 5000 }
                );
            } else {
                console.log("Geolocation is not supported by this browser.");
                getDefaultLocation();
            }
        };

        getLocation();
    }, []);


    const changeCoords = (lat, long) => {
        setCoords({ latitude: lat, longitude: long });
    };

    const changeMode = () => {
        if (mode === 1) document.body.classList.add('dark-mode');
        else document.body.classList.remove('dark-mode');
        setMode(mode === 1 ? 0 : 1);
    };

    const renderWeatherData = () => {
        if (data && data.date) {
            return data.date.map((date, index) => (
                <StyledCard key={index} mode={mode === 1}>
                    <WeatherTile content={data} index={index} />
                </StyledCard>
            ));
        } else {
            return <p>Loading data...</p>;
        }
    };

    return (
        <div>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', overflowX: 'auto', width: '100%', padding: 2 }}>
                {renderWeatherData()}
            </Box>
            <Map lat={coords.latitude} lng={coords.longitude} changeCoords={changeCoords} />
            <span style={{marginRight:'0.5vw'}}>Dark mode: <Switch onClick={changeMode} /><span/>
        </div>
    );
}

export default Main;
