import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css"; // Importa el archivo CSS

function SearchBar() {
  const [challenges, setChallenges] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredChallenges, setFilteredChallenges] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/challenges").then((response) => {
      setChallenges(response.data);
    });
  }, []);

  useEffect(() => {
    setFilteredChallenges(
      challenges.filter((challenge) =>
        challenge.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, challenges]);

  return (
    <div>
      <input
        className="search-bar" // Aplica la clase de estilo a la barra de búsqueda
        type="text"
        placeholder="Buscar..."
        onChange={(e) => setSearch(e.target.value)}
      />
      {filteredChallenges.map((challenge, index) => (
        <div key={index} className="gallery">
          <div
            key={challenge.id}
            onClick={() => navigate(`/card/${challenge.id}`)}
          >
            <div className="card">
              <p>{challenge.id}</p>
              <h3>{challenge.name}</h3>
              <p>{challenge.descripcion}</p>
              <p>Estado: {challenge.estado}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SearchBar;
