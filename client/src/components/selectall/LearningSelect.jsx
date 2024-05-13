import { useState, useEffect } from 'react';
import { getLearning, deleteLearning } from '../../services/learningsServices';
import { useNavigate } from 'react-router-dom';
import '../selectall/SelectAllChallenges.css';
import update from '../../assets/img/Edit-File.svg';
// import more from '../../assets/img/Plus.svg';
// import delte from '../../assets/img/delete.svg';

const LearningSelect = ({ result }) => {
    const [learnings, setLearnings] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMentalContrast = async () => {
            try {
                const arrayLeraningId = [];
                const learningData = await getLearning();
                result.map(item => {
                    const learningId = item.id
                    arrayLeraningId.push(learningId);
                });
                const arrayLearningFiltered = [];
                arrayLeraningId.map(learningId => {
                    const mentalContrastfilteredData = learningData.filter(state => state.results_id === learningId);
                    arrayLearningFiltered.push(...mentalContrastfilteredData);
                })
                setLearnings(arrayLearningFiltered)
            } catch (error) {
                console.error('Error fetching Challenges:', error);
            }
        };

        fetchMentalContrast();
    }, [result]);


    return (
        <div className='container-challenge' >
            {learnings.length > 0 && (
                <>
                    <h3>APRENDIZAJES</h3>
                    <div className="centered-table">
                        <table className='container-table'>
                                {learnings.map((learning) => (
                                    <tbody className='tr-table' key={learning.id}>
                                        <tr>
                                        <td className='title-table'>Aprendizaje ID</td>
                                        <td className='tr-table'>{learning.id}</td>
                                        </tr>
                                        <tr>
                                        <td className='title-table'>Resultados ID</td>
                                        <td className='tr-table'>{learning.results_id}</td>
                                        </tr>
                                        <tr>
                                        <td className='title-table'>Descripción</td>
                                        <td className='tr-table'>{learning.description}</td>
                                        </tr>
                                        <tr>
                                        <td className='title-table'>Fecha de aprendizaje</td>
                                        <td className='tr-table'>{learning.learning_date}</td>
                                        </tr>
                                        <tr>
                                        <td className='title-table'>Acciones</td>
                                        <td>
                                            <button className='button-edit' onClick={() => navigate(`/editlearning/${learning.id}`)}>
                                                <img src={update} alt="logo-update" className='logo-edit' />
                                            </button>
                                        </td>
                                        </tr> 
                                    </tbody>
                                ))}
                        </table>
                    </div>
                </>
            )}
        </div>
    );
}


export default LearningSelect