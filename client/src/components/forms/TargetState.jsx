import { useForm } from 'react-hook-form';
import './css/Forms.css';
import { postTargetState } from '../../services/targetStateServices';
import { useNavigate } from 'react-router-dom';

const TargetState = () => {
    const { handleSubmit, register, formState: { errors }, watch } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await postTargetState(data);
            console.log("Estado objetivo creado:", response.data);
            navigate('/contrast');
        } catch (error) {
            console.error("Error al crear el estado objetivo:", error);
        }
    };

    const validateDate = (value) => {
        const startDate = new Date(watch('start_date'));
        const endDate = new Date(value);
        return startDate < endDate; 
    };

    return (
        <form className='form-create' onSubmit={handleSubmit(onSubmit)}>
            <h2>Estado objetivo:</h2>
            <div className='items'>
                <label className='label-item'>Descripción</label>
                <input type="text" {...register('description', { required: true })} />
                {errors.description && <p className="error-message">La descripción es requerida</p>}
            </div>
            <div className='items'>
                <label className='label-item'>Fecha de Inicio:</label>
                <input type="date" {...register('start_date', { required: true })} />
                {errors.start_date && <p className="error-message">La fecha de inicio es requerida</p>}
            </div>
            <div className='items'>
                <label className='label-item'>Fecha de Meta:</label>
                <input type="date" {...register('date_goal', { 
                    required: true, 
                    validate: {
                        futureDate: validateDate 
                    } 
                })} />
                {errors.date_goal && errors.date_goal.type === 'futureDate' && <p className="error-message">La fecha de meta debe ser posterior a la fecha de inicio</p>}
                {errors.date_goal && errors.date_goal.type !== 'futureDate' && <p className="error-message">La fecha de meta es requerida</p>}
            </div>
            <button type="submit">Enviar</button>
        </form>
    )
}

export default TargetState;