import { useState } from 'react';
import axios from 'axios';

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://tu-backend.com/buscar?texto=${searchText}`);
      setSearchResults(response.data);
      onSearch(response.data); // Llama a la función onSearch pasándole los resultados
    } catch (error) {
      console.error('Error al buscar:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>
      <ul>
        {searchResults.map(result => (
          <li key={result.id}>{result.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;