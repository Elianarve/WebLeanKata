import { useState, useEffect } from 'react';
import { getExperiment, deleteExperiment } from '../../services/experimentServices'; 
import { useNavigate } from 'react-router-dom';
import '../selectall/SelectAllChallenges.css';
import update from '../../assets/img/Edit-File.svg';
import more from '../../assets/img/Plus.svg';
import delte from '../../assets/img/delete.svg';
import TaskSelect from './TaskSelect';
import ResultsSelect from './ResultsSelect';
import EditExperimet from '../edit/EditExperiment';

const Experiments = ({hypothesis}) => {
    const [experiments, setExperiments] = useState([]);
    const navigate = useNavigate();
    const [imgZoom, setImgZoom] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [editable, setEditable] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleClick = (image) => {
        setSelectedImage(image);
        setImgZoom(true);
        window.open(image, '_blank');
    };

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
                setLoading(false);
            } catch (error) {
                console.error('Error fetching Challenges:', error);
            }
        };
    
        fetchExperiment();
    }, [hypothesis, loading]);


  return (
    <div className='container-challenge'>
    {experiments.length > 0 && (
        <>
        <h3>EXPERIMENTOS <button className='button-add' onClick={() => navigate(`/experiment`)}><img src={more} alt="logo-plus" className='img-plus-ex'/></button></h3>
            <div className="centered-table">
                <table className='container-table'>
                        {experiments.map((experiment) => (
                            <tbody key={experiment.id}>
                                <tr>
                                <td className='title-table'>Experimento ID</td>
                                <td className='tr-table'>{experiment.id}</td>
                                </tr>
                                <tr>
                                <td className='title-table'>Hipotesis ID</td>
                                <td className='tr-table'>{experiment.hiphotesis_id}</td>
                                </tr>
                               <tr>
                               <td className='title-table'>Descripción</td>
                               <td className='tr-table'>{experiment.description}</td>
                               </tr>
                                <tr>
                                <td className='title-table'>Fecha de inicio</td>
                                <td className='tr-table'>{experiment.start_date}</td>
                                </tr>
                                <tr>
                                <td className='title-table'>Metas</td>
                                <td className='tr-table'>{experiment.goals}</td>
                                </tr>
                                <tr>
                                <td className='title-table'>Metodología</td>
                                <td className='tr-table'>{experiment.methodology}</td>
                                </tr>
                                <tr>
                                <td className='title-table'>Variables</td>
                                <td className='tr-table'>{experiment.variables}</td>
                                </tr>
                                <tr>
                                <td className='title-table'>Grupo de control</td>
                                <td className='tr-table'>{experiment.control_group}</td>
                                </tr>
                                <tr>
                                <td className='title-table'>Criterios de exito</td>
                                <td className='tr-table'>{experiment.success_criteria}</td>
                                </tr>
                                <tr>
                                <td className='title-table'>Responsable</td>
                                <td className='tr-table'>{experiment.responsible}</td>
                                </tr>
                                <tr>
                                <td className='title-table'>Estado del experimento</td>
                                <td className='tr-table'>{experiment.state_experiment}</td>
                                </tr>
                                <tr>
                                <td className='title-table'>Imagen</td>
                                <td><img className='img-form' src={experiment.image} alt="img-form" onClick={() => handleClick(experiment.image)} /></td>
                                </tr>
                                <tr>
                                <td className='title-table'>Acciones</td>
                                <td className='container-button'>
                                    <button className='button-edit' onClick={() => setEditable(true)} >
                                        <img src={update} alt="logo-update" className='logo-edit' />
                                    </button>
                                    <button className='button-add-t' onClick={() => navigate(`/task`)}>Crear Tarea</button>
                                    <button className='button-add-t' onClick={() => navigate(`/result`)}>Crear Resultado</button>
                                    <button className='button-edit' onClick={() => deleteExperiment(experiment.id).then(() => navigate(0))}><img src={delte} alt="img-delete" className='img-delete'/></button>
                                </td>
                                </tr>
                                <tr>
                                    <td className='title-table'></td>
                                    <td></td>
                                </tr>
                            </tbody>
                         ))} 
                                           
                </table>
            </div>
        </>
    )}
    {editable && experiments.map((experiment) => (                       
                <EditExperimet key={experiment.id} experimentId={experiment.id} setLoading={setLoading} setEditable={setEditable}/>
            ))}
    <TaskSelect experiment={experiments}/>
    <ResultsSelect experiment={experiments}/>
</div>

);
}

export default Experiments;