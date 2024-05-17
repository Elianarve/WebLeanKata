import { useState, useEffect } from "react";
import {
  getOneHypothesis,
  updateHypothesis,
} from "../../services/hypothesisServices";
import { useForm } from "react-hook-form";
import "../forms/css/Forms.css";

const EditHypothesis = ({
  editHypothesisId,
  setLoading,
  setEditHypothesis,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();
  const [hypothesisData, setHypothesisData] = useState({});

  useEffect(() => {
    const fetchHypothesis = async () => {
      const reponse = await getOneHypothesis(editHypothesisId);
      const hypothesisData = reponse.data;
      setHypothesisData(hypothesisData);
      setValue("description", hypothesisData.description);
      setValue("plan_date", hypothesisData.plan_date);
      setValue("state_hypothesis", hypothesisData.state_hypothesis);
    };
    fetchHypothesis();
  }, [editHypothesisId, setValue]);

  const onSubmit = async (hypothesisData) => {
    try {
      await updateHypothesis(editHypothesisId, hypothesisData);
      alert("¡Los datos de la hipótesis han sido actualizados correctamente!");
      setLoading(true);
      setEditHypothesis(false);
    } catch (error) {
      console.error("Error al actualizar la hipótesis:", error);
      alert("Error al actualizar la hipótesis. Por favor, intenta nuevamente.");
    }
  };

  return (
    <div className="form-container">
      <form className="form-create" onSubmit={handleSubmit(onSubmit)}>
        <h2>EDITAR HIPOTESIS</h2>
        <div className="items">
          <label className="label-item">Descripción</label>
          <textarea
            rows="10"
            cols="50"
            name="description"
            defaultValue={hypothesisData.description}
            {...register("description", { required: true })}
          />
          {errors.description && (
            <p className="error-message">La descripción es requerida</p>
          )}
        </div>
        <div className="items">
          <label className="label-item">Fecha de planificación</label>
          <input
            type="date"
            name="plan_date"
            defaultValue={hypothesisData.plan_date}
            {...register("plan_date", { required: true })}
          />
          {errors.plan_date && (
            <p className="error-message">
              La fecha de planificación es requerida
            </p>
          )}
        </div>
        <div className="items">
          <label className="label-item">Estado de la hipótesis</label>
          <input
            type="text"
            name="state_hypothesis"
            defaultValue={hypothesisData.state_hypothesis}
            {...register("state_hypothesis", { required: true })}
          />
          {errors.state_hypothesis && (
            <p className="error-message">
              El estado de la hipótesis es requerido
            </p>
          )}
        </div>
        <button className="button-forms" type="submit">
          Editar
        </button>
        <button
          className="button-forms"
          onClick={() => setEditHypothesis(false)}
        >
          Cerrar
        </button>
      </form>
    </div>
  );
};

export default EditHypothesis;
