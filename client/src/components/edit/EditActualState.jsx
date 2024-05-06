import { useState, useEffect } from 'react';
import {  useParams } from 'react-router-dom';
import { getOneActualState, updateActualState } from '../../services/actualStateServices';
import { useForm } from 'react-hook-form';
// import '../forms/css/Forms.css';

const EditActualState = () => {
  const {id} = useParams();
  // const navigate = useNavigate();
  const { handleSubmit, setValue } = useForm();
  const [actualStateData, setActualStateData] = useState({});
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActualState = async () => {
      try {
        const actualStateData = await getOneActualState(id);
        setActualStateData(actualStateData);
        setValue('description', actualStateData.description);
        setValue('date', actualStateData.date);
      } catch (error) {
        // setLoading(false);
        // setError(error.message)
        console.error('Error al obtener el estado actual:', error);
      }
    };
    fetchActualState();
  }, [id, setValue]);

  // if (loading) {
  //   return <div>Cargando...</div>;
  // }

  // if (!actualStateData) {
  //   return <div>No se encontró el estado actual</div>;
  // }


  const onSubmit = async (actualStateData) => {
    try {
  await updateActualState(id, actualStateData);
  console.log(actualStateData + "holaaaaaaaaaaa")
      
      // navigate('/edit');
    } catch (error) {
      console.error('Error al editar el estado actual:', error);
    }
  };

  return (
    <form className='form-create' onSubmit={handleSubmit(onSubmit)}>
      <h2>EDITAR ESTADO ACTUAL:</h2>
      <div className='items'>
        <label className='label-item'>Descripción</label>
        <input type="text" name='description' defaultValue={actualStateData.description } />
      </div>
      <div className='items'>
        <label className='label-item'>Fecha</label>
        <input type="date" name='date' defaultValue={actualStateData.date } />
      </div>
      <button type="submit">Guardar Cambios</button>
    </form>
  );
};

export default EditActualState;