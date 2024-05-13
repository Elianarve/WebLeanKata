import { useState, useEffect } from 'react';
import { getOneTribe } from "../../services/tribeServices";
import { useNavigate, useParams } from 'react-router-dom';
import '../selectall/SelectAllChallenges.css';
import update from '../../assets/img/Edit-File.svg';
import { getOneActualState } from '../../services/actualStateServices'; 


const TribeSelect = () => {
    const [tribe, setTribe] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();
   

    useEffect(() => {
        const fetchProcess = async () => {
            try {
                const actualStateData = await getOneActualState(id); 
                console.log(actualStateData)
                const tribeId = actualStateData.data.tribe_id;  
                const tribeData = await getOneTribe(tribeId);
                setTribe(tribeData.data);
            } catch (error) {
                console.error('Error fetching Challenges:', error);
            }
        }
        fetchProcess();
    }, [id]);
    
    return (
        <div className='container-challenge'>
            {tribe && (
                <>
                    <h3>PROCESO</h3>
                    <div className="centered-table">
                        <table className='container-table'>
                            <tbody>
                                    <tr key={tribe.id}>
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

