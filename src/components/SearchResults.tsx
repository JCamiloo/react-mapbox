import { useContext } from 'react';
import { PlacesContext } from '../context/places/PlacesContext';
import { LoadingPlaces } from './LoadingPlaces';

export const SearchResults = () => {
  const { places, isLoadingPlaces } = useContext(PlacesContext);

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
            className="list-group-item list-group-item-action"
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
    
            <button className="btn btn-outline-primary">
              Direcciones
            </button>
          </li>
        ))
      }
    </ul>
  )
}
