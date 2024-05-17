import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  getOneObstacle,
  updateObstacle,
  updateImage,
} from "../../services/obstacleServices";
import "../forms/css/Forms.css";

const EditObstacle = ({ editObstacleId, setLoading, setEditObstacle }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();
  const [obstacleData, setObstacleData] = useState({});
  const [url_image, setUrl_Image] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await getOneObstacle(editObstacleId);
      const obstacleData = response;
      setObstacleData(obstacleData);
      setValue("description", obstacleData.description);
      setUrl_Image("image", obstacleData.image);
      setUrl_Image(obstacleData.image);
    };

    fetchData();
  }, [editObstacleId, setValue]);

  const onSubmit = async (data) => {
    data.image = url_image;
    try {
      await updateObstacle(editObstacleId, data);
      alert("¡Los datos del Obstáculo han sido actualizados correctamente!");
      setLoading(true);
      setEditObstacle(false);
    } catch (error) {
      console.error("Error al actualizar el Obstáculo:", error);
      alert("Error al actualizar el Obstáculo. Por favor, intenta nuevamente.");
    }
  };

  const changeUploadImage = async (e) => {
    const file = e.target.files[0];
    const imageData = new FormData();
    imageData.append("file", file);
    imageData.append("upload_preset", "leankata");
    try {
      const response = await updateImage(imageData);
      setUrl_Image(response.data.secure_url);
    } catch (error) {
      console.error("Error al cargar la imagen a Cloudinary:", error);
    }
  };

  return (
    <div className="form-container">
    <form className="form-create" onSubmit={handleSubmit(onSubmit)}>
      <h2>EDITAR OBSTACULO</h2>
      <div className="items">
        <label className="label-item">Descripción:</label>
        <input
          type="text"
          name="description"
          defaultValue={obstacleData.description}
          {...register("description", { required: true })}
        />
        {errors.startDate && <p className="error-message">La fecha de inicio es requerida</p>}
      </div>
      <div className="items">
        <label className="label-item">Imagen</label>
        <input className='button-image'
          type="file"
          id="image"
          name="image"
          {...register("image")}
          onChange={changeUploadImage}
        />
        {obstacleData.image && (
          <div className="image-container">
            <img
              className="label-item-img"
              src={obstacleData.image}
              alt="obstacle image"
            />
          </div>
        )}
      </div>
      <button className='button-forms' type="submit">Editar</button>
      <button className='button-forms' onClick={() => setEditObstacle(false)}>Cerrar</button>
    </form>
    </div>
  );
};

export default EditObstacle;
