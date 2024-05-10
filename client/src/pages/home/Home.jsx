import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getChallenge } from '../../services/challengeServices'; 
import SearchBar from '../../components/searchBar/SearchBar';
import update from '../../assets/img/Edit-File.svg';
import Calendar from 'react-calendar';
import "./Home.css";
import "../../components/calendar/Calendar";
import { getActualState } from '../../services/actualStateServices';

const Home = () => {
  const [challenges, setChallenges] = useState([]);
  const [filteredChallenges, setFilteredChallenges] = useState([]); 
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false); 
  const calendarRef = useRef(null); 

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
    setIsCalendarOpen(!isCalendarOpen);
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
      <div className='home-relief'>
        <SearchBar onSearch={handleSearch} />
        <div className="home-calendar">
          <button onClick={toggleCalendar}>Calendario</button>
          {isCalendarOpen && (
            <div ref={calendarRef} className="calendar-wrapper">
              <Calendar
                onChange={handleDateChange}
                value={selectedDate}
              />
             </div>
          )}
        <h2>Retos</h2>
      
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

