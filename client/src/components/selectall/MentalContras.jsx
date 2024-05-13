import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMentalContrast } from '../../services/mentalContrastServices';
import update from '../../assets/img/Edit-File.svg';
import './SelectAllChallenges.css';

const MentalContras = ({ targetState }) => {
    const [mentalContrasts, setMentalContrasts] = useState([]);
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
            } catch (error) {
                console.error('Error fetching Challenges:', error);
            }
        };

        fetchMentalContrast();
    }, [targetState]);

    return (
        <div className='container-challenge' >
            {mentalContrasts.length > 0 && (
                <>
                <h3>CONTRASTE MENTAL</h3>
                    <div className="centered-table" >
                        <table className='container-table'>
                            <tbody>
                                {mentalContrasts.map((mentalContrast) => (
                                    <tr key={mentalContrast.id}>
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
                                        <td>
                                            <button className='button-edit' onClick={() => navigate(`/editcontrastmental/${mentalContrast.id}`)}>
                                                <img src={update} alt="logo-update" className='logo-edit' />
                                            </button>
                                        </td>
                                        </tr>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
}


export default MentalContras;


