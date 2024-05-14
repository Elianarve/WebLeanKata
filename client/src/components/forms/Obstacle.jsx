import { postObstacle, uploadImage } from '../../services/obstacleServices';
import { useForm } from 'react-hook-form';
import './css/Forms.css';
import { useState } from 'react';

const Obstacle = ({editTargetId, setLoading, setEditObstacle }) => {
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
        data = { ...data, image: responseImage.secure_url};
      }
      const dataF = {...data, target_state_id: editTargetId}
      const response = await postObstacle(dataF);
      console.log(dataF)
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
    <form className='form-create' onSubmit={handleSubmit(onSubmit)}>
      <h2>Obstáculo:</h2>
      <div className='items'>
        <label className='label-item'>Descripción</label>
        <textarea type="text" {...register('description', { required: true })} />
        {errors.description && <p className="error-message">La descripción es requerida</p>}
      </div>
      <div className='items'>
        <label className='label-item'>Archivo:</label>
        <input type="file" {...register('image', { required: false })} />
        {errors.image && <p className="error-message">Por favor adjunta un archivo</p>}
      </div>
      <button type="submit" className='button-forms'>Enviar</button>
     <button onClick={closeForm}>Cerrar</button>
    </form>
  )
}

export default Obstacle;