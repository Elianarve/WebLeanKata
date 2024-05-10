import { useState } from 'react';
import '../searchBar/SearchBar.css';


const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value); 
  };
  return (
    <div className="search-bar">
      <input className='search-bar-input'
        type="text"
        placeholder="Buscar por ID o Nombre..."
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};
export default SearchBar;