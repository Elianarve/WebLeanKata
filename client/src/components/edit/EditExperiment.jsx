import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  getOneExperiment,
  updateExperiment,
  updateImage,
} from "../../services/experimentServices";
import "../forms/css/Forms.css";

const EditExperiment = ({
  editExperimentId,
  setLoading,
  setEditExperiment,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();
  const [experimentData, setExperimentData] = useState({});
  const [url_image, setUrl_Image] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getOneExperiment(editExperimentId);
        const experimentData = response.data;
        setExperimentData(experimentData);
        setValue("description", experimentData.description);
        setValue("start_date", experimentData.start_date);
        setValue("end_date", experimentData.end_date);
        setValue("goals", experimentData.goals);
        setValue("methodology", experimentData.methodology);
        setValue("variables", experimentData.variables);
        setValue("control_group", experimentData.control_group);
        setValue("success_criteria", experimentData.success_criteria);
        setValue("responsible", experimentData.responsible);
        setValue("state_experiment", experimentData.state_experiment);
        setUrl_Image("image", experimentData.image);
        setUrl_Image(experimentData.image);

        Object.keys(experimentData).forEach((key) => {
          setValue(key, experimentData[key]);
        });
      } catch (error) {
        console.error("Error fetching experiment data:", error);
      }
    };
    fetchData();
  }, [editExperimentId, setValue]);

  const onSubmit = async (data) => {
    data.image = url_image;
    try {
      await updateExperiment(editExperimentId, data);
      alert("¡Los datos del experimento han sido actualizados correctamente!");
      setLoading(true);
      setEditExperiment(false);
    } catch (error) {
      console.error("Error al actualizar el experimento:", error);
      alert(
        "Error al actualizar el experimento. Por favor, intenta nuevamente."
      );
    }
  };

  const changeUploadImage = async (e) => {
    const file = e.target.files[0];
    const imageData = new FormData();
    imageData.append("file", file);
    imageData.append("upload_preset", "leankata");
    try {
      const response = await updateImage(imageData);
      setUrl_Image(response.secure_url);
    } catch (error) {
      console.error("Error al cargar la imagen a Cloudinary:", error);
    }
  };

  return (
    <div className="form-container">
      <form className="form-create" onSubmit={handleSubmit(onSubmit)}>
        <h2>EDITAR EXPERIMENTO</h2>
        <div className="items">
          <label className="label-item">Descripción</label>
          <textarea
            rows="10"
            cols="50"
            name="description"
            defaultValue={experimentData.description}
            {...register("description", { required: true })}
          />
          {errors.description && (
            <p className="error-message">La descripción es requerida</p>
          )}
        </div>
        <div className="items">
          <label className="label-item">Fecha de inicio</label>
          <input
            type="date"
            name="start_date"
            defaultValue={experimentData.start_date}
            {...register("start_date", { required: true })}
          />
          {errors.start_date && (
            <p className="error-message">La fecha de inicio es requerida</p>
          )}
        </div>
        <div className="items">
          <label className="label-item">Fecha de fin</label>
          <input
            type="date"
            name="end_date"
            defaultValue={experimentData.end_date}
            {...register("end_date", { required: true })}
          />
          {errors.end_date && (
            <p className="error-message">La fecha de fin es requerida</p>
          )}
        </div>
        <div className="items">
          <label className="label-item">Objetivos</label>
          <input
            type="text"
            name="goals"
            defaultValue={experimentData.goals}
            {...register("goals", { required: true })}
          />
          {errors.goals && (
            <p className="error-message">Los objetivos son requeridos</p>
          )}
        </div>
        <div className="items">
          <label className="label-item">Metodología</label>
          <input
            type="text"
            name="methodology"
            defaultValue={experimentData.methodology}
            {...register("methodology", { required: true })}
          />
          {errors.methodology && (
            <p className="error-message">La metodologia es requerida</p>
          )}
        </div>
        <div className="items">
          <label className="label-item">Variables</label>
          <input
            type="text"
            name="variables"
            defaultValue={experimentData.variables}
            {...register("variables", { required: true })}
          />
          {errors.variables && (
            <p className="error-message">Las variables son requeridas</p>
          )}
        </div>
        <div className="items">
          <label className="label-item">Grupo de control</label>
          <input
            type="text"
            name="control_group"
            defaultValue={experimentData.control_group}
            {...register("control_group", { required: true })}
          />
          {errors.control_group && (
            <p className="error-message">El grupo de control es requerido</p>
          )}
        </div>
        <div className="items">
          <label className="label-item">Criterios de éxito</label>
          <input
            type="text"
            name="success_criteria"
            defaultValue={experimentData.success_criteria}
            {...register("success_criteria", { required: true })}
          />
          {errors.success_criteria && (
            <p className="error-message">
              Los criterios de éxito son requeridos
            </p>
          )}
        </div>
        <div className="items">
          <label className="label-item">Responsable</label>
          <input
            type="text"
            name="responsible"
            defaultValue={experimentData.responsible}
            {...register("responsible", { required: true })}
          />
          {errors.responsible && (
            <p className="error-message">El responsable es requerido</p>
          )}
        </div>
        <div className="items">
          <label className="label-item">Estado del experimento</label>
          <input
            type="text"
            name="state_experiment"
            defaultValue={experimentData.state_experiment}
            {...register("state_experiment", { required: true })}
          />
          {errors.state_experiment && (
            <p className="error-message">
              El estado del experimento es requerido
            </p>
          )}
        </div>
        <div className="items">
          <label className="label-item">Imagen</label>
          <input
            type="file"
            name="image"
            {...register("image")}
            onChange={changeUploadImage}
          />
          {experimentData.image && (
            <div className="image-container">
              <img
                className="label-item-img"
                src={experimentData.image}
                alt="experiment"
              />
            </div>
          )}
        </div>
        <input className="button-forms" type="submit" value="Editar" />
        <button className="button-forms" onClick={() => setEditExperiment(false)}>Cerrar</button>
      </form>
    </div>
  );
};

export default EditExperiment;
