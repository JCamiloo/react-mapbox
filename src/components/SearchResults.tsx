import { useContext } from 'react';
import { PlacesContext, MapContext } from '../context';
import { LoadingPlaces } from './LoadingPlaces';
import { Feature } from '../interfaces/places.response';

export const SearchResults = () => {
  const { places, isLoadingPlaces, userLocation } = useContext(PlacesContext);
  const { map, getRouteBetweenPoints } = useContext(MapContext);

  const onPlaceClicked = (place: Feature) => {
    const [ longitud, latitud ] = place.center;
    map?.flyTo({
      zoom: 14,
      center:[ longitud, latitud ]
    })
  }

  const getRoute = (place: Feature) => {
    if (!userLocation) {
      return;
    }

    const [longitude, latitude] = place.center;
    getRouteBetweenPoints(userLocation, [longitude, latitude]);
  }

  if (isLoadingPlaces) {
    return (
      <LoadingPlaces/>
    );
  }

  if (places.length === 0) {
    return <></>
  }

  return (
    <ul className="list-group mt-3">
      {
        places.map(place => (
          <li
            key={ place.id }
            className="list-group-item list-group-item-action pointer"
            onClick={() => onPlaceClicked(place)}
          >
            <h6> { place.text_es} </h6>
    
            <p
              className="text-muted"
              style={{
                fontSize: '12px'
              }}
            >
              { place.place_name }
            </p>
    
            <button
              onClick={() => getRoute(place)}
              className="btn btn-outline-primary"
            >
              Direcciones
            </button>
          </li>
        ))
      }
    </ul>
  )
}
