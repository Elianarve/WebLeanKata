import { useState, useEffect } from 'react';
import { getHypothesis, deleteHypothesis } from '../../services/hypothesisServices'; 
import { useNavigate } from 'react-router-dom';
import './css/SelectAll.css';
import update from "../../assets/img/EditButton.svg";
import delte from '../../assets/img/delete.svg';
import Experiment from '../forms/Experiment';
import EditHypothesis from '../edit/EditHypothesis';
import ExperimentsSelect from './ExperimentsSelect';
import addExpLogo from '../../assets/img/experienceButton.svg'

const HypothesisSelect = ({obstacle}) => {
    const navigate = useNavigate();
  const [hypothesis, setHypothesis] = useState([]);
  const [editHypothesis, setEditHypothesis] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editHypothesisId, setEditHypothesisId] = useState(); 
  const [editExperiment, setEditExperiment] = useState(false);

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
            setLoading(false);
        } catch (error) {
            console.error('Error fetching Challenges:', error);
        }
    };

    fetchHypothesis();
}, [obstacle, loading]);

    

  return (
    <div className='container-challenge'>
    {hypothesis.length > 0 && (
        <>
        <h3>HIPOTESIS</h3>
            <div className="centered-table">
                <table className='container-table'>
                        {hypothesis.map((hypothes) => (
                            <tbody key={hypothes.id}>
                                <tr className="tr-table">
                                <td className='title-table'>Hipotesis ID</td>
                                <td className='tr-table'>{hypothes.id}</td>
                                </tr>
                                <tr className="tr-table">
                                <td className='title-table'>Descripción</td>
                                <td className='tr-table'>{hypothes.description}</td>
                                </tr>
                                <tr className="tr-table">
                                <td className='title-table'>Fecha de plan</td>
                                <td className='tr-table'>{hypothes.plan_date}</td>
                                </tr>
                                <tr className="tr-table">
                                <td className='title-table'>Estado de la hipotesis</td>
                                <td className='tr-table'>{hypothes.state_hypothesis}</td>
                                </tr>
                                <tr className="tr-table"> 
                                <td className='title-table'>Obtaculo ID</td>
                                <td className='tr-table'>{hypothes.obstacle_id}</td>
                                </tr>
                                <tr className="tr-table">
                                <td className='title-table'>Acciones</td>
                                <td className='container-button'>
                                    <button title='Editar' className='CardActionButtonContainer' onClick={() => {setEditHypothesisId(hypothes.id), setEditHypothesis(true) }}>
                                        <img src={update} className='edit' />
                                    </button>
                                    <button title='Añadir experiencia' className='CardActionButtonContainer' onClick={() => {setEditHypothesisId(hypothes.id), setEditExperiment(true)}}>
                                        <img src={addExpLogo}/>
                                    </button>
                                    <button title='Eliminar' className='CardActionButtonContainer' onClick={() => deleteHypothesis(hypothes.id).then(() => navigate(0))}>
                                        <img src={delte} alt="delete" className='delete' />
                                    </button>
                                </td>
                                </tr>
                            </tbody>
                        ))}
                </table>
            </div>
        </>
    )}
    {editHypothesis && (                       
                <EditHypothesis editHypothesisId={editHypothesisId} setLoading={setLoading} setEditHypothesis={setEditHypothesis}/>
            )}
    {editExperiment && <Experiment editHypothesisId={editHypothesisId} setLoading={setLoading} setEditExperiment={setEditExperiment}/> }
    <ExperimentsSelect hypothesis={hypothesis}/>
</div>
);
}

export default HypothesisSelect;