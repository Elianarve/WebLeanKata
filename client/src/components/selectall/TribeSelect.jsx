import { useState, useEffect } from 'react';
import { getOneTribe } from "../../services/tribeServices";
import { useNavigate } from 'react-router-dom';
import '../selectall/SelectAllChallenges.css';
import update from '../../assets/img/Edit-File.svg';
import ProcessSelect from './ProcessSelect';


const TribeSelect = ({tribuId}) => {
    const [tribe, setTribe] = useState(null);
    const navigate = useNavigate();
  

    useEffect(() => {
        const fetchProcess = async () => {
            try {
                const tribeData = await getOneTribe(tribuId);
                setTribe(tribeData.data);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        fetchProcess();
    }, [tribuId]);
    
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
                                                <button className='button-edit' onClick={() => navigate(`/edittribe/${tribe.id}`)}><img src={update} alt="logo-update" className='logo-edit' /></button>
                                            </td>
                                        </tr>
                                    </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

export default TribeSelect ;
