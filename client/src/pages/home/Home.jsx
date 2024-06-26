import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getChallenge } from "../../services/challengeServices";
import SearchBar from "../../components/searchBar/SearchBar";
import Calendar from "react-calendar";
import "./Home.css";
import "../../components/calendar/Calendar";
import { getActualState } from "../../services/actualStateServices";
import { io } from "socket.io-client";

const Home = () => {
  const [challenges, setChallenges] = useState([]);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filteredChallenges, setFilteredChallenges] = useState([]);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const navigate = useNavigate();
  const calendarRef = useRef(null);

  const socket = io();
  socket.connect();

  socket.on("message", (message) => {
    console.log("Mensaje recibido:", message);
  });

  socket.on("connect", () => {
    console.log("Cliente conectado al servidor WebSocket");
  });

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const [challengesData, actualStatesData] = await Promise.all([
          getChallenge(),
          getActualState(),
        ]);
        const challengesWithData = challengesData.map((challenge) => ({
          ...challenge,
          actual_state:
            actualStatesData.find(
              (actualState) => actualState.challenge_id === challenge.id
            )?.description || "Descripción no encontrada",
            actual_state_id:
            actualStatesData.find(
              (actualState) => actualState.challenge_id === challenge.id
            )?.id || "ID no encontrado",
        }));
        setChallenges(challengesWithData);
        setFilteredChallenges(challengesWithData);
      } catch (error) {
        console.error("Error fetching retos:", error);
        setError(
          "No se pudieron cargar los desafíos. Por favor, inténtalo de nuevo más tarde."
        );
      }
    };

    fetchChallenges();
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const filtered = challenges.filter((challenge) => {
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
      return Object.values(challenge).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredChallenges(filteredResults);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="home-container">
      <div className="container-principal">
        <SearchBar onSearch={handleSearch} />
        <button onClick={toggleCalendar} className="button-calendar">
          Calendario
        </button>
        {isCalendarOpen && (
          <div ref={calendarRef} className="calendar-wrapper">
            <Calendar onChange={handleDateChange} value={selectedDate} />
          </div>
        )}
      </div>

      <div className="table-container">
        <table className="responsive-table">
          <thead className="thead-home">
            <tr className="title-tr-home">
              <th className="title-th-home">RETO</th>
              <th className="title-th-home">NOMBRE</th>
              <th className="title-th-home">ESTADO ACTUAL</th>
            </tr>
          </thead>
          <tbody>
            {filteredChallenges.map((challenge) => (
              <tr
                className="table-challenge"
                key={challenge.id}
                onClick={() => navigate(`/home/card/${challenge.id}`)}>
                <td className="challenge-wrapper idWrapper">{challenge.id}</td>
                <td className="challenge-wrapper">{challenge.name}</td>
                <td className="challenge-wrapper">{challenge.actual_state}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
