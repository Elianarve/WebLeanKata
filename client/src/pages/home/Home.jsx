import { useState, useEffect } from 'react';
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
    socket.connect();

    socket.on('message', (message) => {
    console.log('Mensaje recibido:', message);
  });

    socket.on('connect', () => {
    console.log('Cliente conectado al servidor WebSocket');
  });

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
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const filtered = challenges.filter(challenge => {
      const challengeDate = new Date(challenge.start_date);
      return challengeDate.toDateString() === date.toDateString();
    });
    setFilteredChallenges(filtered);
  };

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen); // Alternar entre abierto y cerrado
  };

  const handleOutsideClick = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setIsCalendarOpen(false);
    }
  };

  const handleSearch = (searchTerm) => {
    const filteredResults = challenges.filter((challenge) => {
      return Object.values(challenge).some((value) =>
        typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredChallenges(filteredResults); 
  };

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
          <h3>Reto</h3>
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
                  <img className='logo-update' src={update} alt="Edit logo"/>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Home;