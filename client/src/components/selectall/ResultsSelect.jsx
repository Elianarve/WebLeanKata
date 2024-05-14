import { useState, useEffect } from 'react';
import { getResult, deleteResult } from '../../services/resultServices'; 
import { useNavigate } from 'react-router-dom';
import '../selectall/SelectAllChallenges.css';
import update from '../../assets/img/Edit-File.svg';
import delte from '../../assets/img/delete.svg';
import LearningSelect from './LearningSelect';
import EditResult from '../edit/EditResult';


const ResultsSelect = ({experiment}) => {
    const [results, setResults] = useState([]);
    const navigate = useNavigate();
    const [editable, setEditable] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchResult = async () => {
            try {
                const arrayResultId = [];
                const resultData = await getResult();
                experiment.map(item =>{ 
                    const resultId = item.id

                    arrayResultId.push(resultId);  
                });
                const arrayResultFiltered = [];
                arrayResultId.map(experimentId => {
                    const resultFiltered = resultData.filter(state => state.experiment_id === experimentId );
                    arrayResultFiltered.push(...resultFiltered); 
                })
                setResults(arrayResultFiltered);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching Challenges:', error);
            }
        };
    
        fetchResult ();
    }, [experiment, loading]);

  return (
    <div className='container-challenge'>
    {results.length > 0 && (
        <>
        <h3>RESULTADOS</h3>
            <div className="centered-table">
                <table className='container-table'>
                        {results.map((result) => (
                            <tbody className='tr-table' key={result.id}>
                                <tr>
                                <td className='title-table'>Resultado ID</td>
                                <td className='tr-table'>{result.id}</td>
                                </tr>
                                <tr>
                                <td className='title-table'>Experimento ID</td>
                                <td className='tr-table'>{result.experiment_id}</td>
                                </tr>
                                <tr>
                                <td className='title-table'>Descripción</td>
                                <td className='tr-table'>{result.description}</td>
                                </tr>
                                <tr>
                                <td className='title-table'>Fecha</td>
                                <td className='tr-table'>{result.date}</td>
                                </tr>
                                <tr>
                                <td className='title-table'>Analisis</td>
                                <td className='tr-table'>{result.analysis}</td> 
                                </tr>
                                <tr>
                                <td className='title-table'>Resultados esperados</td>
                                <td className='tr-table'>{result.expected_results}</td>
                                </tr>
                                <tr>
                                <td className='title-table'>Resultados obtenidos</td>
                                <td className='tr-table'>{result.results_obtained}</td>
                                </tr>
                                <tr>
                                <td className='title-table'>Conclusion</td>
                                <td className='tr-table'>{result.conclusion}</td>
                                </tr>
                                <tr>
                                <td className='title-table'>Siguiente paso</td>
                                <td className='tr-table'>{result.next_step}</td>
                                </tr>
                                <tr>
                                <td className='title-table'>Acciones</td>
                                <td className='container-button'>
                                    <button className='button-edit' onClick={() => setEditable(true)}>
                                        <img src={update} alt="logo-update" className='logo-edit' />
                                    </button>
                                    <button className='button-add-t' onClick={() => navigate(`/learning`)}>Añadir Aprend</button>
                                    <button className='button-edit' onClick={() => deleteResult(result.id).then(() => navigate(0))}><img src={delte} alt="img-delete" className='img-delete'/></button>
                                </td>
                                </tr>
                            </tbody>
                         ))} 
                </table>
            </div>
        </>
    )}
    {editable && results.map((result) => (
        <EditResult key={result.id} resultId={result.id} setLoading={setLoading} setEditable={setEditable}/>
    ))}
    <LearningSelect result={results}/>
</div>

);
}


export default ResultsSelect