import { useState, useEffect } from 'react';
import { getExperiment, deleteExperiment } from '../../services/experimentServices'; 
import { useNavigate } from 'react-router-dom';
import '../selectall/SelectAllChallenges.css';
import update from '../../assets/img/Edit-File.svg';
import more from '../../assets/img/Plus.svg';
import delte from '../../assets/img/delete.svg';
import TaskSelect from './TaskSelect';
import ResultsSelect from './ResultsSelect';

const Experiments = ({hypothesis}) => {
    const [experiments, setExperiments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchExperiment = async () => {
            try {
                const arrayHypothesisId = [];
                const experimentData = await getExperiment();
                hypothesis.map(item =>{ 
                    const hypothesisId = item.id

                    arrayHypothesisId.push(hypothesisId);  
                });
                const arrayExperimentFiltered = [];
                arrayHypothesisId.map(hypothesisId => {
                    const experimentfiltered = experimentData.filter(state => state.hiphotesis_id === hypothesisId );
                    arrayExperimentFiltered.push(...experimentfiltered); 
                })
                setExperiments(arrayExperimentFiltered);
            } catch (error) {
                console.error('Error fetching Challenges:', error);
            }
        };
    
        fetchExperiment();
    }, [hypothesis]);

  return (
    <div className='container-challenge'>
    {experiments.length > 0 && (
        <>
        <h3>Experimentos <button className='button-edit' onClick={() => navigate(`/experiment`)}><img src={more} alt="" /></button></h3>
            <div className="centered-table">
                <table className='container-table'>
                    <thead>
                        <tr>
                            <th className='title-table'>Experimento ID</th>
                            <th className='title-table'>Hipotesis ID</th>
                            <th className='title-table'>Descripción</th>
                            <th className='title-table'>Fecha de inicio</th>
                            <th className='title-table'>Metas</th>
                            <th className='title-table'>Metodología</th>
                            <th className='title-table'>Variables</th>
                            <th className='title-table'>Grupo de control</th>
                            <th className='title-table'>Criterios de exito</th>
                            <th className='title-table'>Responsable</th>
                            <th className='title-table'>Estado del experimento</th>
                            <th className='title-table'>Imagen</th>
                            <th className='title-table'>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {experiments.map((experiment) => (
                            <tr key={experiment.id}>
                                <td>{experiment.id}</td>
                                <td>{experiment.hiphotesis_id}</td>
                                <td>{experiment.description}</td>
                                <td>{experiment.start_date}</td>
                                <td>{experiment.goals}</td>
                                <td>{experiment.methodology}</td>
                                <td>{experiment.variables}</td>
                                <td>{experiment.control_group}</td>
                                <td>{experiment.success_criteria}</td>
                                <td>{experiment.responsible}</td>
                                <td>{experiment.state_experiment}</td>
                                <img className='img-form' src={experiment.image} alt="" />
                                <td>
                                    <button className='button-edit' onClick={() => navigate(`/editexperiment/${experiment.id}`)}>
                                        <img src={update} alt="logo-update" className='logo-edit' />
                                    </button>
                                    <button className='button-edit' onClick={() => navigate(`/task`)}>Crear Tarea</button>
                                    <button className='button-edit' onClick={() => navigate(`/result`)}>Crear Resultado</button>
                                    <button className='button-edit' onClick={() => deleteExperiment(experiment.id).then(() => navigate(0))}><img src={delte} alt="" /></button>
                                </td>
                            </tr>
                         ))} 
                        
                    </tbody>
                    
                </table>
            </div>
        </>
    )}
    <TaskSelect experiment={experiments}/>
    <ResultsSelect experiment={experiments}/>
</div>

);
}

export default Experiments;