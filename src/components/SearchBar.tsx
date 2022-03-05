import { ChangeEvent, useRef, useContext } from 'react';
import { PlacesContext } from '../context';

export const SearchBar = () => {
  const debounceRef = useRef<NodeJS.Timeout>();
  const { searchPlacesByTerm } = useContext(PlacesContext)

  const onQueryChanged = (event: ChangeEvent<HTMLInputElement>) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      searchPlacesByTerm(event.target.value);
    }, 500);
  }
  
  return (
    <div className="search-container">
      <input
        type="text"
        className="form-control"
        placeholder="Search place"
        onChange={onQueryChanged}

      />
    </div>
  )
}
