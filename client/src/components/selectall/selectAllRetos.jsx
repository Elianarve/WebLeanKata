import { useState, useEffect } from 'react';
import { getRetos, getOneReto } from "../../services/service";
import { useNavigate } from 'react-router-dom';

const SelectAllRetos = ({ retoId }) => {
    const [retos, setRetos] = useState([]);
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchRetos = async () => {
        try {
          const retosData = await getRetos(); 
          setRetos(retosData); 
        } catch (error) {
          console.error('Error fetching retos:', error);
        }
      };
  
      fetchRetos();
    }, []);

    const handleChange = (event) => {
      const retoId = event.target.value;
      navigate(`/card/${retoId}`);
    };

  return (
      <select value={retoId} onChange={handleChange}>
      {retos.map((reto) => (
    <option key={reto.id} value={reto.id}>
    {reto.name} 
    </option>
))}
</select>
  )
}

export default SelectAllRetos;




   
