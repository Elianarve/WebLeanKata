import { useState } from 'react';
<<<<<<< HEAD

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

=======
const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
>>>>>>> feature-chatbot
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value); 
  };
<<<<<<< HEAD

=======
>>>>>>> feature-chatbot
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
<<<<<<< HEAD

=======
>>>>>>> feature-chatbot
export default SearchBar;