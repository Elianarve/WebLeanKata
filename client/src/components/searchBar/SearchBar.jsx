import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";


function Search () {
    const [challanges, setChallanges] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredChallanges, setFilteredChallanges] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:5000/challenge").then((response) => {
            setChallanges(response.data);
        });
    }, []);

    useEffect(() => {
        setFilteredChallanges(
            challanges.filter((challange) =>
                challange.name.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, challanges]);

    return (
        <div>
            <input
                type="text"
                placeholder="Buscar..."
                onChange={(e) => setSearch(e.target.value)}
            />
            {filteredChallanges.map((challange, index) => (
               <div key={index} className="gallery">
                     <div key={challange.id} onClick={() => navigate(`/card/${challange.id}`)}>
                        <div className="card">
            <p>{challange.id}</p>
            <h3>{challange.name}</h3>
            <p>{challange.descripcion}</p>
            <p>Estado: {challange.estado}</p>
            </div>
          </div>
                </div>
            ))}
        </div>

    );
}

export default Search;