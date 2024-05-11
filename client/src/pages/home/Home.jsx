import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../components/searchBar/SearchBar';
// import delte from '../../assets/img/delete.svg';
import update from '../../assets/img/Edit-File.svg';
import {getActualState} from '../../services/actualStateServices';
import {getChallenge} from '../../services/challengeServices';
import Calendar from '../../components/calendar/Calendar';
import './Home.css';

const Home = () => {
  const [challenges, setChallenges] = useState([]);
  const [filteredChallenges, setFilteredChallenges] = useState([]); 
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false); // Estado para controlar la visibilidad del calendario
  const calendarRef = useRef(null); // Ref para el calendario

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [challengesData, actualStatesData] = await Promise.all([getChallenge(), getActualState()]);
        const challengesWithData = challengesData.map(challenge => ({
          ...challenge,
          actual_state: actualStatesData.find(actualState => actualState.id === challenge.actual_state_id)?.description || 'Descripción no encontrada'
        }));
        setChallenges(challengesWithData); 
        setFilteredChallenges(challengesWithData); 
      } catch (error) {
        console.error("Error al obtener los retos:", error);
        setError('No se pudieron cargar los desafíos. Por favor, inténtalo de nuevo más tarde.');
      }
    };

    fetchData();
  }, []);

 const handleDateChange = (date) => {
    setSelectedDate(date);
    // Filtrar los desafíos por la fecha seleccionada
    const filtered = challenges.filter(challenge => {
      const challengeDate = new Date(challenge.start_date);
      return challengeDate.toDateString() === date.toDateString();
    });
    setFilteredChallenges(filtered);
  };

  // Función para alternar el estado del calendario y controlar su visibilidad
  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen); // Alternar entre abierto y cerrado
  };

  // Función para cerrar el calendario si se hace clic fuera de él
  const handleOutsideClick = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setIsCalendarOpen(false);
    }
  };

  // Función para manejar la búsqueda
  const handleSearch = (searchTerm) => {
    const filteredResults = challenges.filter((challenge) => {
      return Object.values(challenge).some((value) =>
        typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredChallenges(filteredResults);
  };

  // Agregar un listener de eventos para cerrar el calendario cuando se hace clic fuera de él
  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className="home-container">
<div className='home-relief'>
<SearchBar onSearch={handleSearch} />
<div className="home-calendar">
{/* Enlace o botón para abrir y cerrar el calendario */}
<button onClick={toggleCalendar}>Calendario</button>
{/* Renderizar el calendario solo si está abierto */}
{isCalendarOpen && (
<div ref={calendarRef} className="calendar-wrapper">
<Calendar
onChange={handleDateChange}
value={selectedDate}
/>
</div>
)}
</div>
<h3>
<span>ID</span>
<span>Descripción</span>
<span>Estado</span>
</h3>
<div className="gallery-items">
{error && <p className="error-message">{error}</p>}
<div className="challenge-table">
{filteredChallenges.map((challenge) => (
<div key={challenge.id} className="challenge-wrapper">
<div className="table-row challenge-description" onClick={() => navigate(`/card/${challenge.id}`)}>
<span>{challenge.id}</span>
<span>{challenge.name}</span>
<span>{challenge.actual_state_id}</span>
<div className='logos'>
<img className='logo-update' src={update} alt="" />
</div>
</div>
</div>
))}
</div>
</div>
</div>
</div>
  );
};

export default Home;