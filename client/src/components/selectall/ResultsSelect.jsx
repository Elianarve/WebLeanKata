import { useState, useEffect } from 'react';
import { getResult, deleteResult } from '../../services/resultServices'; 
import { useNavigate } from 'react-router-dom';
import '../selectall/SelectAllChallenges.css';
import update from '../../assets/img/Edit-File.svg';
import more from '../../assets/img/Plus.svg';
import delte from '../../assets/img/delete.svg';
import LearningSelect from './LearningSelect';


const ResultsSelect = ({experiment}) => {
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

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
            } catch (error) {
                console.error('Error fetching Challenges:', error);
            }
        };
    
        fetchResult ();
    }, [experiment]);

  return (
    <div className='container-challenge'>
    {results.length > 0 && (
        <>
        <h3>Resultados</h3>
            <div className="centered-table">
                <table className='container-table'>
                    <thead>
                        <tr>
                            <th className='title-table'>Resultado ID</th>
                            <th className='title-table'>Experimento ID</th>
                            <th className='title-table'>Descripción</th>
                            <th className='title-table'>Fecha</th>
                            <th className='title-table'>Analisis</th>
                            <th className='title-table'>Resultados esperados</th>
                            <th className='title-table'>Resultados obtenidos</th>
                            <th className='title-table'>Conclusion</th>
                            <th className='title-table'>Siguiente paso</th>
                            <th className='title-table'>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((result) => (
                            <tr key={result.id}>
                                <td>{result.id}</td>
                                <td>{result.experiment_id}</td>
                                <td>{result.description}</td>
                                <td>{result.date}</td>
                                <td>{result.analysis}</td>
                                <td>{result.expected_results}</td>
                                <td>{result.results_obtained}</td>
                                <td>{result.conclusion}</td>
                                <td>{result.next_step}</td>
                                <td>
                                    <button className='button-edit' onClick={() => navigate(`/editresult/${result.id}`)}>
                                        <img src={update} alt="logo-update" className='logo-edit' />
                                    </button>
                                    <button className='button-edit' onClick={() => navigate(`/learning`)}><img src={more} alt="" />Añadir aprendizaje</button>
                                    <button className='button-edit' onClick={() => deleteResult(result.id).then(() => navigate(0))}><img src={delte} alt="" /></button>

                                </td>
                            </tr>
                         ))} 
                        
                    </tbody>
                    
                </table>
            </div>
        </>
    )}
    <LearningSelect result={results}/>
</div>

);
}


export default ResultsSelect