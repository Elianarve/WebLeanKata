import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getOneObstacle, updateObstacle, updateImage } from '../../services/obstacleServices';
import '../forms/css/Forms.css';

const EditObstacle = ({ editObstacleId, setLoading, setEditObstacle }) => {
  const { register, formState: { errors }, handleSubmit, setValue } = useForm();
  const [obstacleData, setObstacleData] = useState({});

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await getOneObstacle(editObstacleId);
              const obstacleData = response;
              console.log('obstacleData:', obstacleData);
              setObstacleData(obstacleData);
              setValue("description", obstacleData.description);
              setValue("image", obstacleData.image);

              Object.keys(obstacleData).forEach((key) => {
                  setValue(key, obstacleData[key]);
              });
          } catch (error) {
              console.error('Error fetching Obstacle data:', error);
          }
      };
      fetchData();
  }, [editObstacleId, setValue]);

  const onSubmit = async (data) => {
      try {
          const imageData = new FormData();
          imageData.append("file", data.image[0]);
          imageData.append("upload_preset", "leankata");

          const response = await updateImage(imageData);
          const updatedData = { ...data, image: response.secure_url };

          await updateObstacle(editObstacleId, updatedData);
          alert('¡Los datos del Obstáculo han sido actualizados correctamente!');
          setLoading(true);
          setEditObstacle(false);
      } catch (error) {
          console.error('Error al actualizar el Obstáculo:', error);
          alert('Error al actualizar el Obstáculo. Por favor, intenta nuevamente.');
      }
  };

  return (
      <div className="form-container">
          <form className='form-create' onSubmit={handleSubmit(onSubmit)}>
          <h2>Editar Obstáculo</h2>
              <div className='items'>
                  <label className='label-item'>Descripción</label>
                  <textarea rows="10" cols="50" name="description" defaultValue={obstacleData.description} {...register('description', { required: true })} />
                  {errors.description && <p className="error-message">La descripción es requerida</p>}
              </div>
              <div className='items'>
                    <label className='label-item'>Imagen</label>
                    <input type="file" name="image" {...register('image')} />
                    {obstacleData.image && (
                    <div className='image-container'>
                <img src={obstacleData.image} alt="experiment" />
                </div>)}
                </div>   
              <input type="submit" value="Editar" />
              <button onClick={() => setEditObstacle(false)}>Cerrar</button>
          </form>
      </div>
  );
}

export default EditObstacle;
