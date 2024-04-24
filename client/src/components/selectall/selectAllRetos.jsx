import { useState, useEffect } from 'react';
import { getRetos } from "../../services/service";
import { useNavigate } from 'react-router-dom';

const SelectAllRetos = () => {
    const [retos, setRetos] = useState([]);
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchRetos = async () => {
        try {
          const retosData = await getRetos(); // Llama al método getRetos para obtener todos los retos
          setRetos(retosData); // Actualiza el estado con los retos obtenidos
        } catch (error) {
          console.error('Error fetching retos:', error);
        }
      };
  
      fetchRetos();
    }, []);
  return (
      <select>
{retos.map((reto) => (
  <option key={reto.id} value={reto.id} onClick={() => navigate(`/card/${reto.id}`)}>
    {reto.name} 
    </option>
))}
</select>
  )
}

export default SelectAllRetos




   
