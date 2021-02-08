import React, { useState , useEffect  } from 'react'
import './Map.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

function Map({ countryPosition , name }) {
    const [ position , setPosition ] = useState(countryPosition)
    useEffect(() => {
        setPosition(countryPosition)
    }, [countryPosition])

    console.log('position =>>' , position)
    return (
        <div style={{width: '100%' , height:'100%'}}>
        {position?.length ?  <MapContainer center={[position[0] , position[1]]} zoom={3} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[position[0], position[1]]}>
                <Popup>
                   { name }
                </Popup>
            </Marker>
        </MapContainer> : null}
        </div>
    )
} ;

export default Map ;