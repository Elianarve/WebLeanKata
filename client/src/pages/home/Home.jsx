import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getChallenge } from '../../services/challengeServices'; 
import SearchBar from '../../components/searchBar/SearchBar';
import update from '../../assets/img/Edit-File.svg';
import Calendar from 'react-calendar';
import "./Home.css";
import "../../components/calendar/Calendar";
import {getActualState} from '../../services/actualStateServices';
// import { searchLogo } from '../../assets/img/search.svg'
import { io } from 'socket.io-client';

const Home = () => {
  const [challenges, setChallenges] = useState([]);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filteredChallenges, setFilteredChallenges] = useState([]); // Estado para almacenar los desafíos filtrados por fecha
  const [isCalendarOpen, setIsCalendarOpen] = useState(false); // Estado para controlar la visibilidad del calendario
  const navigate = useNavigate();
  const calendarRef = useRef(null); // Ref para el calendario

  const socket = io();

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const [challengesData, actualStatesData] = await Promise.all([getChallenge(), getActualState()]);
        const challengesWithData = challengesData.map(challenge => ({
          ...challenge,
          actual_state: actualStatesData.find(actualState => actualState.id === challenge.actual_state_id)?.description || 'Descripción no encontrada'
        }));
        setChallenges(challengesWithData); 
        setFilteredChallenges(challengesWithData); 
      } catch (error) {
        console.error('Error fetching retos:', error);
        setError('No se pudieron cargar los desafíos. Por favor, inténtalo de nuevo más tarde.');
      }
    };

    fetchChallenges();

    // Connect to the WebSocket server
    socket.connect();

    // Add event listeners for the 'message' and 'connect' events
    socket.on('message', (message) => {
      console.log('Mensaje recibido:', message);
    });

    socket.on('connect', () => {
      console.log('Cliente conectado al servidor WebSocket');
    });

  }, []);

  // Función para manejar cambios en la fecha seleccionada
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

      <div className="search-container">
        <SearchBar onSearch={handleSearch} />
        {/* <img src={searchLogo} /> */}
        
        <div className="home-calendar">
        <button onClick={toggleCalendar} className='calendar'>Calendario</button>
        {isCalendarOpen && (
        <div ref={calendarRef} className="calendar-wrapper">
        <Calendar onChange={handleDateChange} value={selectedDate}/>
        </div>
        )}
        </div>
      </div>

      <div className="titles-container">
        <h3>
          <h3>ID</h3>
          <h3>Nombre</h3>
          <h3>Descripción</h3>
          <h3>Editar</h3>
        </h3>
      </div>
        
      <div className="gallery-items">

            {filteredChallenges.map((challenge) => (
              <div key={challenge.id} className="challenge-wrapper">

                <div className="table-row challenge-description" onClick={() => navigate(`/card/${challenge.id}`)}>
                  <p className='project-text'>{challenge.id}</p>
                  <p className='project-text'>{challenge.name}</p>
                  <p className="table-cell custom-title" title={challenge.actual_state}>{challenge.actual_state}</p>

                  <img className='logo-update' src={update} alt="Edit logo" />
                </div>

              </div>
            ))}


      </div>

    </div>
  );
};

export default Home;

