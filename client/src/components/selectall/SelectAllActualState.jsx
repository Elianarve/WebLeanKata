import { useState, useEffect } from 'react';
import { getOneActualState } from "../../services/actualStateServices";
import { useParams } from 'react-router-dom';
import './css/SelectAll.css';
import update from '../../assets/img/Edit-File.svg';
import { getOneChallenge } from '../../services/challengeServices';
import TribeSelect from './TribeSelect';
import EditActualState from '../edit/EditActualState';

const SelectAllActualState = () => {
    const [actualStates, setActualStates] = useState(null);
    const { id } = useParams();
    const [editable, setEditable] = useState(false);
    const [loading, setLoading] = useState(false);  
   

    useEffect(() => {
        const fetchActualState = async () => {
            try {
                const challengeData = await getOneChallenge(id);  
                const actualStateId = challengeData.data.actual_state_id;  
                const actualStateData = await getOneActualState(actualStateId);
                setActualStates(actualStateData.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching:', error);
            }
        }
        fetchActualState();
    }, [id, loading]);
    
    return (
        <div className='container-challenge'>
            {actualStates && (
                <>
                <TribeSelect tribuId={actualStates.tribe_id}/>
                    <h3>ESTADO ACTUAL</h3>
                    <div className="centered-table">
                        <table className='container-table'>
                                    <tbody key={actualStates.id}>
                                        <tr className='tr-table'>
                                            <td className='title-table'>Estado Actual ID</td>
                                            <td className='tr-table'>{actualStates.id}</td>
                                        </tr>
                                        <tr>
                                            <td className='title-table'>Descripción</td>
                                            <td className='tr-table description'>{actualStates.description}</td>
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
                                                <button className='button-edit' onClick={() => setEditable(true)}><img src={update} alt="logo-update" className='logo-edit' /></button>
                                            </td>
                                        </tr>
                                    </tbody>
                        </table>
                    </div>
                </>
            )}
            {editable && (
                <EditActualState actualStateId={actualStates.id} setLoading={setLoading} setEditable={setEditable}/>
            )}
        </div>
    );
};

export default SelectAllActualState;

