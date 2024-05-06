import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOneHypothesis, updateHypothesis } from "../../services/hypothesisServices";
import { useForm } from "react-hook-form";
// import '../forms/css/Forms.css';

const EditHypothesis = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { handleSubmit, setValue } = useForm();
    const [hypothesisData, setHypothesisData] = useState({});
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHypothesis = async () => {
            try {
                const hypothesisData = await getOneHypothesis(id);
                console.log("Datos de la hipótesis:", hypothesisData); //💖datos llegado o
                setHypothesisData(hypothesisData);
                setValue("id", hypothesisData.id);
                setValue("description", hypothesisData.description);
                setValue("plan_date", hypothesisData.plan_date);
                setValue("state_hypothesis", hypothesisData.state_hypothesis);


            } catch (error) {
                // setLoading(false);
                // setError(error.message)
                console.error("Error al obtener la hipótesis:", error);
            }
        };
        fetchHypothesis();
    }, [id, setValue]);

    // if (loading) {
    //   return <div>Cargando...</div>;
    // }

    // if (!hypothesisData) {
    //   return <div>No se encontró la hipótesis</div>;
    // }

    const onSubmit = async (hypothesisData) => {
        try {
            await updateHypothesis(id, hypothesisData);
            navigate("/");
        } catch (error) {
            console.error("Error al editar la hipótesis:", error);
        }
    },

    return (
        <form className="form-create" onSubmit={handleSubmit(onSubmit)}>
            <h2>EDITAR HIPÓTESIS:</h2>
            <div className="items">
                <label className="label-item">Descripción</label>
                <input type="text" name="description" defaultValue={hypothesisData.description} />
            </div>
            <div className="items">
                <label className="label-item">Fecha de planificación</label>
                <input type="date" name="plan_date" defaultValue={hypothesisData.plan_date} />
            </div>
            <div className="items">
                <label className="label-item">Estado de la hipótesis</label>
                <input type="text" name="state_hypothesis" defaultValue={hypothesisData.state_hypothesis} />
            </div>
            <button type="submit">Guardar Cambios</button>
        </form>
    );
};

export default EditHypothesis;