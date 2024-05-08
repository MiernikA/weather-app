import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';


let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [35, 52],
    iconAnchor: [17, 52],
    popupAnchor: [0, -52]
});

L.Marker.prototype.options.icon = DefaultIcon;

function LocationMarker({ onHideInitialMarker, changeCoords }) {

    const [position, setPosition] = useState(null);
    const map = useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;


            //map can scroll inf. W/E and click on others maps on left or right will give us incorrect lng, so we need to normalize it
            let tmp_lng = lng % 360
            if (tmp_lng > 180) tmp_lng = tmp_lng - 360
            const normalized_lng = tmp_lng
            setPosition(e.latlng);
            onHideInitialMarker();
            changeCoords(lat, normalized_lng);
            map.flyTo(e.latlng);
        }
    });

    return position == null ? null : (
        <Marker position={position} />
    );
}

const Map = ({ lat, lng, changeCoords }) => {

    const [showInitialMarker, setShowInitialMarker] = useState(true);

    if (lat == null || lng == null) {
        return <div style={{ height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            Waiting for location...
        </div>;
    }

    const center = [lat, lng];
    const zoom = 13;

    return (
        <div style={{ height: '44vh', width: '100vw', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.7)' }}>
            <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {showInitialMarker && (
                    <Marker position={center} icon={DefaultIcon}>
                        <Popup>Initial location: Latitude {lat}, Longitude {lng}</Popup>
                    </Marker>
                )}
                <LocationMarker changeCoords={changeCoords} onHideInitialMarker={() => setShowInitialMarker(false)} />
            </MapContainer>
        </div>
    );
};

export default Map;
