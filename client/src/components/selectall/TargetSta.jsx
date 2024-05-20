import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTargetState, deleteTargetState } from '../../services/targetStateServices';
import update from "../../assets/img/EditButton.svg";
import './css/SelectAll.css';
import more from '../../assets/img/Plus.svg';
import delte from '../../assets/img/delete.svg';
import MentalContras from './MentalContras';
import Obstacle from '../forms/Obstacle';
import EditTargetState from '../edit/EditTargetState';
import TargetState from '../forms/TargetState';
import CreateContrastMental from '../forms/CreateContrastMental';
import ObstacleSelect from './ObstacleSelect';
import AddCMLogo from '../../assets/img/CMButton.svg'
import AddObstacleLogo from '../../assets/img/ObstacleButton.svg'

const TargetSta = ({ challengeId }) => {
    const navigate = useNavigate();
    const [targetStates, setTargetState] = useState([]);
    const [createTarget, setCreateTarget] = useState(false); 
    const [editTargetState, setEditTargetState] = useState(false);
    const [editContrast, setEditContrast] = useState(false);
    const [editObstacle, setEditObstacle] = useState(false);
    const [editTargetId, setEditTargetId] = useState();
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
        const fetchTargetState = async () => {
            try {
                const targetStateData = await getTargetState(challengeId);
                const targetStatesfiltered = targetStateData.filter(state => state.challenge_id === challengeId);
                setTargetState(targetStatesfiltered);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching:', error);
            }
        };

        fetchTargetState();
    }, [challengeId, loading]);

    return (
        <div className='container-challenge'>
            {targetStates && (
                <>
                    <div className='titleAling'>
                    <h3>ESTADO OBJETIVO 
                        <button title='Crar un nuevo estado objetivo' className='targetState' onClick={()=> setCreateTarget(true)} >
                            <img src={more} className='createTargetState' />
                        </button>
                    </h3>
                    </div>
                    <div className="centered-table">
                        <table className='container-table'>
                                {targetStates.map((targetState) => (
                                    <tbody key={targetState.id}>
                                        <tr className="tr-table">
                                            <td className='title-table'>Estado Objetivo ID</td>
                                            <td className='tr-table'>{targetState.id}</td>
                                        </tr>
                                        <tr className="tr-table">
                                            <td className='title-table'>Descripción</td>
                                            <td className='tr-table'>{targetState.description}</td>
                                        </tr>
                                        <tr className="tr-table">
                                            <td className='title-table'>Fecha de Inicio</td>
                                            <td className='tr-table'>{targetState.start_date}</td>
                                        </tr>
                                        <tr className="tr-table">
                                            <td className='title-table'>Fecha de Meta</td>
                                            <td className='tr-table'>{targetState.date_goal}</td>
                                        </tr>
                                        <tr className="tr-table">
                                            <td className='title-table'>Reto ID</td>
                                            <td className='tr-table'>{targetState.challenge_id}</td>
                                        </tr>
                                        <tr className='tr-table'>
                                            <td className='title-table'>Acciones</td>
                                            <td className='container-button'>
                                                <button title='Editar' className='CardActionButtonContainer' onClick={() => {setEditTargetId(targetState.id), setEditTargetState(true)}} >
                                                    <img src={update} alt="update" className='edit' />
                                                </button>
                                                <button title='Añadir CM' className='CardActionButtonContainer' onClick={() => {setEditTargetId(targetState.id), setEditContrast(true)}}>
                                                    <img src={AddCMLogo} className='addCM'/>
                                                </button>
                                                <button title='Añadir obstaculo' className='CardActionButtonContainer' onClick={() => {setEditTargetId(targetState.id), setEditObstacle(true)}}>
                                                    <img src={AddObstacleLogo} className='addObstacle'/>
                                                </button>
                                                <button title='Eliminar' className='CardActionButtonContainer' onClick={() => {deleteTargetState(targetState.id), setLoading(true)}}>
                                                    <img src={delte} alt="img-delete" className='delete' />
                                                </button>
                                            </td>
                                        </tr>
                                </tbody>
                                ))}
                        </table>
                    </div>
                </>
            )}
            {editTargetState && (
                <EditTargetState  editTargetId={editTargetId} setLoading={setLoading} setEditTargetState={setEditTargetState}/>
            )}
            {createTarget && <TargetState setLoading={setLoading} setCreateTarget={setCreateTarget} />}

            {editContrast && <CreateContrastMental editTargetId={editTargetId} setLoading={setLoading} setEditContrast={setEditContrast} />}
            <MentalContras targetState={targetStates}/>

            {editObstacle && <Obstacle editTargetId={editTargetId} setLoading={setLoading} setEditObstacle={setEditObstacle}/>}
            <ObstacleSelect targetState={targetStates}/>
        </div>
    );
}

export default TargetSta;
