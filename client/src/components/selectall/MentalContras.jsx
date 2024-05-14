import { useState, useEffect } from 'react';
import { getMentalContrast, deleteMentalContrast } from '../../services/mentalContrastServices';
import update from '../../assets/img/Edit-File.svg';
import './SelectAllChallenges.css';
import EditMentalContrast from '../edit/EditContrastMental';
import delte from '../../assets/img/delete.svg';
import { useNavigate } from 'react-router-dom';

const MentalContras = ({ targetState }) => {
    const [mentalContrasts, setMentalContrasts] = useState([]);
    const [editable, setEditable] = useState(false);
    const [loading, setLoading] = useState(false);  
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMentalContrast = async () => {
            try {
                const arrayTargetStaId = [];
                const mentalContrastsData = await getMentalContrast();
                targetState.map(item =>{ 
                    const targetId = item.id
                    arrayTargetStaId.push(targetId);   
                });
                const arrayMentalContratFiltered = [];
                arrayTargetStaId.map(targetId => {
                    const mentalContrastfilteredData =  mentalContrastsData.filter(contrast => contrast.target_state_id ===  targetId );
                    arrayMentalContratFiltered.push(...mentalContrastfilteredData);                    
                })         
                setMentalContrasts(arrayMentalContratFiltered)
                setLoading(false);
            } catch (error) {
                console.error('Error fetching Challenges:', error);
            }
        };

        fetchMentalContrast();
    }, [targetState, loading]);

    return (
        <div className='container-challenge' >
            {mentalContrasts.length > 0 && (
                <>
                <h3>CONTRASTE MENTAL</h3>
                    <div className="centered-table" >
                        <table className='container-table'>
                                {mentalContrasts.map((mentalContrast) => (
                                    <tbody key={mentalContrast.id}>
                                        <tr>
                                        <td className='title-table'>Contraste mental ID</td>
                                        <td  className='tr-table'>{mentalContrast.id}</td>
                                        </tr>
                                        <tr>
                                        <td className='title-table'>Puntuación</td>
                                        <td className='tr-table'>{mentalContrast.points}</td>
                                        </tr>
                                        <tr>
                                        <td className='title-table'>Fecha de evaluacion</td>
                                        <td className='tr-table'>{mentalContrast.evaluation_date}</td>
                                        </tr>
                                        <tr>
                                        <td className='title-table'>EOID</td>
                                        <td className='tr-table'>{mentalContrast.target_state_id}</td>
                                        </tr>
                                        <tr>
                                        <td className='title-table'>Acciones</td>
                                        <td className='container-button'>
                                            <button className='button-edit' onClick={() => setEditable(true)}>
                                                <img src={update} alt="logo-update" className='logo-edit' />
                                            </button>
                                            <button className='button-edit' onClick={() => deleteMentalContrast(mentalContrast.id).then(() => navigate(0))}><img src={delte} alt="img-delete" className='img-delete' /></button>
                                        </td>
                                        </tr>
                                    </tbody>
                                ))}
                        </table>
                    </div>
                </>
            )}
            {editable && mentalContrasts.map((mentalContrast) => (                       
                <EditMentalContrast key={mentalContrast.id} mentalId={mentalContrast.id} setLoading={setLoading} setEditable={setEditable}/>
            ))}
        </div>
    );
}


export default MentalContras;


