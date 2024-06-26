import { postObstacle, uploadImage } from '../../services/obstacleServices';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import './css/Forms.css';

const Obstacle = ({ editTargetId, setLoading, setEditObstacle }) => {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const [imageUrl, setImageUrl] = useState('');

  const onSubmit = async (data) => {
    try {
      if (data.image) {
        const imageData = new FormData();
        imageData.append("file", data.image[0]);
        imageData.append("upload_preset", "LeanKata");

        const responseImage = await uploadImage(imageData);
        setImageUrl(responseImage.secure_url);
        data = { ...data, image: responseImage.secure_url };
      }

      const dataF = { ...data, target_state_id: editTargetId };
      const response = await postObstacle(dataF);
      console.log("Obstaculo creado:", response.data);
      setLoading(true);
      setEditObstacle(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const closeForm = () => {
    setEditObstacle(false);
  };

  return (
    <div className="form-container">
    <form className='form-create' onSubmit={handleSubmit(onSubmit)}>
      <h2>CREAR OBSTACULO</h2>
      <div className='items'>
        <label className='label-item'>Descripción</label>
        <textarea type="text" rows="10" cols="50" {...register('description', { required: true })} />
        {errors.description && <p className="error-message">La descripción es requerida</p>}
      </div>
      <div className='items'>
        <label className='label-item'>Archivo:</label>
        <input className='button-image' type="file" {...register('image')} />
      </div>
      <button type="submit" className='button-forms'>Enviar</button>
     <button className='button-forms'onClick={closeForm}>Cerrar</button>
    </form>
    </div>

  )}

export default Obstacle;
