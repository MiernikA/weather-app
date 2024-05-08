import React from 'react';
import { CardContent } from '@mui/material';
import { weekDayShortcuts, weatherIcons, max_temp_icon, min_temp_icon } from '../constants/index.js';
import { Header, TemperatureHolder } from '../constants/ComponentStyles.js';

function WeatherTile({ content, index }) {

    const weekDay = (date) => {
        const d = new Date(date);
        return weekDayShortcuts[d.getDay()];
    };

    const dateFormat = (date) => {
        const d = date.split('-');
        const newFormat = d[2] + '/' + d[1] + '/' + d[0];
        return newFormat;
    };


    return (
        <CardContent>

            <div >
                <Header>
                    <div>
                        <h1>{weekDay(content.date[index])}</h1>
                        <p style={{ fontSize: '18px' }}>{dateFormat(content.date[index])}</p>
                    </div>

                    {weatherIcons[content.weather_code[index]]}
                </Header>


                <hr />

                <TemperatureHolder>{max_temp_icon} <span style={{ marginLeft: '1vw', fontWeight: '600' }}>{content.max_temp[index]} °C</span></TemperatureHolder>
                <TemperatureHolder>{min_temp_icon} <span style={{ marginLeft: '1vw', fontWeight: '600' }}>{content.min_temp[index]} °C</span></TemperatureHolder>
                <p style={{ fontSize: '18px', marginTop: '3vh', lineHeight: '3vh' }}>Estimated Energy: <br /><b>{content.estimated_energy[index]} kWh</b></p>
            </div>
        </CardContent>
    );
}

export default WeatherTile;
