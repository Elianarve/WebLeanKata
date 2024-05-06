import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOneTask, updateTask } from "../../services/taskServices";
import { useForm } from "react-hook-form";
import "../forms/css/Forms.css";

const EditTask = () => {
    const { id } = useParams();
    const { handleSubmit, setValue } = useForm();
    const [taskData, setTaskData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const taskData = await getOneTask(id);
                setTaskData(taskData);
                setValue("description", taskData.description);
                setValue("date", taskData.date);
            } catch (error) {
                setLoading(false);
                setError(error.message);
                console.error("Error al obtener la tarea:", error);
            }
        };
        fetchTask();
    }, [id, setValue]);

    if (loading) {
        return <div>Cargando...</div>;
    }
    
    if (!taskData) {
        return <div>No se encontró la tarea</div>;
    }

    const onSubmit = async (taskData) => {
        try {
            await updateTask(id, taskData);
        } catch (error) {
            console.error("Error al editar la tarea:", error);
        }
    };

    return (
        <form className="form-create" onSubmit={handleSubmit(onSubmit)}>
            <h2>EDITAR TAREA:</h2>
            <div className="items">
                <label className="label-item">Descripción</label>
                <input type="text" name="description" defaultValue={taskData.description} />
            </div>
            <div className="items">
                <label className="label-item">Fecha</label>
                <input type="date" name="date" defaultValue={taskData.date} />
            </div>
            <button type="submit" className="submit-button">Editar</button>
        </form>
    );
}

export default EditTask;   