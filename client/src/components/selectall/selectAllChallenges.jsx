import { useState, useEffect } from 'react';
import { getChallenge } from "../../services/challengeServices";
import './SelectAllChallenges.css';
import PropTypes from 'prop-types';

const SelectAllChallenges = ({ onChallengeSelect }) => {
    const [challenges, setChallenges] = useState([]);
    const [selectedChallengeId, setSelectedChallengeId] = useState(null);
    const [filteredTargetStates, setFilteredTargetStates] = useState([]);

    useEffect(() => {
        const fetchChallenges = async () => {
            try {
                const challengesData = await getChallenge();
                setChallenges(challengesData);
            } catch (error) {
                console.error('Error fetching Challenges:', error);
            }
        };

        fetchChallenges();
    }, []);

    useEffect(() => {
        // Filtrar los targetstates cuando el challenge seleccionado cambia
        if (selectedChallengeId !== null) {
            const filteredStates = challenges.find(challenge => challenge.id === selectedChallengeId)?.targetstates || [];
            setFilteredTargetStates(filteredStates);
        }
    }, [selectedChallengeId, challenges]);

    const handleChallengeSelect = (selectedChallengeId) => {
        setSelectedChallengeId(selectedChallengeId);
        const selectedChallenge = challenges.find(challenge => challenge.id === selectedChallengeId);
        onChallengeSelect(selectedChallenge);
    };

    return (
        <div className='container-challenge'>
            <h2>Selecciona un reto:</h2>
            <select className='container-select' onChange={(e) => handleChallengeSelect(e.target.value)}>
                <option value="">Selecciona un reto...</option>
                {challenges.map((challenge) => (
                    <option key={challenge.id} value={challenge.id}>
                        {challenge.name}
                    </option>
                ))}
            </select>
  {/* Renderizar los targetstates filtrados */}
          
            <div>
                <h3>Target States:</h3>
                <ul>
                    {filteredTargetStates.map((state) => (
                        <li key={state.id}>{state.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

SelectAllChallenges.propTypes = {
    onChallengeSelect: PropTypes.func.isRequired,
};

export default SelectAllChallenges;