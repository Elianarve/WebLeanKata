import {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {getOneMentalContrast, updateMentalContrast} from '../../services/mentalContrastServices';
import '../forms/css/Forms.css';

const EditMentalContrast = ({editMentalId, setLoading, setEditMental}) => {
    const {register, formState: {errors}, handleSubmit,setValue} = useForm();
    const [mentalContrastData, setMentalContrastData] = useState({});

    useEffect (() => {
        const fetchData = async () => {
            const response = await getOneMentalContrast(editMentalId);
            const mentalContrastData = response.data;
            setMentalContrastData(mentalContrastData);
            setValue("points", mentalContrastData.points);
            setValue("devaluation_date", mentalContrastData.evaluation_date);
        };
        fetchData();
    }, [editMentalId, setValue]); 
    
    const onSubmit = async (mentalContrastData) => {
        try {
            await updateMentalContrast(editMentalId, mentalContrastData);
            alert('¡Los datos del contraste mental han sido actualizados correctamente!');
            setLoading(true);
            setEditMental(false);
        } catch (error) {
            console.error('Error al actualizar el contraste mental:', error);
            alert('Error al actualizar el contraste mental. Por favor, intenta nuevamente.');
        }
    };

    return (
        <div className="form-container">
        <h2>Editar Contraste Mental</h2>

        <form className='form-create' onSubmit={handleSubmit(onSubmit)}>
            <div className='items'>
                <label className='label-item'>Puntos</label>
                <input rows="10" cols="50" name="points" defaultValue={mentalContrastData.points} {...register('points', {required: true})}/>
                {/* {errors.points && <p className="error-message">Los puntos son requeridos</p>} */}
            </div>
            <div className='items'>
                <label className='label-item'>Fecha de evaluación</label>
                <input type="date" name="evaluation_date" defaultValue={mentalContrastData.evaluation_date} {...register('evaluation_date', {required: true})}/>
                {/* {errors.evaluation_date && <p className="error-message">La fecha de evaluación es requerida</p>} */}
            </div>
            <button type="submit" className='button'>Editar</button>
            <button onClick={() => setEditMental(false)}>Cerrar</button>
        </form>
        </div>
    );
}

export default EditMentalContrast;