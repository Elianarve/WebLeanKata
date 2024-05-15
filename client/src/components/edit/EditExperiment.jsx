import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getOneExperiment, updateExperiment, uploadImage } from '../../services/experimentServices';
import '../forms/css/Forms.css';

const EditExperiment = ({ editExperimentId, setLoading, setEditExperiment }) => {
    const { register, formState: { errors }, handleSubmit, setValue } = useForm();
    const [experimentData, setExperimentData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getOneExperiment(editExperimentId);
                const experimentData = response.data;
                setExperimentData(experimentData);

                Object.keys(experimentData).forEach((key) => {
                    setValue(key, experimentData[key]);
                });
            } catch (error) {
                console.error('Error fetching experiment data:', error);
            }
        };
        fetchData();
    }, [editExperimentId, setValue]);

    const onSubmit = async (data) => {
        try {
            const imageData = new FormData();
            imageData.append("file", data.image[0]);
            imageData.append("upload_preset", "leankata");

            const response = await uploadImage(imageData);
            const updatedData = { ...data, image: response.secure_url };

            await updateExperiment(editExperimentId, updatedData);
            alert('¡Los datos del experimento han sido actualizados correctamente!');
            setLoading(true);
            setEditExperiment(false);
        } catch (error) {
            console.error('Error al actualizar el experimento:', error);
            alert('Error al actualizar el experimento. Por favor, intenta nuevamente.');
        }
    };

    return (
        <div className="form-container">
            <h2>Editar Experimento</h2>
            <form className='form-create' onSubmit={handleSubmit(onSubmit)}>
                <div className='items'>
                    <label className='label-item'>Descripción</label>
                    <textarea rows="10" cols="50" name="description" defaultValue={experimentData.description} {...register('description', { required: true })} />
                    {errors.description && <p className="error-message">La descripción es requerida</p>}
                </div>
                <div className='items'>
                    <label className='label-item'>Fecha de inicio</label>
                    <input type="date" name="start_date" defaultValue={experimentData.start_date} {...register('start_date', { required: true })} />
                    {errors.start_date && <p className="error-message">La fecha de inicio es requerida</p>}
                </div>
                <div className='items'>
                    <label className='label-item'>Fecha de fin</label>
                    <input type="date" name="end_date" defaultValue={experimentData.end_date} {...register('end_date', { required: true })} />
                    {errors.end_date && <p className="error-message">La fecha de fin es requerida</p>}
                </div>
                <div className='items'>
                    <label className='label-item'>Imagen</label>
                    <input type="file" name="image" {...register('image', { required: true })} />
                    {errors.image && <p className="error-message">La imagen es requerida</p>}

                </div>
                <div className='items'>
                    <label className='label-item'>Hipótesis</label>
                    <input type="text" name="hypothesis" defaultValue={experimentData.hypothesis} {...register('hypothesis', { required: true })} />
                    {errors.hypothesis && <p className="error-message">La hipótesis es requerida</p>}
                </div>
                <div className='items'>
                    <label className='label-item'>Método</label>
                    <input type="text" name="method" defaultValue={experimentData.method} {...register('method', { required: true })} />
                    {errors.method && <p className="error-message">El método es requerido</p>}
                </div>
                <div className='items'>
                    <label className='label-item'>Resultados</label>
                    <input type="text" name="results" defaultValue={experimentData.results} {...register('results', { required: true })} />
                    {errors.results && <p className="error-message">Los resultados son requeridos</p>}
                </div>
                <div className='items'>
                    <label className='label-item'>Conclusiones</label>
                    <input type="text" name="conclusions" defaultValue={experimentData.conclusions} {...register('conclusions', { required: true })} />
                    {errors.conclusions && <p className="error-message">Las conclusiones son requeridas</p>}
                </div>                
                <div className='items'>
                    <label className='label-item'>Objetivos</label>
                    <input type="text" name="goals" defaultValue={experimentData.goals} {...register('goals', { required: true })} />
                    {errors.goals && <p className="error-message">Los objetivos son requeridos</p>}
                </div>
                <input type="submit" value="Editar" />
                <button onClick={() => setEditExperiment(false)}>Cerrar</button>
            </form>
        </div>
    );
}

export default EditExperiment;
