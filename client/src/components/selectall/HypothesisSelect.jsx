import { useState, useEffect } from 'react';
import { getHypothesis, deleteHypothesis } from '../../services/hypothesisServices'; 
import { useNavigate } from 'react-router-dom';
import '../selectall/SelectAllChallenges.css';
import update from '../../assets/img/Edit-File.svg';
import more from '../../assets/img/Plus.svg';
import delte from '../../assets/img/delete.svg';
import Experiments from './Experiments';

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
        <h3>HIPOTESIS <button className='button-add-h' onClick={() => navigate(`/hypothesis`)}><img src={more} alt="logo-plus" className='img-plus' /></button></h3>
            <div className="centered-table">
                <table className='container-table'>
                    <tbody>
                        {hypothesis.map((hypothes) => (
                            <tr key={hypothes.id}>
                                <tr>
                                <td className='title-table'>Hipotesis ID</td>
                                <td className='tr-table'>{hypothes.id}</td>
                                </tr>
                                <tr>
                                <td className='title-table'>Descripción</td>
                                <td className='tr-table'>{hypothes.description}</td>
                                </tr>
                                <tr>
                                <td className='title-table'>Fecha de plan</td>
                                <td className='tr-table'>{hypothes.plan_date}</td>
                                </tr>
                                <tr>
                                <td className='title-table'>Estado de la hipotesis</td>
                                <td className='tr-table'>{hypothes.state_hypothesis}</td>
                                </tr>
                                <tr>
                                <td className='title-table'>Obtaculo ID</td>
                                <td className='tr-table'>{hypothes.obstacle_id}</td>
                                </tr>
                                <tr>
                                <td className='title-table'>Acciones</td>
                                <td className='container-button'>
                                    <button className='button-edit' onClick={() => navigate(`/edithypothesis/${hypothes.id}`)}>
                                        <img src={update} alt="logo-update" className='logo-edit' />
                                    </button>
                                    <button className='button-add-t' onClick={() => navigate(`/experiment`)}>Añadir Exp</button>
                                    <button className='button-edit' onClick={() => deleteHypothesis(hypothes.id).then(() => navigate(0))}><img src={delte} alt="img-delete" className='img-delete' /></button>
                                </td>
                                </tr>
                                <tr>
                                    <td className='title-table'></td>
                                    <td></td>
                                </tr>
                            </tr>
                        ))}
                        
                    </tbody>
                    
                </table>
            </div>
        </>
    )}
    <Experiments hypothesis={hypothesis}/>
</div>

);
}

export default HypothesisSelect;