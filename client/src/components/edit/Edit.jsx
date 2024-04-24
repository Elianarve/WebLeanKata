import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { updateItem, getOneReto, uploadImage } from '../../services/Retoservice';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

const Edit = () => {
  const { id } = useParams();
  const { register, formState: { errors }, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [retoData, setRetoData] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const retoData = await getOneReto(id);
        setRetoData(retoData);
        reset(retoData); // Reset the form with retrieved data
      } catch (error) {
        console.error('Error fetching Reto data:', error);
      }
    };

    fetchData();
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const imageData = new FormData();
      imageData.append("file", data.image[0]);
      imageData.append("upload_preset", "Presents_react");

      const response = await uploadImage(imageData);
      const updatedData = { ...data, image: response.secure_url };

      await updateItem(id, updatedData);
      alert('¡Los datos del elemento han sido actualizados correctamente!');
    } catch (error) {
      console.error('Error al actualizar el elemento:', error);
      alert('Error al actualizar el elemento. Por favor, intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Nombre</label>
        <input type="text" {...register('name', { required: true })} defaultValue={retoData?.name} />
        {errors.name && <p className="error-message">El nombre es requerido</p>}
      </div>
      <div>
        <label>Estado</label>
        <input type="text" {...register('estado', { required: true })} defaultValue={retoData?.estado} />
        {errors.estado && <p className="error-message">El estado es requerido</p>}
      </div>
      <div>
        <label>Objetivo</label>
        <input type="text" {...register('objetivo', { required: true })} defaultValue={retoData?.objetivo} />
        {errors.objetivo && <p className="error-message">El objetivo es requerido</p>}
      </div>
      <div>
        <label>Obstáculo</label>
        <input type="text" {...register('obstaculo', { required: true })} defaultValue={retoData?.obstaculo} />
        {errors.obstaculo && <p className="error-message">El obstáculo es requerido</p>}
      </div>
      <div>
        <label>Experimento</label>
        <select {...register('experimento', { required: true })} defaultValue={retoData?.experimento}>
          <option value="1">Experimento 1</option>
          <option value="2">Experimento 2</option>
          <option value="3">Experimento 3</option>
        </select>
        {errors.experimento && <p className="error-message">El experimento es requerido</p>}
      </div>
      <div>
        <label>Hipótesis</label>
        <input type="text" {...register('hipotesis', { required: true })} defaultValue={retoData?.hipotesis} />
        {errors.hipotesis && <p className="error-message">La hipótesis es requerida</p>}
      </div>
      <div>
        <label>Descripción</label>
        <input type="text" {...register('descripcion', { required: true })} defaultValue={retoData?.descripcion} />
        {errors.descripcion && <p className="error-message">La descripción es requerida</p>}
      </div>
      <div>
        <label>Metodología</label>
        <input type="text" {...register('metodologia', { required: true })} defaultValue={retoData?.metodologia} />
        {errors.metodologia && <p className="error-message">La metodología es requerida</p>}
      </div>
      <div>
        <label>Grupo de Control</label>
        <input type="text" {...register('grupo_de_control', { required: true })} defaultValue={retoData?.grupo_de_control} />
        {errors.grupo_de_control && <p className="error-message">El grupo de control es requerido</p>}
      </div>
      <div>
        <label>Criterios de Éxito</label>
        <input type="text" {...register('criterios_de_exito', { required: true })} defaultValue={retoData?.criterios_de_exito} />
        {errors.criterios_de_exito && <p className="error-message">Los criterios de éxito son requeridos</p>}
      </div>
      <div>
        <label>Adjuntar imagen</label>
        <input type="file" {...register('image', { required: true })} />
        {errors.image && <p className="error-message">Por favor adjunta una imagen</p>}
      </div>
      <button className="edit-button" onClick={() => navigate(`/Edit/${reto.id}`)}>
        <img src="src\assets\img\Edit.png" alt="Editar" />
              </button>
          <button className="delete-button" onClick={() => { const confirmDelete = window.confirm('¿Deseas eliminar esta bicicleta?'); if (confirmDelete) { handleDelete(bicycle.id, bicycle.image); navigate(0)}}}>
                <img src="src\assets\img\Delete.png" alt="Eliminar"/>
          </button>
    </form>
    
  );
}

export default Edit;