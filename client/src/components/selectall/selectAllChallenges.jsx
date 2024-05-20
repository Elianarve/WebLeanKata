import { useState, useEffect } from 'react';
import { getChallenge, deleteChallenge } from "../../services/challengeServices";
import './css/SelectAll.css';
import update from "../../assets/img/EditButton.svg";
import EditChallenge from '../edit/EditChallenge';
import delte from '../../assets/img/delete.svg';

const SelectAllChallenges = ({ challengeId }) => {
    const [challenges, setChallenges] = useState([]);
    const [editable, setEditable] = useState(false);
    const [loading, setLoading] = useState(false);  

    useEffect(() => {
        const fetchChallenges = async () => {
            try {
                const challengesData = await getChallenge();
                setChallenges(challengesData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching Challenges:', error);
            }
        };

        fetchChallenges();
    }, [challengeId, loading]);

    const selectedChallenge = challenges.find(challenge => challenge.id === challengeId);

    return (
        <div className='container-challenge'>
            {selectedChallenge && (
              <>
            <h3>RETOS</h3>
             <div className="centered-table">
            <table className='container-table'>
                <tbody>
                    <tr className='"tr-table"'>
                        <td className='title-table'>RetoID:</td>
                        <td className='tr-table'>{selectedChallenge?.id}</td>
                    </tr>
                    <tr className="tr-table">
                        <td className='title-table'>Nombre:</td>
                        <td className='tr-table'>{selectedChallenge?.name}</td>
                    </tr>
                    <tr className="tr-table">
                        <td className='title-table'>Descripción:</td>
                        <td className='tr-table'>{selectedChallenge?.description}</td>
                    </tr>
                    <tr className="tr-table">
                        <td className='title-table'>Fecha Inicio:</td>
                        <td className='tr-table'>{selectedChallenge?.start_date}</td>
                    </tr>
                    <tr className="tr-table">
                        <td className='title-table'>Fecha Fin:</td>
                        <td className='tr-table'>{selectedChallenge?.end_date}</td>
                    </tr>
                    <tr className="tr-table">
                        <td className='title-table'>Tribe ID:</td>
                        <td className='tr-table'>{selectedChallenge?.tribe_id}</td>
                    </tr>
                    <tr className="tr-table">
                    <td className='title-table'>Acciones</td>
                    <td className='tr-table'>
                        <button title='Editar' className='CardActionButtonContainer' onClick={() => setEditable(true)}>
                            <img src={update} alt="logo-update" className='logo-edit' />
                        </button>
                        <button title='Eliminar' className='CardActionButtonContainer' onClick={() => {deleteChallenge(selectedChallenge?.id), setLoading(true)}}>
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
                <EditChallenge challengeId={selectedChallenge?.id} setLoading={setLoading} setEditable={setEditable}/>
            )}
        </div>
    );
};

export default SelectAllChallenges;


