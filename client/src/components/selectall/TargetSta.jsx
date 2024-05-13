import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTargetState, deleteTargetState } from '../../services/targetStateServices';
import update from '../../assets/img/Edit-File.svg';
import '../selectall/SelectAllChallenges.css';
import more from '../../assets/img/Plus.svg';
import delte from '../../assets/img/delete.svg';
import MentalContras from './MentalContras';
import Obstacle from './Obstacle';

const TargetSta = ({ challengeId }) => {
    const [targetStates, setTargetState] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchTargetState = async () => {
            try {

                const targetStateData = await getTargetState(challengeId);
                const targetStatesfiltered = targetStateData.filter(state => state.challenge_id === challengeId);
                setTargetState(targetStatesfiltered);
            } catch (error) {
                console.error('Error fetching Challenges:', error);
            }
        };

        fetchTargetState();
    }, [challengeId]);

    return (
        <div className='container-challenge' >
            {targetStates && (
                <>
                    <h3>ESTADO OBJETIVO <button className='button-add' onClick={() => navigate(`/targetstate`)}><img src={more} alt="logo-plus" className='img-plus' /></button></h3>
                    <div className="centered-table">
                        <table className='container-table'>
                                {targetStates.map((targetState) => (
                                    <tr key={targetState.id}>
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
                                            <td className='title-table'>RetoID</td>
                                            <td className='tr-table'>{targetState.challenge_id}</td>
                                        </tr>
                                        <tr>
                                            <td className='title-table'>Acciones</td>
                                            <td className='container-button'>
                                                <button className='button-edit' onClick={() => navigate(`/edittargetstate/${targetState.id}`)}>
                                                    <img src={update} alt="logo-update" className='logo-edit' />
                                                </button>
                                                <button className='button-add-t' onClick={() => navigate(`/contrast`)}>Añadir CM</button>
                                                <button className='button-add-t' onClick={() => navigate(`/obstacle`)}>Añadir Obstaculo</button>
                                                <button className='button-edit' onClick={() => deleteTargetState(targetState.id).then(() => navigate(0))}><img src={delte} alt="img-delete" className='img-delete' /></button>
                                            </td>
                                        </tr>
                                    <tr>
                                    <td className='title-table'></td>
                                    <td></td>
                                    </tr>
                                </tr>
                                ))}
                        </table>
                    </div>
                </>
            )}
            <MentalContras targetState={targetStates}/>
            <Obstacle targetState={targetStates} />
        </div>

    );
}

export default TargetSta;