import { useState, useEffect } from 'react';
import { getChallenge } from "../../services/challengeServices";
import { useNavigate } from 'react-router-dom';
import './css/SelectAll.css';
import update from '../../assets/img/Edit-File.svg';
import EditChallenge from '../edit/EditChallenge';

const SelectAllChallenges = ({ challengeId }) => {
    const [challenges, setChallenges] = useState([]);
    const navigate = useNavigate();
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

    const handleChange = (event) => {
        const selectedChallengeId = event.target.value;
        console.log(selectedChallengeId)
        navigate(`/home/card/${selectedChallengeId}`);
    };

    const selectedChallenge = challenges.find(challenge => challenge.id === challengeId);

    return (
        <div className='container-challenge'>
            <select value={challengeId} onChange={handleChange} className='container-select'>
                {challenges.map((challenge) => (
                    <option key={challenge.id} value={challenge.id}>
                        {challenge.name}
                    </option>
                ))}
            </select>
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
                        <button className='button-edit' onClick={() => setEditable(true)}><img src={update} alt="logo-update" className='logo-edit' /></button>
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


