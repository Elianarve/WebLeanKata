import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { updateItem, getOneReto, uploadImage } from '../../services/Retoservice';

import { useParams } from 'react-router';

const StyledEdit = styled.div`
height: 80vh;
display: flex;
align-items: center;

body {
    max-height: 100%;
  }

  form {
    font-family: 'Jost', sans-serif;
    max-width: 600px;
    min-width: 350px;
    margin: 0 auto;
    margin-top: 3%;
    margin-bottom: 3%;
    padding: 2%;
    background-color: #FFFFFF;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    font-size: 1.5vw;
  }
  
  label {
    display: block;
    margin-bottom: 2%;
    color: #000000;
  }
  
  input[type="text"],
  input[type="file"],
  select {
    width: 100%;
    padding: 3%;
    margin-bottom: 5%;
    border: none;
    background-color: #D9D9D9;
    border-radius: 5px;
    box-sizing: border-box;
  }
  
  input[type="submit"] {
    width: 100%;
    padding: 3%;
    border: none;
    background-color: #000000;
    color: #FFFFFF;
    font-size: 1.5vw;
    font-weight: bold;
    text-transform: uppercase;
    border-radius: 5px;
    cursor: pointer;
  }
  
  input[type="submit"]:hover {
    background-color: #333333;
  }
  
  .add {
    margin-top: 10%;
  }
  
  .error-message {
    color: red;
  }
  
  .cuadred {
    display: flex;
  }
  
  .frame,
  .electric {
    display: flex;
    align-items: center; 
    margin-right: 5%; 
    font-size: 1.5vw;
  }
  
  .frame label,
  .electric label {
    margin-right: 5%; 
    
  }
  
  .frame select {
    flex: 1; 
    width: 125px;
    margin-top: 5%;
    
  }
  
  .electric input[type="checkbox"] {
    justify-content: flex-end;
    width: 50%;
    height: 50%;
  }
  
  input[type="submit"] {
    background-color: #3de161d2;
    margin-top: 1%;
  }
  
  

`;

const Edit = () => {
  const { id } = useParams();
  const { register, formState: { errors }, handleSubmit, reset, setValue, watch } = useForm();
  const [loading, setLoading] = useState(false);
  const [RetoData, setRetoData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const RetoData = await getOneReto(id);
      setRetoData(RetoData);

      setValue('model', RetoData.model)
      setValue('speeds', RetoData.speeds)
      setValue('frame', RetoData.frame)
      setValue('electric', RetoData.electric)
      setValue('image', RetoData.image)
    };

    fetchData();
  }, [id, setValue]);

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
      reset();
    } catch (error) {
      console.error('Error al actualizar el elemento:', error);
      alert('Error al actualizar el elemento. Por favor, intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };
        
  return (
    <StyledEdit>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Modelo</label>
          <input className='model' type="text" {...register('model', { required: true })}/>
          {errors.model?.type === 'required' && <p className="error-message">El campo modelo es requerido</p>} 
        </div>
        <div>
          <label>Velocidades</label>
          <input className='speeding' type="text" {...register('speeds', { pattern: /^[0-9]{1,3}$/, required: true })}/>
          {errors.speeds?.type === 'pattern' && <p className="error-message">La velocidad debe ser un valor numérico</p>}
          {errors.speeds?.type === 'required' && <p className="error-message">El campo velocidades es requerido</p>}
        </div>
        <div className='cuadred'>
          <div className='frame'>
            <label>Cuadro</label>
            <select {...register('frame')}>
              <option value="Aluminio">Aluminio</option>
              <option value="Acero">Acero</option>
              <option value="Plástico">Plástico</option>
              <option value="Carbono">Carbono</option>
              <option value="Otros">Otros</option>
            </select>
          </div>
          <div className='electric'>
            <label>Eléctrica</label>
            <input className="checkbox-css" type="checkbox" {...register('electric')} />
          </div>
        </div>
        <div>
          <label>Adjuntar imagen</label>
          <input type="file" {...register('image', { required: true })} />
          {errors.image && <p className="error-message">Por favor adjunta una imagen</p>}
        </div>
        <input type="submit" value="Editar" />
      </form>
    </StyledEdit>
  );
}

export default Edit;