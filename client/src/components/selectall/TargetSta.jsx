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
        <div className='container-challenge'>
            {targetStates.length > 0 && (
                <>
                <h3>Estado objetivo asociado</h3>
                    <div className="centered-table">
                        <table className='container-table'>
                            <thead>
                                <tr>
                                    <th className='title-table'>Estado Objetivo ID</th>
                                    <th className='title-table'>Descripción</th>
                                    <th className='title-table'>Fecha de Inicio</th>
                                    <th className='title-table'>Fecha de Meta</th>
                                    <th className='title-table'>RetoID</th>
                                    <th className='title-table'>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {targetStates.map((targetState) => (
                                    <tr key={targetState.id}>
                                        <td>{targetState.id}</td>
                                        <td>{targetState.description}</td>
                                        <td>{targetState.start_date}</td>
                                        <td>{targetState.date_goal}</td>
                                        <td>{targetState.challenge_id}</td>
                                        <td>
                                            <button className='button-edit' onClick={() => navigate(`/edittargetstate/${targetState.id}`)}>
                                                <img src={update} alt="logo-update" className='logo-edit' />
                                            </button>
                                            <button className='button-edit' onClick={() => navigate(`/targetstate`)}><img src={more} alt="" /></button>
                                            <button className='button-edit' onClick={() => deleteTargetState(targetState.id).then(() => navigate(0))}><img src={delte} alt="" /></button>

                                        </td>
                                    </tr>
                                ))}
                                
                            </tbody>
                            
                        </table>
                    </div>
                </>
            )}
         <MentalContras targetState={targetStates}/>
         <Obstacle targetState={targetStates}/>
        </div>
        
    );
}

export default TargetSta;