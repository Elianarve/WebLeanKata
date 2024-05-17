import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTargetState, deleteTargetState } from '../../services/targetStateServices';
import update from '../../assets/img/Edit-File.svg';
import './css/SelectALl.css';
import more from '../../assets/img/Plus.svg';
import delte from '../../assets/img/delete.svg';
import MentalContras from './MentalContras';
import Obstacle from '../forms/Obstacle';
import EditTargetState from '../edit/EditTargetState';
import TargetState from '../forms/TargetState';
import CreateContrastMental from '../forms/CreateContrastMental';
import ObstacleSelect from './ObstacleSelect';

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
        <div className='container-challenge' >
            {targetStates && (
                <>
                    <h3>ESTADO OBJETIVO <button className='button-add' onClick={()=> setCreateTarget(true)} ><img src={more} alt="logo-plus" className='img-plus' /></button></h3>
                    <div className="centered-table">
                        <table className='container-table'>
                                {targetStates.map((targetState) => (
                                    <tbody key={targetState.id}>
                                        <tr>
                                            <td className='title-table'>Estado Objetivo ID</td>
                                            <td className='tr-table'>{targetState.id}</td>
                                        </tr>
                                        <tr>
                                            <td className='title-table'>Descripción</td>
                                            <td className='tr-table'>{targetState.description}</td>
                                        </tr>
                                        <tr>
                                            <td className='title-table'>Fecha de Inicio</td>
                                            <td className='tr-table'>{targetState.start_date}</td>
                                        </tr>
                                        <tr>
                                            <td className='title-table'>Fecha de Meta</td>
                                            <td className='tr-table'>{targetState.date_goal}</td>
                                        </tr>
                                        <tr>
                                            <td className='title-table'>Reto ID</td>
                                            <td className='tr-table'>{targetState.challenge_id}</td>
                                        </tr>
                                        <tr>
                                            <td className='title-table'>Acciones</td>
                                            <td className='container-button'>
                                                <button className='button-edit' onClick={() => {setEditTargetId(targetState.id), setEditTargetState(true)}} >
                                                    <img src={update} alt="logo-update" className='logo-edit' />
                                                </button>
                                                <button className='button-add-t' onClick={() => {setEditTargetId(targetState.id), setEditContrast(true)}}>Añadir CM</button>
                                                <button className='button-add-t' onClick={() => {setEditTargetId(targetState.id), setEditObstacle(true)}}>Añadir Obstaculo</button>
                                                <button className='button-edit' onClick={() => deleteTargetState(targetState.id).then(() => navigate(0))}><img src={delte} alt="img-delete" className='img-delete' /></button>
                                            </td>
                                        </tr>
                                    <tr>
                                    <td className='title-table'></td>
                                    <td></td>
                                    </tr>
                                    <tr>
                                    <td className='title-table-line'></td>
                                    <td className='title-table-line'></td>
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
