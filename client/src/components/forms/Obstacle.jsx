import { useNavigate } from 'react-router-dom';
import { postObstacle } from '../../services/obstacleServices';
import { useForm } from 'react-hook-form';
import { uploadImage } from '../../services/obstacleServices';
import { useState } from 'react';
import './css/Forms.css';

const Obstacle = () => {
  const { handleSubmit, register, formState:{errors}, } = useForm();
  const [imageUrl, setImageUrl] = useState(""); 
  const navigate = useNavigate();
  

  const onSubmit = async (data) => {
    try {
      const imageData = new FormData();
      imageData.append("file", data.image[0]); 
      imageData.append("upload_preset", "LeanKata"); 
    
      const responseImage = await uploadImage(imageData); 
      setImageUrl(responseImage.secure_url); 
      const obstacleData = { ...data, image: responseImage.secure_url }; 
      const response = await postObstacle(obstacleData);
      navigate('/hypothesis');
    } catch (error) {
      console.error("Error creating obstacle:", error);
    }
  };


  return (
    <form className='form-create' onSubmit={handleSubmit(onSubmit)}>
      <h2>Obstaculo:</h2>
      <div className='items'>
        <label className='label-item'>Descripción</label>
        <input type="text" {...register('description', { required: true })} />
      </div>
      <div className='items'>
        <input type="file" {...register('image', { required: false })} />
        {errors.image && <p className="error-message">Por favor adjunta Archivo</p>}
      </div>
      <button type="submit">Enviar</button>
    </form>
  )
}

export default Obstacle;
