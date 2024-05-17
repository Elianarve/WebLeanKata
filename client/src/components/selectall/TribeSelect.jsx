import { useState, useEffect } from 'react';
import { getOneTribe } from "../../services/tribeServices";
import './css/SelectALl.css';
import update from '../../assets/img/Edit-File.svg';
import ProcessSelect from './ProcessSelect';
import EditTribe from '../edit/EditTribe';
import { getOneChallenge } from '../../services/challengeServices';

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
                                        <tr>
                                            <td className='title-table'>Nombre de la tribu</td>
                                            <td className='tr-table'>{tribe.name_tribe}</td>
                                        </tr>
                                        <tr>
                                            <td className='title-table'>Miembro de la tribu</td>
                                            <td className='tr-table'>{tribe.team_members}</td>
                                        </tr> 
                                        <tr>
                                            <td className='title-table'>Proceso ID</td>
                                            <td className='tr-table'>{tribe.process_id}</td>
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
                <EditTribe tribeId={tribe.id} setLoading={setLoading} setEditable={setEditable}/>
            )}
        </div>
    );
};

export default TribeSelect ;

