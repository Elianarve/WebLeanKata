import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { addReto, uploadImage } from '../../services/Retoservice';



const NewItem = () => {
  const { register, formState: { errors }, handleSubmit, reset } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [imageUrl, setImageUrl] = useState("");


  const onSubmit = async (data) => {
    try {
      const imageData = new FormData();
      imageData.append("file", data.image[0]);
      imageData.append("upload_preset", "Presents_react");

      const response = await uploadImage(imageData);
      setImageUrl(response.secure_url);

      const retoData = {
        name: data.name,
        estado: data.estado,
        objetivo: data.objetivo,
        obstaculo: data.obstaculo,
        experimento: data.experimento,
        hipotesis: data.hipotesis,
        descripcion: data.descripcion,
        metodologia: data.metodologia,
        grupo_de_control: data.grupo_de_control,
        criterios_de_exito: data.criterios_de_exito,
        image: response.secure_url
      };
      
      const { success, error } = await addReto(retoData);

      if (success) {
        alert('¡El reto fue añadido correctamente!');
        reset();
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 1500);
      } else {
        alert(error);
      }
    } catch (error) {
      console.error("Error al cargar la imagen:", error);
      alert('Error al cargar la imagen. Por favor, intenta nuevamente.');
    }
  };


  return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nombre</label>
          <input type="text" {...register('name', { required: true })} />
          {errors.name && <p className="error-message">El nombre es requerido</p>}
        </div>
        <div>
          <label>Estado</label>
          <input type="text" {...register('estado', { required: true })} />
          {errors.estado && <p className="error-message">El estado es requerido</p>}
        </div>
        <div>
          <label>Objetivo</label>
          <input type="text" {...register('objetivo', { required: true })} />
          {errors.objetivo && <p className="error-message">El objetivo es requerido</p>}
        </div>
        <div>
          <label>Obstáculo</label>
          <input type="text" {...register('obstaculo', { required: true })} />
          {errors.obstaculo && <p className="error-message">El obstáculo es requerido</p>}
        </div>
        <div>
          <label>Experimento</label>
          <select {...register('experimento', { required: true })}>
            <option value="1">Experimento 1</option>
            <option value="2">Experimento 2</option>
            <option value="3">Experimento 3</option>
          </select>
          <input type="text" {...register('experimento', { required: true })} />
          {errors.experimento && <p className="error-message">El experimento es requerido</p>}
        </div>
        <div>
          <label>Hipótesis</label>
          <input type="text" {...register('hipotesis', { required: true })} />
          {errors.hipotesis && <p className="error-message">La hipótesis es requerida</p>}
        </div>
        <div>
          <label>Descripción</label>
          <input type="text" {...register('descripcion', { required: true })} />
          {errors.descripcion && <p className="error-message">La descripción es requerida</p>}
        </div>
        <div>
          <label>Metodología</label>
          <input type="text" {...register('metodologia', { required: true })} />
          {errors.metodologia && <p className="error-message">La metodología es requerida</p>}
        </div>
        <div>
          <label>Grupo de Control</label>
          <input type="text" {...register('grupo_de_control', { required: true })} />
          {errors.grupo_de_control && <p className="error-message">El grupo de control es requerido</p>}
        </div>
        <div>
          <label>Criterios de Éxito</label>

          <input type="text" {...register('criterios_de_exito', { required: true })} />
          {errors.criterios_de_exito && <p className="error-message">Los criterios de éxito son requeridos</p>}
        </div>
        <div>
          <label>Adjuntar imagen</label>
          <input type="file" {...register('image', { required: true })} />
          {errors.image && <p className="error-message">Por favor adjunta una imagen</p>}
        </div>
        <input type="submit" value="Añadir"/>
      </form>
  );
}

export default NewItem;