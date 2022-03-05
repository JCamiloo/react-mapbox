import { useEffect, useReducer } from 'react';
import { PlacesContext } from './PlacesContext';
import { placesReducer } from './placesReducer';
import { getUserLocation } from '../../helpers/getUserLocation';
import { searchApi } from '../../apis/';

export interface PlacesState {
  isLoading: boolean;
  userLocation?: [number, number];
}

const INITIAL_STATE: PlacesState = {
  isLoading: true,
  userLocation: undefined
}

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const PlacesProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);

  useEffect(() => {
    getUserLocation()
      .then(coords => dispatch({
        type: 'setUserLocation', 
        payload: coords
    }))
  }, []);

  const searchPlacesByTerm = async (query: string) => {
    if (query.length === 0 || !state.userLocation) {
      return [];
    }

    const response = await searchApi.get(`/${query}.json`, {
      params: {
        proximity: state.userLocation.join(',')
      }
    })

    console.log(response.data);
  }

  return (
    <PlacesContext.Provider value={{
      ...state,
      searchPlacesByTerm
    }}>
      { children }
    </PlacesContext.Provider>
  )
}
