import { useContext } from 'react';
import { MapContext, PlacesContext } from '../context';

export const LocationButton = () => {
  const { map, isMapReady } = useContext(MapContext);
  const { userLocation } = useContext(PlacesContext);

  const flyToLocation = () => {
    if (!isMapReady || !userLocation) {
      return;
    }

    map?.flyTo({
      zoom: 14,
      center: userLocation
    })
  }

  return (
    <button
      className="btn btn-primary"
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 10
      }}
      onClick={flyToLocation}
    >
      My Location
    </button>
  )
}
