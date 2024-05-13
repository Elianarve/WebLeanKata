import { useState, useEffect } from 'react';
import { getOneActualState, getActualState} from "../../services/actualStateServices";
import { useNavigate, useParams } from 'react-router-dom';
import '../selectall/SelectAllChallenges.css';
import update from '../../assets/img/Edit-File.svg';
import { getOneChallenge } from '../../services/challengeServices';
import TribeSelect from './TribeSelect';


const SelectAllActualState = () => {
    const [actualStates, setActualStates] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();
   

    useEffect(() => {
        const fetchActualState = async () => {
            try {
                const challengeData = await getOneChallenge(id);  
                const actualStateId = challengeData.data.actual_state_id;  
                const actualStateData = await getOneActualState(actualStateId);
                setActualStates(actualStateData.data);
            } catch (error) {
                console.error('Error fetching Challenges:', error);
            }
        }
        fetchActualState();
    }, [id]);
    
    return (
        <div className='container-challenge'>
            {actualStates && (
                <>
                    <h3>ESTADO ACTUAL</h3>
                    <div className="centered-table">
                        <table className='container-table'>
                            <tbody>
                                    <tr key={actualStates.id}>
                                        <tr className='tr-table'>
                                            <td className='title-table'>Estado Actual ID</td>
                                            <td className='tr-table'>{actualStates.id}</td>
                                        </tr>
                                        <tr>
                                            <td className='title-table'>Descripción</td>
                                            <td className='tr-table'>{actualStates.description}</td>
                                        </tr>
                                        <tr>
                                            <td className='title-table'>Fecha</td>
                                            <td className='tr-table'>{actualStates.date}</td>
                                        </tr> 
                                        <tr>
                                            <td className='title-table'>Tribu ID</td>
                                            <td className='tr-table'>{actualStates.tribe_id}</td>
                                        </tr> 
                                        <tr>
                                            <td className='title-table'>Acciones</td>
                                            <td className='tr-table'>
                                                <button className='button-edit' onClick={() => navigate(`/editactualstate/${actualStates.id}`)}><img src={update} alt="logo-update" className='logo-edit' /></button>
                                            </td>
                                        </tr>
                                    </tr>
                            </tbody>
                        </table>
                    </div>
                </>
            )}
            <TribeSelect/>
        </div>
    );
};

export default SelectAllActualState;

