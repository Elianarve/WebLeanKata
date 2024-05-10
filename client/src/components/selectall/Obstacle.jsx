import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getObstacle } from '../../services/obstacleServices';
import more from '../../assets/img/Plus.svg';
import update from '../../assets/img/Edit-File.svg';
import HypothesisSelect from './HypothesisSelect';

const Obstacle = ({targetState}) => {
    const [obstacles, setObstacles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchObstacle = async () => {
            try {
                const arrayTargetStaId = [];
                const obstacleData = await getObstacle();
                targetState.map(item =>{ 
                    const targetId = item.id
                    arrayTargetStaId.push(targetId);   
                });
                const arrayObstacleFiltered = [];
                arrayTargetStaId.map(targetId => {
                    const obstacleFilteredData =  obstacleData.filter(contrast => contrast.target_state_id ===  targetId );
                    arrayObstacleFiltered.push(...obstacleFilteredData);                    
                })         
                setObstacles(arrayObstacleFiltered)
            } catch (error){
                console.error('Error fetching Challenges:', error);
            }
        };

        fetchObstacle();
    }, [targetState]);

  return (
    <div className='container-challenge'>
    {obstacles.length > 0 && (
        <>
        <h3>Obtaculos<button className='button-edit' onClick={() => navigate('/obstacle')}><img src={more} alt="" /></button> </h3>
            <div className="centered-table">
                <table className='container-table'>
                    <thead>
                        <tr>
                            <th className='title-table'>Obstaculo ID</th>
                            <th className='title-table'>EOID</th>
                            <th className='title-table'>Descripción</th>
                            <th className='title-table'>Imagen</th>
                            <th className='title-table'>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {obstacles.map((obstacle) => (
    
                            <tr key={obstacle.id}>
                                <td>{obstacle.id}</td>
                                <td>{obstacle.target_state_id}</td>
                                <td>{obstacle.description}</td>
                                <img className='img-form' src={obstacle.image} alt="" />
                                <td>
                                    <button className='button-edit' onClick={() => navigate(`/editobstacle/${obstacle.id}`)}>
                                        <img src={update} alt="logo-update" className='logo-edit' />
                                    </button>
                                    <button className='button-edit' onClick={() => navigate(`/hypothesis`)}>Añadir Hipotesis</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )}
    <HypothesisSelect obstacle={obstacles}/>
</div>
);
}

export default Obstacle;