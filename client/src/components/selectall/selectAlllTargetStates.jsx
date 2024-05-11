// SelectAllTargetState.jsx
import { useState, useEffect } from 'react';
import { getTargetState } from '../../services/targetStateServices';

const SelectAllTargetState = ({ onTargetStateSelect, challengeId }) => {
  const [targetStates, setTargetStates] = useState([]);

  useEffect(() => {
    const fetchTargetStates = async () => {
      try {
        const targetStatesData = await getTargetState(challengeId);
        setTargetStates(targetStatesData);
      } catch (error) {
        console.error('Error fetching Target States:', error);
      }
    };

    fetchTargetStates();
  }, [challengeId]);

  const handleTargetStateSelect = (selectedTargetStateId) => {
    console.log(selectedTargetStateId);
    const selectedTargetState = targetStates.find(targetState => targetState.id === selectedTargetStateId);
    onTargetStateSelect(selectedTargetState);
  };

  return (
    <div className='container-challenge'>
      <h2>Lista de Estados Objetivo</h2>
      <select className='target-state-select' onChange={(e) => handleTargetStateSelect(e.target.value)}>
        <option value="">Selecciona un estado objetivo...</option>
        {targetStates.map((targetState) => (
          <option key={targetState.id} value={targetState.id}>
            {targetState.description}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectAllTargetState;