import React from 'react';
import ReactDOM from 'react-dom';
import { MapsApp } from './MapsApp';

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
