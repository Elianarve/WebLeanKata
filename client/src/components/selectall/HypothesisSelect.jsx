import { useState, useEffect } from 'react';
import { getHypothesis, deleteHypothesis } from '../../services/hypothesisServices'; 
import { useNavigate } from 'react-router-dom';
import '../selectall/SelectAllChallenges.css';
import update from '../../assets/img/Edit-File.svg';
import more from '../../assets/img/Plus.svg';
import delte from '../../assets/img/delete.svg';

const HypothesisSelect = ({obstacle}) => {
  const [hypothesis, setHypothesis] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHypothesis = async () => {
        try {
            const arrayObstacleId = [];
            const hypothesisData = await getHypothesis();
            obstacle.map(item =>{ 
                const obstacleId = item.id
                arrayObstacleId.push(obstacleId);   
            });
            const arrayHypothesisFiltered = [];
            arrayObstacleId.map(obstacleId => {
                const hipothesisfiltered = hypothesisData.filter(state => state.obstacle_id === obstacleId );
                arrayHypothesisFiltered.push(...hipothesisfiltered); 
            })
            setHypothesis(arrayHypothesisFiltered);
        } catch (error) {
            console.error('Error fetching Challenges:', error);
        }
    };

    fetchHypothesis();
}, [obstacle]);

    

  return (
    <div className='container-challenge'>
    {hypothesis.length > 0 && (
        <>
        <h3>Hypothesis</h3>
            <div className="centered-table">
                <table className='container-table'>
                    <thead>
                        <tr>
                            <th className='title-table'>Hipotesis ID</th>
                            <th className='title-table'>Descripción</th>
                            <th className='title-table'>Fecha de plan</th>
                            <th className='title-table'>Estado de la hipotesis</th>
                            <th className='title-table'>Obtaculo ID</th>
                            <th className='title-table'>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hypothesis.map((hypothes) => (
                            <tr key={hypothes.id}>
                                <td>{hypothes.id}</td>
                                <td>{hypothes.description}</td>
                                <td>{hypothes.plan_date}</td>
                                <td>{hypothes.state_hypothesis}</td>
                                <td>{hypothes.obstacle_id}</td>
                                <td>
                                    <button className='button-edit' onClick={() => navigate(`/edithypothesis/${hypothes.id}`)}>
                                        <img src={update} alt="logo-update" className='logo-edit' />
                                    </button>
                                    <button className='button-edit' onClick={() => navigate(`/hypothesis`)}><img src={more} alt="" /></button>
                                    <button className='button-edit' onClick={() => deleteHypothesis(hypothes.id).then(() => navigate(0))}><img src={delte} alt="" /></button>

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

export default HypothesisSelect;