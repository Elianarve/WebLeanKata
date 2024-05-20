import { useState, useEffect } from "react";
import { getOneProcess, deleteProcess } from "../../services/processServices";
import "./css/SelectAll.css";
import update from "../../assets/img/EditButton.svg";
import EditProcess from "../edit/EditProcess";
import { getChallenge } from "../../services/challengeServices";
import ChallengeSelect from "../ChallengeSelect/ChallengeSelect";
import delte from '../../assets/img/delete.svg';

const ProcessSelect = ({ processId }) => {
  const [process, setProcess] = useState(null);
  const [editable, setEditable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [challenges, setChallenges] = useState([]);
  const [selectedChallengeId, setSelectedChallengeId] = useState(null);

  useEffect(() => {
    const fetchProcess = async () => {
      try {
        const processData = await getOneProcess(processId);
        setProcess(processData.data);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchProcess();
  }, [processId, loading]);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const challengesData = await getChallenge();
        setChallenges(challengesData);
      } catch (error) {
        console.error('Error fetching Challenges:', error);
      }
    };

    fetchChallenges();
  }, []);

  return (
    <div className="container-challenge marginNavbar">
      <ChallengeSelect 
        challenges={challenges} 
        selectedChallengeId={selectedChallengeId} 
        onSelectChange={(id) => setSelectedChallengeId(id)}
      />
      {process && (
        <>
          <h3>PROCESO</h3>
          <div className="centered-table">
            <table className="container-table">
              <tbody key={process.id}>
                <tr className="tr-table">
                  <td className="title-table">Proceso ID</td>
                  <td className="tr-table">{process.id}</td>
                </tr>
                <tr className="tr-table">
                  <td className="title-table">Descripcion</td>
                  <td className="tr-table">{process.description}</td>
                </tr>
                <tr className="tr-table">
                  <td className="title-table">Acciones</td>
                  <td className="tr-table">
                    <button
                      title='Editar' className='CardActionButtonContainer'
                      onClick={() => setEditable(true)}
                    >
                      <img
                      className='edit'
                        src={update}
                        alt="logo-update"
                      />
                    </button>
                    <button title='Eliminar' className='CardActionButtonContainer' onClick={() => {deleteProcess(process.id), setLoading(true)}}>
                    <img src={delte} alt="img-delete" className='delete' />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
      {editable && (
        <EditProcess
          processId={processId}
          setLoading={setLoading}
          setEditable={setEditable}
        />
      )}
    </div>
  );
};

export default ProcessSelect;
