import { useState, useEffect } from 'react';
import './SelectAllChallenges.css';

const SelectAllExperiments = ({ challengeId, onExperimentSelect }) => {
    const [experiments, setExperiments] = useState([]);

    useEffect(() => {
        const fetchExperiments = async () => {
            try {
                const experimentsData = await getExperimentsByChallengeId(challengeId); 
                setExperiments(experimentsData);
            } catch (error) {
                console.error('Error fetching experiments:', error);
            }
        };

        fetchExperiments();
    }, [challengeId]);

    const handleExperimentSelect = (selectedExperimentId) => {
        const selectedExperiment = experiments.find(experiment => experiment.id === selectedExperimentId);
        onExperimentSelect(selectedExperiment);
    };

    return (
        <div className='container-challenge'>
            <h2>Lista de Experimentos</h2>
            <select className='experiment-select' onChange={(e) => handleExperimentSelect(e.target.value)}>
                <option value="">Selecciona un experimento...</option>
                {experiments.map((experiment) => (
                    <option key={experiment.id} value={experiment.id}>
                        {experiment.description}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectAllExperiments;