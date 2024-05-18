import { useState, useEffect } from 'react';
import { getLearning, deleteLearning } from '../../services/learningsServices';
import { useNavigate } from 'react-router-dom';
import './css/SelectAll.css';
import update from '../../assets/img/Edit-File.svg';
import delte from '../../assets/img/delete.svg';
import EditLearning from '../edit/EditLearning';


const LearningSelect = ({ result }) => {
    const [learnings, setLearnings] = useState([]);
    const navigate = useNavigate();
    const [editLearning, setEditLearning] = useState(false);
    const [editLearningId, setEditLearningId] = useState();
    const [loading, setLoading] = useState(false);
  

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
                setLearnings(arrayLearningFiltered);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching Challenges:', error);
            }
        };

        fetchMentalContrast();
    }, [result, loading]);


    return (
        <div className='container-challenge' >
            {learnings.length > 0 && (
                <>
                    <h3>APRENDIZAJES</h3>
                    <div className="centered-table">
                        <table className='container-table'>
                                {learnings.map((learning) => (
                                    <tbody className='tr-table' key={learning.id}>
                                        <tr className='tr-table'>
                                        <td className='title-table'>Aprendizaje ID</td>
                                        <td className='tr-table'>{learning.id}</td>
                                        </tr>
                                        <tr className='tr-table'>
                                        <td className='title-table'>Resultados ID</td>
                                        <td className='tr-table'>{learning.results_id}</td>
                                        </tr>
                                        <tr className='tr-table'>
                                        <td className='title-table'>Descripción</td>
                                        <td className='tr-table'>{learning.description}</td>
                                        </tr>
                                        <tr className='tr-table'>
                                        <td className='title-table'>Fecha de aprendizaje</td>
                                        <td className='tr-table'>{learning.learning_date}</td>
                                        </tr>
                                        <tr className='tr-table'>
                                        <td className='title-table'>Acciones</td>
                                        <td className='container-button'>
                                            <button className='button-edit' onClick={() => {setEditLearningId(learning.id), setEditLearning(true) }}>
                                                <img src={update} alt="logo-update" className='logo-edit' />
                                            </button>
                                            <button className='button-edit' onClick={() => deleteLearning(learning.id).then(() => navigate(0))}><img src={delte} alt="img-delete" className='img-delete'/></button>
                                        </td>
                                        </tr> 
                                    </tbody>
                                ))}
                        </table>
                    </div>
                </>
            )}
            {editLearning && (
                <EditLearning editLearningId={editLearningId} setLoading={setLoading} setEditLearning={setEditLearning}/>
            )}
        </div>
    );
}


export default LearningSelect;