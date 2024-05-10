import { useState, useEffect } from 'react';
import { getTask, deleteTask } from '../../services/taskServices'; 
import { useNavigate } from 'react-router-dom';
import '../selectall/SelectAllChallenges.css';
import update from '../../assets/img/Edit-File.svg';
// import more from '../../assets/img/Plus.svg';
import delte from '../../assets/img/delete.svg';

const TaskSelect = ({experiment}) => {
    const [tasks, setTask] = useState([]);
    const navigate = useNavigate();

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
            } catch (error) {
                console.error('Error fetching Challenges:', error);
            }
        };
    
        fetchTask ();
    }, [experiment]);

  return (
    <div className='container-challenge'>
    {tasks.length > 0 && (
        <>
        <h3>Tareas</h3>
            <div className="centered-table">
                <table className='container-table'>
                    <thead>
                        <tr>
                            <th className='title-table'>Tarea ID</th>
                            <th className='title-table'>Experimento ID</th>
                            <th className='title-table'>Descripción</th>
                            <th className='title-table'>Responsable</th>
                            <th className='title-table'>Fecha de inicio</th>
                            <th className='title-table'>Fecha final prevista</th>
                            <th className='title-table'>Fecha final real</th>
                            <th className='title-table'>Estado</th>
                            <th className='title-table'>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task) => (
                            <tr key={task.id}>
                                <td>{task.id}</td>
                                <td>{task.experiment_id}</td>
                                <td>{task.description}</td>
                                <td>{task.responsible}</td>
                                <td>{task.start_date}</td>
                                <td>{task.end_date_prev}</td>
                                <td>{task.end_date_real}</td>
                                <td>{task.state}</td>
                                <td>
                                    <button className='button-edit' onClick={() => navigate(`/edittask/${task.id}`)}>
                                        <img src={update} alt="logo-update" className='logo-edit' />
                                    </button>
                                    {/* <button className='button-edit' onClick={() => navigate(`/experiment`)}><img src={more} alt="" /></button> */}
                                    <button className='button-edit' onClick={() => deleteTask(task.id).then(() => navigate(0))}><img src={delte} alt="" /></button>

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


export default TaskSelect