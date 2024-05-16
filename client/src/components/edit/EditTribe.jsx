import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getOneTribe, updateTribe, deleteTribe } from '../../services/tribeServices';
import { useParams, useNavigate } from 'react-router-dom';
import '../forms/css/Forms.css';

const EditTribe = () => {
  const { id } = useParams();
  const { register, formState: { errors }, handleSubmit, reset, setValue } = useForm();
  const [tribeData, setTribeData] = useState({});
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await getOneTribe(id);
      const tribeData = response.data;
      setTribeData(tribeData);
      setValue('name_tribe', tribeData.name_tribe);
      setValue('team_members', tribeData.team_members);
    };

    fetchData();
  }, [id, setValue]);

  const onSubmit = async (tribeData) => {
    try {
      await updateTribe(id, tribeData);
      alert('¡Los datos del elemento han sido actualizados correctamente!');
      reset();
    } catch (error) {
      console.error('Error al actualizar el elemento:', error);
      alert('Error al actualizar el elemento. Por favor, intenta nuevamente.');
    }
  };
        
  return (
    <div className="form-container">
        <h2>Editar proceso</h2>

      <form className='form-create' onSubmit={handleSubmit(onSubmit)}>
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
        <button className="delete button" onClick={() => deleteTribe(id).then(() => navigate("/home")) }>Eliminar</button>
        <input className='edit button' type="submit" value="Editar" />
      </form>
      </div>
  );
}

export default EditTribe;