import { useState } from 'react';
const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value); 
  };
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};
export default SearchBar;