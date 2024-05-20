import { useState, useEffect } from 'react';
import { getTask, deleteTask } from '../../services/taskServices'; 
import { useNavigate } from 'react-router-dom';
import './css/SelectAll.css';
import update from "../../assets/img/EditButton.svg";
import more from '../../assets/img/Plus.svg';
import delte from '../../assets/img/delete.svg';
import EditTask from '../edit/EditTask';

const TaskSelect = ({experiment}) => {
    const [tasks, setTask] = useState([]);
    const navigate = useNavigate();
    const [editTask, setEdiTask] = useState(false);
    const [editTaskId, setEditTaskId] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const arrayTaskId = [];
                const taskData = await getTask();
                experiment.map(item =>{ 
                    const taskId = item.id

                    arrayTaskId.push(taskId);  
                });
                const arrayTaskFiltered = [];
                arrayTaskId.map(experimentId => {
                    const taskFiltered = taskData.filter(state => state.experiment_id === experimentId );
                    arrayTaskFiltered.push(...taskFiltered); 
                })
                setTask(arrayTaskFiltered);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching Challenges:', error);
            }
        };
    
        fetchTask ();
    }, [experiment, loading]);

  return (
    <div className='container-challenge' style={{ width: '100%' }}>
    {tasks.length > 0 && (
        <>
        <h3>TAREAS</h3>
            <div className="centered-table">
                <table className='container-table'>
                        {tasks.map((task) => (
                            <tbody key={task.id}>
                                <tr className='tr-table'>
                                <td className='title-table'>Tarea ID</td>
                                <td className='tr-table'>{task.id}</td>
                                </tr>
                                <tr className='tr-table'>
                                <td className='title-table'>Experimento ID</td>
                                <td className='tr-table'>{task.experiment_id}</td>
                                </tr>
                                <tr className='tr-table'>
                                <td className='title-table'>Descripción</td>
                                <td className='tr-table'>{task.description}</td>
                                </tr>
                                <tr className='tr-table'>
                                <td className='title-table'>Responsable</td>
                                <td className='tr-table'>{task.responsible}</td>
                                </tr>
                                <tr className='tr-table'>
                                <td className='title-table'>Fecha de inicio</td>
                                <td className='tr-table'>{task.start_date}</td>
                                </tr>
                                <tr className='tr-table'>
                                <td className='title-table'>Fecha final prevista</td>
                                <td className='tr-table'>{task.end_date_prev}</td>
                                </tr>
                                <tr className='tr-table'>
                                <td className='title-table'>Fecha final real</td>
                                <td className='tr-table'>{task.end_date_real}</td>
                                </tr>
                                <tr className='tr-table'>
                                <td className='title-table'>Estado</td>
                                <td className='tr-table'>{task.state}</td>
                                </tr>
                                <tr className='tr-table'>
                                <td className='title-table'>Acciones</td>
                                <td className='container-button'>
                                    <button title='Editar' className='CardActionButtonContainer' onClick={() => {setEditTaskId(task.id), setEdiTask(true)}} >
                                        <img src={update} alt="logo-update" className='edit' />
                                    </button>
                                    <button title='Eliminar' className='CardActionButtonContainer' onClick={() => {deleteTask(task.id), setLoading(true)}}><img src={delte} alt="img-delete" className='delete'/></button>
                                </td>
                                </tr>
                            </tbody>
                         ))} 
                </table>
            </div>
        </>
    )}
    {editTask &&  (
        <EditTask editTaskId={editTaskId} setLoading={setLoading} setEdiTask={setEdiTask}/>
    )}
</div>

);
}


export default TaskSelect