import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'


const Map = ({data}) => {
  const [userLocation, setUserLocation] = useState( [51.505, -0.10]);
  const [error, setError] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
      },
      (error) => {
        console.error('Error getting user location:', error);
        setError('Error getting user location.');
      }
    );
  }, []);

  const markers = data?.map((item,index)=>{
    const [lat,long] = item.geometry[0].coordinates
    return <Marker  key={index} position={[lat,long]}> 
    <Popup className={styles.p}>
      <h5>{item.title}</h5>
      <p>{item.description}</p>
      <a href={item.link}>link</a>
  </Popup>
  </Marker>
      
  } )
  return (
    <div >
     <MapContainer  className={styles.map} center={userLocation} zoom={13} scrollWheelZoom={true}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {markers}
  </MapContainer>
  {error && <p className={styles.error}>{error}</p>}
    </div>
  )
}

export default Map