import { useState } from 'react';
import './SearchBar.css'

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value); 
  };
  return (
    <div>
      <input placeholder="Estado actual y reto" value={searchTerm} onChange={handleSearch} className="search-bar"/>
    </div>
  );
};
export default SearchBar;