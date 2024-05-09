import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMentalContrast } from '../../services/mentalContrastServices';
import update from '../../assets/img/Edit-File.svg';
import '../selectall/SelectAllChallenges.css';

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
        <div className='container-challenge'>
            {mentalContrasts && (
                <>
                <h3>Contraste mental </h3>
                    <div className="centered-table">
                        <table className='container-table'>
                            <thead>
                                <tr>
                                    <th className='title-table'>Contraste mental ID</th>
                                    <th className='title-table'>Puntuación</th>
                                    <th className='title-table'>Fecha de evaluacion</th>
                                    <th className='title-table'>EOID</th>
                                    <th className='title-table'>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mentalContrasts.map((mentalContrast) => (
            
                                    <tr key={mentalContrast.id}>
                                        <td>{mentalContrast.id}</td>
                                        <td>{mentalContrast.points}</td>
                                        <td>{mentalContrast.evaluation_date}</td>
                                        <td>{mentalContrast.target_state_id}</td>
                                        <td>
                                            <button className='button-edit' onClick={() => navigate(`/editcontrastmental/${mentalContrast.id}`)}>
                                                <img src={update} alt="logo-update" className='logo-edit' />
                                            </button>
                                        </td>
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


