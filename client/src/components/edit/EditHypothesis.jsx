import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getOneHypothesis, updateHypothesis} from "../../services/hypothesisServices";
import { useForm } from "react-hook-form";
import '../forms/css/Forms.css';

const EditHypothesis = ({hypothesisId, setLoading, setEditable }) => {
    const navigate = useNavigate();
    const {register, formState: {errors}, handleSubmit, setValue} = useForm();
    const [hypothesisData, setHypothesisData] = useState({});

    useEffect(() => {
        const fetchHypothesis = async () => {
                const reponse = await getOneHypothesis(hypothesisId);
                const hypothesisData = reponse.data;
                setHypothesisData(hypothesisData);
                setValue("description", hypothesisData.description);
                setValue("plan_date", hypothesisData.plan_date);
                setValue("state_hypothesis", hypothesisData.state_hypothesis);

        }
        fetchHypothesis();
    }, [hypothesisId, setValue]);

    const onSubmit = async (hypothesisData) => {
        try {
            await updateHypothesis(hypothesisId, hypothesisData);
            alert("¡Los datos de la hipótesis han sido actualizados correctamente!");
            navigate("/hypothesis");
            setLoading(true);
            setEditable(false);
        }
        catch (error) {
            console.error("Error al actualizar la hipótesis:", error);
            alert("Error al actualizar la hipótesis. Por favor, intenta nuevamente.");
        }
    }

    return (
        <div className="form-container">
        <h2>Editar Hipótesis</h2>

        <form className='form-create' onSubmit={handleSubmit(onSubmit)}>

            <div className='items'>
                <label className='label-item'>Descripción</label>
                <textarea rows="10" cols="50" name="description" defaultValue={hypothesisData.description} {...register('description', { required: true })} />
                {errors.description && <p className="error-message">La descripción es requerida</p>}
            </div>
            <div className='items'>
                <label className='label-item'>Fecha de planificación</label>
                <input type="date" name="plan_date" defaultValue={hypothesisData.plan_date} {...register('plan_date', { required: true })} />
                {errors.plan_date && <p className="error-message">La fecha de planificación es requerida</p>}
            </div>
            <div className='items'>
                <label className='label-item'>Estado de la hipótesis</label>
                <select name="state_hypothesis" defaultValue={hypothesisData.state_hypothesis} {...register('state_hypothesis', { required: true })}>
                    <option value="true">Activa</option>
                    <option value="false">Inactiva</option>
                </select>
                {errors.state_hypothesis && <p className="error-message">El estado de la hipótesis es requerido</p>}
            </div>
            <button type="submit" className='button'>Editar</button>
            <button onClick={() => setEditable(false)}>Cerrar</button>
        </form>
        </div>
    );
}

export default EditHypothesis;