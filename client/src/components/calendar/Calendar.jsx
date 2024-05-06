// Calendar.jsx

import { useState } from 'react';
import './CalendarStyles.css';

const Calendar = ({ onDateSelect, challengeDates }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    onDateSelect(date);
    setIsCalendarOpen(false); // Cerrar el calendario después de seleccionar una fecha
  };

  const toggleCalendar = () => {
    setIsCalendarOpen(prevState => !prevState); // Alternar entre abierto y cerrado
  };

  // Función para determinar si una fecha tiene un desafío asociado
  const hasChallenge = (date) => {
    return challengeDates.some(challengeDate => {
      // Comparar solo la fecha, ignorando la hora y los minutos
      const challengeDateWithoutTime = new Date(challengeDate).setHours(0, 0, 0, 0);
      const dateWithoutTime = new Date(date).setHours(0, 0, 0, 0);
      return challengeDateWithoutTime === dateWithoutTime;
    });
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header" onClick={toggleCalendar}>
        <span>{selectedDate || 'Selecciona una fecha'}</span>
        <i className={`arrow ${isCalendarOpen ? 'up' : 'down'}`}></i>
      </div>
      {isCalendarOpen && (
        <div className="calendar-days">
          {/* Renderizar los días del mes */}
          {/* Comprobar si cada día tiene un desafío asociado y, si es así, resaltar */}
          {Array.from({ length: 31 }, (_, index) => {
            const currentDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), index + 1);
            const className = `day ${hasChallenge(currentDate) ? 'has-challenge' : ''}`;
            return (
              <div key={index} className={className} onClick={() => handleDateSelect(currentDate)}>
                {index + 1}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Calendar;


