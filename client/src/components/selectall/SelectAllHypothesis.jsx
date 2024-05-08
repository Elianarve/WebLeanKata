import { useState, useEffect } from 'react';
import { getHypothesis } from '../../services/hypothesisServices';
import './SelectAllChallenges.css';

const SelectAllHypothesis = ({ onHypothesisSelect }) => {
    const [hypotheses, setHypotheses] = useState([]);

    useEffect(() => {
        const fetchHypotheses = async () => {
            try {
                const hypothesesData = await getHypothesis();
                setHypotheses(hypothesesData);
            } catch (error) {
                console.error('Error fetching Hypotheses:', error);
            }
        };

        fetchHypotheses();
    }, []);

    const handleHypothesisSelect = (selectedHypothesisId) => {
        const selectedHypothesis = hypotheses.find(hypothesis => hypothesis.id === selectedHypothesisId);
        onHypothesisSelect(selectedHypothesis);
    };

    return (
        <div className='container-challenge'>
            <h2>Lista de Hipótesis</h2>
            <select className='hypothesis-select' onChange={(e) => handleHypothesisSelect(e.target.value)}>
                <option value="">Selecciona una hipótesis...</option>
                {hypotheses.map((hypothesis) => (
                    <option key={hypothesis.id} value={hypothesis.id}>
                        {hypothesis.description}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectAllHypothesis;