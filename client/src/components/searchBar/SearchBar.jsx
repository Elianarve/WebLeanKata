import { useState } from 'react';
import './SearchBar.css'

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value); 
  };
  return (
      <input className="search-bar" placeholder="Buscar por ID o Nombre..." value={searchTerm} onChange={handleSearch}/>
  );
};

export default SearchBar;