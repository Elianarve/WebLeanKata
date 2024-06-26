import { useState, useEffect } from 'react';
import { getExperiment, deleteExperiment } from '../../services/experimentServices'; 
import { useNavigate } from 'react-router-dom';
import './css/SelectAll.css';
import update from "../../assets/img/EditButton.svg";
import delte from '../../assets/img/delete.svg';
import TaskSelect from './TaskSelect';
import ResultsSelect from './ResultsSelect';
import EditExperiment from '../edit/EditExperiment';
import Task from '../forms/Task';
import Result from '../forms/Result';
import taskLogo from '../../assets/img/taskButton.svg'
import experienceLogo from '../../assets/img/experienceButton.svg'

const ExperimentsSelect = ({hypothesis}) => {
    const [experiments, setExperiments] = useState([]);
    const navigate = useNavigate();
    const [imgZoom, setImgZoom] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [editExperiment, setEditExperiment] = useState(false);
    const [loading, setLoading] = useState(false);
    const [editExperimentId, setEditExperimentId] = useState();
    const [createTask, setCreateTask] = useState(false);
    const [createResult, setCreateResult] = useState(false);

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
                    const experimentfiltered = experimentData.filter(state => state.hyphotesis_id === hypothesisId );
                    arrayExperimentFiltered.push(...experimentfiltered); 
                })
                setExperiments(arrayExperimentFiltered);
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
            }
        };
    
        fetchExperiment();
    }, [hypothesis, loading]);


  return (
    <div className='container-challenge'>
    {experiments.length > 0 && (
        <>
        <h3>EXPERIMENTOS</h3>
            <div className="centered-table">
                <table className='container-table'>
                        {experiments.map((experiment) => (
                            <tbody key={experiment.id}>
                                <tr className='tr-table'>
                                <td className='title-table'>Experimento ID</td>
                                <td className='tr-table'>{experiment.id}</td>
                                </tr>
                                <tr className='tr-table'>
                                <td className='title-table'>Hipotesis ID</td>
                                <td className='tr-table'>{experiment.hyphotesis_id}</td>
                                </tr>
                               <tr className='tr-table'>
                               <td className='title-table'>Descripción</td>
                               <td className='tr-table'>{experiment.description}</td>
                               </tr>
                                <tr className='tr-table'>
                                <td className='title-table'>Fecha de inicio</td>
                                <td className='tr-table'>{experiment.start_date}</td>
                                </tr>
                                <tr className='tr-table'>
                                <td className='title-table'>Metas</td>
                                <td className='tr-table'>{experiment.goals}</td>
                                </tr>
                                <tr className='tr-table'>
                                <td className='title-table'>Metodología</td>
                                <td className='tr-table'>{experiment.methodology}</td>
                                </tr>
                                <tr className='tr-table'>
                                <td className='title-table'>Variables</td>
                                <td className='tr-table'>{experiment.variables}</td>
                                </tr>
                                <tr className='tr-table'>
                                <td className='title-table'>Grupo de control</td>
                                <td className='tr-table'>{experiment.control_group}</td>
                                </tr>
                                <tr className='tr-table'>
                                <td className='title-table'>Criterios de exito</td>
                                <td className='tr-table'>{experiment.success_criteria}</td>
                                </tr>
                                <tr className='tr-table'>
                                <td className='title-table'>Responsable</td>
                                <td className='tr-table'>{experiment.responsible}</td>
                                </tr>
                                <tr className='tr-table'>
                                <td className='title-table'>Estado del experimento</td>
                                <td className='tr-table'>{experiment.state_experiment}</td>
                                </tr>
                                <tr className='tr-table'>
                                <td className='title-table'>Imagen</td>
                                <td><img className='img-form' src={experiment.image} alt="img-form" onClick={() => handleClick(experiment.image)} /></td>
                                </tr>
                                <tr className='tr-table'>
                                <td className='title-table'>Acciones</td>
                                <td className='container-button'>
                                    <button title='Editar' className='CardActionButtonContainer' onClick={() => {setEditExperimentId(experiment.id), setEditExperiment(true)}} >
                                        <img src={update} alt="logo-update" className='edit' />
                                    </button>
                                    <button title='Añadir tarea' className='CardActionButtonContainer' onClick={() => {setEditExperimentId(experiment.id),setCreateTask(true) }}>
                                        <img src={taskLogo}/>
                                    </button>
                                    <button title='Añadir resultado' className='CardActionButtonContainer' onClick={() => {setEditExperimentId(experiment.id), setCreateResult(true)}}>
                                        <img src={experienceLogo}/>
                                    </button>
                                    <button title='Eliminar' className='CardActionButtonContainer' onClick={() => {deleteExperiment(experiment.id), setLoading(true)}}>
                                        <img src={delte} alt="img-delete" className='delete'/>
                                    </button>
                                </td>
                                </tr>
                            </tbody>
                         ))}              
                </table>
            </div>
        </>
    )}
    {editExperiment && (                       
            <EditExperiment editExperimentId={editExperimentId} setLoading={setLoading} setEditExperiment={setEditExperiment}/>
    )}
    {createTask && <Task editExperimentId={editExperimentId} setLoading={setLoading} setCreateTask={setCreateTask}/>}
    <TaskSelect experiment={experiments}/>
    
    {createResult && <Result editExperimentId={editExperimentId} setLoading={setLoading} setCreateResult={setCreateResult}/>}
    <ResultsSelect experiment={experiments}/>
</div>

);
}

export default ExperimentsSelect;