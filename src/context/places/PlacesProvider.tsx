import { useEffect, useReducer } from 'react';
import { PlacesContext } from './PlacesContext';
import { placesReducer } from './placesReducer';
import { getUserLocation } from '../../helpers/getUserLocation';
import { PlacesResponse, Feature } from '../../interfaces/places.response';
import { searchApi } from '../../apis/';

export interface PlacesState {
  isLoading: boolean;
  userLocation?: [number, number];
  isLoadingPlaces: boolean;
  activePlaceId: string;
  places: Feature[]
}

const INITIAL_STATE: PlacesState = {
  isLoading: true,
  userLocation: undefined,
  isLoadingPlaces: false,
  activePlaceId: '',
  places: []
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
    if (!state.userLocation) {
      throw new Error('There is not location available');
    }

    if (query.length === 0) {
      dispatch({ type: 'setPlaces', payload: [] });
      return [];
    }

    dispatch({ type: 'setLoadingPlaces' });

    const response = await searchApi.get<PlacesResponse>(`/${query}.json`, {
      params: {
        proximity: state.userLocation.join(',')
      }
    });

    dispatch({ type: 'setPlaces', payload: response.data.features });

    return response.data.features;
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
