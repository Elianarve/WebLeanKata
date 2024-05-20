import { useState, useEffect } from 'react';
import { getActualState, deleteActualState } from "../../services/actualStateServices";
import './css/SelectAll.css';
import update from "../../assets/img/EditButton.svg";
import EditActualState from '../edit/EditActualState';
import delte from '../../assets/img/delete.svg'

const SelectAllActualState = ({challengeId}) => {
    const [actualStates, setActualStates] = useState(null);
    const [editable, setEditable] = useState(false);
    const [loading, setLoading] = useState(false);  
   
    useEffect(() => {
        const fetchActualState = async () => {
            try {
                const actualStateData = await getActualState();
                const actualStatefiltered = actualStateData.filter(state => state.challenge_id === challengeId);    
                setActualStates(...actualStatefiltered);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching:', error);
            }
        }
        fetchActualState();
    }, [challengeId, loading]);

    
    return (
        <div className='container-challenge'>
            {actualStates && (
                <>
                    <h3>ESTADO ACTUAL</h3>
                    <div className="centered-table">
                        <table className='container-table'>
                                    <tbody key={actualStates.id}>
                                        <tr className='tr-table'>
                                            <td className='title-table'>Estado Actual ID</td>
                                            <td className='tr-table'>{actualStates.id}</td>
                                        </tr>
                                        <tr className='tr-table'>
                                            <td className='title-table'>Descripción</td>
                                            <td className='tr-table description'>{actualStates.description}</td>
                                        </tr>
                                        <tr className='tr-table'>
                                            <td className='title-table'>Fecha</td>
                                            <td className='tr-table'>{actualStates.date}</td>
                                        </tr> 
                                        <tr className="tr-table">
                                            <td className='title-table'>Challenge ID</td>
                                            <td className='tr-table'>{actualStates.challenge_id}</td>
                                        </tr> 
                                        <tr className='tr-table'>
                                            <td className='title-table'>Acciones</td>
                                            <td className='tr-table'>
                                                <button title='Editar' className='CardActionButtonContainer' onClick={() => setEditable(true)}>
                                                    <img src={update} alt="logo-update" className='edit' />
                                                </button>
                                                <button title='Eliminar' className='CardActionButtonContainer' onClick={() => {deleteActualState(actualStates.id), setLoading(true)}}>
                                                    <img src={delte} alt="img-delete" className='delete' />
                                                </button>
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

