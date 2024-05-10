import { useState, useEffect } from 'react';
import { getObstacle } from '../../services/obstacleServices';
import './SelectAllChallenges.css';

const SelectAllObstacles = ({ onObstacleSelect }) => {
    const [obstacles, setObstacles] = useState([]);

    useEffect(() => {
        const fetchObstacles = async () => {
            try {
                const obstaclesData = await getObstacle();
                setObstacles(obstaclesData);
            } catch (error) {
                console.error('Error fetching Obstacles:', error);
            }
        };

        fetchObstacles();
    }, []);

    const handleObstacleSelect = (selectedObstacleId) => {
        const selectedObstacle = obstacles.find(obstacle => obstacle.id === selectedObstacleId);
        onObstacleSelect(selectedObstacle);
    };

    return (
        <div className='container-challenge'>
            <h2>Lista de Obstáculos</h2>
            <select className='obstacle-select' onChange={(e) => handleObstacleSelect(e.target.value)}>
                <option value="">Selecciona un obstáculo...</option>
                {obstacles.map((obstacle) => (
                    <option key={obstacle.id} value={obstacle.id}>
                        {obstacle.description}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectAllObstacles;