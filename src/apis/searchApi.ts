import axios from 'axios';

export const searchApi = axios.create({
  baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
  params: {
    limit: 5,
    language: 'es',
    access_token: process.env.REACT_APP_MAPBOX_KEY
  }
})