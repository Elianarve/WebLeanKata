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
        <div className='container-challenge'>
            {learnings.length > 0 && (
                <>
                    <h3>Aprendizajes</h3>
                    <div className="centered-table">
                        <table className='container-table'>
                            <thead>
                                <tr>
                                    <th className='title-table'>Aprendizaje ID</th>
                                    <th className='title-table'>Resultados ID</th>
                                    <th className='title-table'>Descripción</th>
                                    <th className='title-table'>Fecha de aprendizaje</th>
                                    <th className='title-table'>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {learnings.map((learning) => (

                                    <tr key={learning.id}>
                                        <td>{learning.id}</td>
                                        <td>{learning.results_id}</td>
                                        <td>{learning.description}</td>
                                        <td>{learning.learning_date}</td>
                                        <td>
                                            <button className='button-edit' onClick={() => navigate(`/editlearning/${learning.id}`)}>
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


export default LearningSelect