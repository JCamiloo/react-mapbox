import { useReducer, useContext, useEffect } from 'react';
import { AnySourceData, LngLatBounds, Map, Marker, Popup } from 'mapbox-gl';
import { mapReducer } from './mapReducer';
import { PlacesContext, MapContext } from '../';
import { directionsApi } from '../../apis/directionsApi';
import { DirectionsResponse } from '../../interfaces/directions.response';

export interface MapState {
  isMapReady: boolean;
  map?: Map;
  markers: Marker[];
}

const INITIAL_STATE: MapState = {
  isMapReady: false,
  map: undefined,
  markers: []
}

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const MapProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);
  const { places } = useContext(PlacesContext);

  useEffect(() => {
    state.markers.forEach(marker => marker.remove());

    const newMarkers: Marker[] = [];

    for (const place of places) {
      const [longitude, latitude] = place.center;
      const popup = new Popup()
        .setHTML(`
          <h6> ${ place.text_es } <h6/>
          <p> ${ place.place_name_es }</p>
        `);

      const newMarker = new Marker()
        .setPopup(popup)
        .setLngLat([ longitude, latitude ])
        .addTo(state.map!);

      newMarkers.push(newMarker);
    }
    dispatch({ type: 'setMarkers', payload: newMarkers });
  }, [places])

  const setMap = (map: Map) => {
    new Marker({
      color: '#61DAFB'
    }).setLngLat(map.getCenter())
      .addTo(map);

    dispatch({ type: 'setMap', payload: map });
  }

  const getRouteBetweenPoints = async (start: [number, number], end: [number, number]) => {
    const response = await directionsApi.get<DirectionsResponse>(`/${start.join(',')};${end.join(',')}`);
    const { geometry } = response.data.routes[0];
    const { coordinates } = geometry;
    const bounds = new LngLatBounds(start, start);

    for (const coordinate of coordinates) {
      const newCoord: [number, number] = [coordinate[0], coordinate[1]];
      bounds.extend(newCoord);
    }

    state.map?.fitBounds(bounds, {
      padding: 200
    });

    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates
            }
          }
        ]
      }
    }

    if (state.map?.getLayer('RouteString')) {
      state.map.removeLayer('RouteString');
      state.map.removeSource('RouteString');
    }

    state.map?.addSource('RouteString', sourceData);

    state.map?.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
        'line-color': 'black',
        'line-width': 3
      }
    });
  }

  return (
    <MapContext.Provider value={{
      ...state,
      setMap,
      getRouteBetweenPoints
    }}>
      { children }
    </MapContext.Provider>
  )
}
