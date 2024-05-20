import { useState, useEffect } from 'react';
import { getOneTribe, deleteTribe } from "../../services/tribeServices";
import './css/SelectAll.css';
import update from "../../assets/img/EditButton.svg";
import ProcessSelect from './ProcessSelect';
import EditTribe from '../edit/EditTribe';
import { getOneChallenge } from '../../services/challengeServices';
import delte from '../../assets/img/delete.svg';

const TribeSelect = ({challengeId}) => {
    const [tribe, setTribe] = useState(null);
    const [editable, setEditable] = useState(false);
    const [loading, setLoading] = useState(false);  

    useEffect(() => {
        const fetchProcess = async () => {
            try {
                const challengeData = await getOneChallenge(challengeId);  
                const tribeId = challengeData.data.tribe_id;  
                const tribeData = await getOneTribe(tribeId);
                setTribe(tribeData.data);
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        fetchProcess();
    }, [challengeId, loading]);
    
    return (
        <div className='container-challenge'>
            {tribe && (
                <>
                <ProcessSelect processId={tribe.process_id}/>
                    <h3>TRIBU</h3>
                    <div className="centered-table">
                        <table className='container-table'>
                                    <tbody key={tribe.id}>
                                        <tr className='tr-table'>
                                            <td className='title-table'>Tribu ID</td>
                                            <td className='tr-table'>{tribe.id}</td>
                                        </tr>
                                        <tr className="tr-table">
                                            <td className='title-table'>Nombre de la tribu</td>
                                            <td className='tr-table'>{tribe.name_tribe}</td>
                                        </tr>
                                        <tr className="tr-table">
                                            <td className='title-table'>Miembro de la tribu</td>
                                            <td className='tr-table'>{tribe.team_members}</td>
                                        </tr> 
                                        <tr className="tr-table">
                                            <td className='title-table'>Proceso ID</td>
                                            <td className='tr-table'>{tribe.process_id}</td>
                                        </tr> 
                                        <tr className="tr-table">
                                            <td className='title-table'>Acciones</td>
                                            <td className='tr-table'>
                                                <button title='Editar' className='CardActionButtonContainer' onClick={() => setEditable(true)}>
                                                    <img src={update} alt="logo-update" className='edit' />
                                                </button>
                                                <button title='Eliminar' className='CardActionButtonContainer' onClick={() => {deleteTribe(tribe.id), setLoading(true)}}>
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
                <EditTribe tribeId={tribe.id} setLoading={setLoading} setEditable={setEditable}/>
            )}
        </div>
    );
};

export default TribeSelect ;

