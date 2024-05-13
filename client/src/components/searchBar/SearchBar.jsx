import { useState } from 'react';
import './SearchBar.css'

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value); 
  };
  return (
  <>
    <div>
      <input
        placeholder="Buscar..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-bar"
      />
    </div>
  </>
  );
};
export default SearchBar;