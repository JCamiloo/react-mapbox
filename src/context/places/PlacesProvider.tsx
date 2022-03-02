import { PlacesContext } from './PlacesContext';

export interface PlacesState {
  isLoading: boolean;
  userLocation?: [number, number];
}

const INITAL_STATE: PlacesState = {
  isLoading: true,
  userLocation: undefined
}

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const PlacesProvider = ({ children }: Props) => {
  return (
    <PlacesContext.Provider value={{
      isLoading: true,
      userLocation: undefined
    }}>
      { children }
    </PlacesContext.Provider>
  )
}
