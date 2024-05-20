import { useState, useEffect } from 'react';
import '../calendar/Calendar.css';

const Calendar = ({ onDateSelect, challenges }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [highlightedDates, setHighlightedDates] = useState([]);

  useEffect(() => {
    filterHighlightedDates();
  }, [challenges]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    onDateSelect(date);
    setIsCalendarOpen(false);
  };

  const toggleCalendar = () => {
    setIsCalendarOpen(prevState => !prevState);
  };

  const isHighlighted = (date) => {
    const formattedDate = formatDate(date); 
    return challenges.some(challenge => challenge.date === formattedDate);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const day = date.getDate().toString().padStart(2, '0'); 
    return `${year}-${month}-${day}`;
  };

  const filterHighlightedDates = () => {
    const highlighted = challenges.map(challenge => new Date(challenge.date));
    setHighlightedDates(highlighted);
  };

  return (
      <>
        <div className="calendar-header" onClick={toggleCalendar}>
          <span className='calendar-container'>{selectedDate ? selectedDate.toDateString() : 'Selecciona una fecha'}</span>
          <i className={`arrow ${isCalendarOpen ? 'up' : 'down'}`}></i>
        </div>
        
        {isCalendarOpen && (
          <div className="calendar-days">
            {highlightedDates.map((date, index) => (
              <div key={index} 
              className={`day ${selectedDate && date.toDateString() === selectedDate.toDateString() ?
              'selected' : ''} ${isHighlighted(date) ? 'highlighted' : ''}`} 
              onClick={() => handleDateSelect(date)}>
                {date.getDate()}
              </div>
            ))}
          </div>
        )}
        
      </>
  );
};

export default Calendar;


