import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getOneTribe, updateTribe } from '../../services/tribeServices';
import '../forms/css/Forms.css';
import Swal from 'sweetalert2';


const EditTribe = ({tribeId, setLoading, setEditable}) => {
  const { register, formState: { errors }, handleSubmit, setValue } = useForm();
  const [tribeData, setTribeData] = useState({});
 
  useEffect(() => {
    const fetchData = async () => {
      const response = await getOneTribe(tribeId);
      const tribeData = response.data;
      setTribeData(tribeData);
      setValue('name_tribe', tribeData.name_tribe);
      setValue('team_members', tribeData.team_members);
    };

    fetchData();
  }, [tribeId, setValue]);

  const onSubmit = async (tribeData) => {
    try {
      await updateTribe(tribeId, tribeData);
      Swal.fire('¡Los datos del elemento han sido actualizados correctamente!');
      setLoading(true);
      setEditable(false);
    } catch (error) {
      console.error('Error al actualizar el elemento:', error);
      alert('Error al actualizar el elemento. Por favor, intenta nuevamente.');
    }
  };
        
  return (
    <div className="form-container">
      <form className='form-create' onSubmit={handleSubmit(onSubmit)}>
        <h2>EDITAR TRIBU</h2>
        <div className='items'>
          <label className='label-item'>Nombre de la Tribu</label>
          <input type="text" rows="10" cols="50" name="name_tribe" defaultValue={tribeData.name_tribe} {...register('name_tribe', { required: true })}/>
          {errors.model?.type === 'required' && <p className="error-message">El campo modelo es requerido</p>} 
        </div>
        <div className='items'>
          <label className='label-item'>Miembros de la tribu</label>
          <textarea type="text" rows="10" cols="50" name="team_members" defaultValue={tribeData.team_members} {...register('team_members', { required: true })}/>
          {errors.model?.type === 'required' && <p className="error-message">El campo modelo es requerido</p>} 
        </div>
        <input className='button-forms' type="submit" value="Editar" />
        <button className='button-forms' onClick={() => setEditable(false)}>Cerrar</button>
      </form>
      </div>
  );
}

export default EditTribe;