import React from 'react';
import ReactDOM from 'react-dom';
import { MapsApp } from './MapsApp';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiamNhbWlsb28iLCJhIjoiY2s2NDZiaDdxMGM3aTNqbXBtMnk3ZmQ5biJ9.bLy1nepm5WTdN8sqWiNd0w';

if (!navigator.geolocation) {
  alert('Geolocation required');
  throw new Error('Geolocation required');
}

ReactDOM.render(
  <React.StrictMode>
    <MapsApp />
  </React.StrictMode>,
  document.getElementById('root')
);
