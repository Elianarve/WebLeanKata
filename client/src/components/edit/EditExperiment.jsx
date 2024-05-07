import {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {getOneExperiment, updateExperiment, deleteExperiment} from '../../services/experimentServices';
import '../forms/css/Forms.css';


const EditExperimet = () => {
    const {id} = useParams();
    const {register, formState: {errors}, handleSubmit, reset, setValue} = useForm();
    const [experimentData, setExperimentData] = useState({});
    const navigate = useNavigate();

    useEffect (() => {
        const fetchData = async () => {
            const response = await getOneExperiment(id);
            const experimentData = response.data;
            setExperimentData(experimentData);
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
        };
        fetchData();
    }, [id, setValue]);

    const onSubmit = async (experimentData) => {
        try {
            await updateExperiment(id, experimentData);
            alert('¡Los datos del experimento han sido actualizados correctamente!');
            reset();
        } catch (error) {
            console.error('Error al actualizar el experimento:', error);
            alert('Error al actualizar el experimento. Por favor, intenta nuevamente.');
        }
    };

    return (
        <form className='form-create' onSubmit={handleSubmit(onSubmit)}>
            <h2>Editar Experimento</h2>
            <div className='items'>
                <label className='label-item'>Descripción</label>
                <textarea rows="10" cols="50" name="description" defaultValue={experimentData.description} {...register('description', {required: true})}/>
                {/* {errors.description && <p className="error-message">La descripción es requerida</p>} */}
            </div>
            <div className='items'>
                <label className='label-item'>Fecha de inicio</label>
                <input type="date" name="start_date" defaultValue={experimentData.start_date} {...register('start_date', {required: true})}/>
                {/* {errors.start_date && <p className="error-message">La fecha de inicio es requerida</p>} */}
            </div>
            <div className='items'>
                <label className='label-item'>Fecha de fin</label>
                <input type="date" name="end_date" defaultValue={experimentData.end_date} {...register('end_date', {required: true})}/>
                {/* {errors.end_date && <p className="error-message">La fecha de fin es requerida</p>} */}
            </div>
            <div className='items'>
                <label className='label-item'>Objetivos</label>
                <textarea rows="10" cols="50" name="goals" defaultValue={experimentData.goals} {...register('goals', {required: true})}/>
                {/* {errors.goals && <p className="error-message">Los objetivos son requeridos</p>} */}
            </div>
            <div className='items'>
                <label className='label-item'>Metodología</label>
                <textarea rows="10" cols="50" name="methodology" defaultValue={experimentData.methodology} {...register('methodology', {required: true})}/>
                {/* {errors.methodology && <p className="error-message">La metodología es requerida</p>} */}
            </div>
            <div className='items'>
                <label className='label-item'>Variables</label>
                <textarea rows="10" cols="50" name="variables" defaultValue={experimentData.variables} {...register('variables', {required: true})}/>
                {/* {errors.variables && <p className="error-message">Las variables son requeridas</p>} */}
            </div>
            <div className='items'>
                <label className='label-item'>Grupo de control</label>
                <textarea rows="10" cols="50" name="control_group" defaultValue={experimentData.control_group} {...register('control_group', {required: true})}/>
                {/* {errors.control_group && <p className="error-message">El grupo de control es requerido</p>} */}
            </div>
            <div className='items'>
                <label className='label-item'>Criterios de éxito</label>
                <textarea rows="10" cols="50" name="success_criteria" defaultValue={experimentData.success_criteria} {...register('success_criteria', {required: true})}/>
                {/* {errors.success_criteria && <p className="error-message">Los criterios de éxito son requeridos</p>} */}
            </div>
            <div className='items'>
                <label className='label-item'>Responsable</label>
                <input type="text" name="responsible" defaultValue={experimentData.responsible} {...register('responsible', {required: true})}/>
                {/* {errors.responsible && <p className="error-message">El responsable es requerido</p>} */}
            </div>
            <div className='items'>
                <label className='label-item'>Estado del experimento</label>
                <select name="state_experiment" defaultValue={experimentData.state_experiment} {...register('state_experiment', {required: true})}>
                    <option value="En proceso">En proceso</option>
                    <option value="Finalizado">Finalizado</option>
                </select>
                {/* {errors.state_experiment && <p className="error-message">El estado del experimento es requerido</p>} */}
            </div>
            <button onClick={() => deleteExperiment(id).then(() => navigate("/home")) }>Eliminar</button>
            <input type="submit" value="Editar" />
        </form>
    );
}

export default EditExperimet;
        