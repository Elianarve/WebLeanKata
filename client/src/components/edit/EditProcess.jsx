import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { getOneProcess, updateProcess } from "../../services/processServices";
import "../forms/css/Forms.css";
import Swal from 'sweetalert2';


const EditProcess = ({ processId, setLoading, setEditable }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();
  const [processData, setProcessData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await getOneProcess(processId);
      const processData = response.data;
      setProcessData(processData);
      setValue("description", processData.description);
    };

    fetchData();
  }, [processId, setValue]);

  const onSubmit = async (processData) => {
    try {
      await updateProcess(processId, processData);
      Swal.fire("¡Los datos del elemento han sido actualizados correctamente!");
      setLoading(true);
      setEditable(false);
    } catch (error) {
      console.error("Error al actualizar el elemento:", error);
      alert("Error al actualizar el elemento. Por favor, intenta nuevamente.");
    }
  };

  return (
    <div className="form-container">
      <form className="form-create" onSubmit={handleSubmit(onSubmit)}>
        <h2>EDITAR PROCESO</h2>
        <div className="items">
          <label className="label-item">Descripción </label>
          <textarea
            type="text"
            rows="10"
            cols="50"
            name="description"
            defaultValue={processData.description}
            {...register("description", { required: true })}
          />
          {errors.model?.type === "required" && (
            <p className="error-message">El campo modelo es requerido</p>
          )}
        </div>
        <input className="button-forms" type="submit" value="Editar" />
        <button className="button-forms" onClick={() => setEditable(false)}>
          Cerrar
        </button>
      </form>
    </div>
  );
};

export default EditProcess;
