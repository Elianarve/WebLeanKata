import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getOneTribe, updateTribe } from '../../services/tribeServices';
import '../forms/css/Forms.css';

const EditTribe = ({tribuId, setLoading, setEditable}) => {
  const { register, formState: { errors }, handleSubmit, setValue } = useForm();
  const [tribeData, setTribeData] = useState({});
 
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await getOneTribe(tribuId);
      const tribeData = response.data;
      setTribeData(tribeData);
      setValue('name_tribe', tribeData.name_tribe);
      setValue('team_members', tribeData.team_members);
    };

    fetchData();
  }, [tribuId, setValue]);

  const onSubmit = async (tribeData) => {
    try {
      await updateTribe(tribuId, tribeData);
      alert('¡Los datos del elemento han sido actualizados correctamente!');
      setLoading(true);
      setEditable(false);
    } catch (error) {
      console.error('Error al actualizar el elemento:', error);
      alert('Error al actualizar el elemento. Por favor, intenta nuevamente.');
    }
  };
        
  return (
    <div className="form-container">
        <h2>Editar proceso</h2>

      <form className='form-create' onSubmit={handleSubmit(onSubmit)}>
        <h2>Editar Tribu</h2>
        <div className='items'>
          <label className='label-item'>Nombre de la Tribu</label>
          <input type="text" rows="10" cols="50" name="name_tribe" defaultValue={tribeData.name_tribe} {...register('name_tribe', { required: true })}/>
          {/* {errors.model?.type === 'required' && <p className="error-message">El campo modelo es requerido</p>}  */}
        </div>
        <div className='items'>
          <label className='label-item'>Miembros de la tribu</label>
          <textarea type="text" rows="10" cols="50" name="team_members" defaultValue={tribeData.team_members} {...register('team_members', { required: true })}/>
          {/* {errors.model?.type === 'required' && <p className="error-message">El campo modelo es requerido</p>}  */}
        </div>
        <div className='buttons-container'>
        <input className="edit-button" type="submit" value="Editar" />
        <button className='close-button' onClick={() => setEditable(false)}>Cerrar</button>
       </div>
      </form>
      </div>
  );
}

export default EditTribe;