import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOneExperiment, updateExperiment } from "../../services/experimentServices";
import { useForm } from "react-hook-form";
// import '../forms/css/Forms.css';

const EditExperiment = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { handleSubmit, setValue } = useForm();
    const [experimentData, setExperimentData] = useState({});
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExperiment = async () => {
            try {
                const experimentData = await getOneExperiment(id);
                console.log("Datos del experimento:", experimentData); //💖datos llegado o
                setExperimentData(experimentData);
                setValue("id", experimentData.id);
                setValue("description", experimentData.description);
                setValue("start_date", experimentData.start_date);
                setValue("end_date", experimentData.end_date);
                setValue("goals", experimentData.goals);
                setValue("methodology", experimentData.methodology);    
                setValue("variables", experimentData.variables);
                setValue("control_group", experimentData.control_group);
                setValue("success_criteria", experimentData.success_criteria);
                setValue("responsible", experimentData.responsible);
                setValue("state_experiment", experimentData.state_experiment);

            } catch (error) {
                // setLoading(false);
                // setError(error.message)
                console.error("Error al obtener el experimento:", error);
            }
        };
        fetchExperiment();
    }, [id, setValue]);

    // if (loading) {
    //   return <div>Cargando...</div>;
    // }

    // if (!experimentData) {
    //   return <div>No se encontró el experimento</div>;
    // }

    const onSubmit = async (experimentData) => {
        try {
            await updateExperiment(id, experimentData);
            navigate("/");
        } catch (error) {
            console.error("Error al editar el experimento:", error);
        }
    }

    return (
        <form className="form-create" onSubmit={handleSubmit(onSubmit)}>
            <h2>EDITAR EXPERIMENTO:</h2>
            <div className="items">
                <label className="label-item">Descripción</label>
                <input type="text" name="description" defaultValue={experimentData.description} />
            </div>
            <div className="items">
                <label className="label-item">Fecha de inicio</label>
                <input type="date" name="start_date" defaultValue={experimentData.start_date} />
            </div>
            <div className="items">
                <label className="label-item">Fecha de fin</label>
                <input type="date" name="end_date" defaultValue={experimentData.end_date} />
            </div>
            <div className="items">
                <label className="label-item">Objetivos</label>
                <input type="text" name="goals" defaultValue={experimentData.goals} />
            </div>
            <div className="items">
                <label className="label-item">Metodología</label>
                <input type="text" name="methodology" defaultValue={experimentData.methodology} />
            </div>
            <div className="items">
                <label className="label-item">Variables</label>
                <input type="text" name="variables" defaultValue={experimentData.variables} />
            </div>
            <div className="items">
                <label className="label-item">Grupo de control</label>
                <input type="text" name="control_group" defaultValue={experimentData.control_group} />
            </div>
            <div className="items">
                <label className="label-item">Criterios de éxito</label>
                <input type="text" name="success_criteria" defaultValue={experimentData.success_criteria} />
            </div>
            <div className="items">
                <label className="label-item">Responsable</label>
                <input type="text" name="responsible" defaultValue={experimentData.responsible} />
            </div>
            <div className="items">
                <label className="label-item">Estado del experimento</label>
                <input type="text" name="state_experiment" defaultValue={experimentData.state_experiment} />
            </div>
            <button type="submit">Enviar</button>
        </form>
    );
}

export default EditExperiment;