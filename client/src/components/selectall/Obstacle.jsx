import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getObstacle } from '../../services/obstacleServices';
import more from '../../assets/img/Plus.svg';
import update from '../../assets/img/Edit-File.svg';

const Obstacle = ({targetStateId}) => {
    const [obstacles, setObstacles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchObstacle = async () => {
            try {
                const obstacleData = await getObstacle(targetStateId);
                const targetStatesId = obstacleData.filter(state => state.target_state_id === targetStateId);
                // console.log(obstacleData)
                // console.log(targetStatesId)
                setObstacles(targetStatesId)
            } catch (error){
                console.error('Error fetching Challenges:', error);
            }
        };

        fetchObstacle();
    }, []);

  return (
    <div className='container-challenge'>
    {obstacles && (
        <>
        <h3>Obtaculos </h3>
            <div className="centered-table">
                <table className='container-table'>
                    <thead>
                        <tr>
                            <th className='title-table'>Obstaculo ID</th>
                            <th className='title-table'>EOID</th>
                            <th className='title-table'>Descripción</th>
                            <th className='title-table'>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {obstacles.map((obstacle) => (
    
                            <tr key={obstacle.id}>
                                <td>{obstacle.id}</td>
                                <td>{obstacle.target_state_id}</td>
                                <td>{obstacle.description}</td>
                                <td>
                                    <button className='button-edit' onClick={() => navigate(`/editobstacle/${obstacle.id}`)}>
                                        <img src={update} alt="logo-update" className='logo-edit' />
                                    </button>
                                    <button className='button-edit' onClick={() => navigate('/obstacle')}><img src={more} alt="" /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )}
</div>
);
}

export default Obstacle;