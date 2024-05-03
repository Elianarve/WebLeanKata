import { useState, useEffect } from 'react';
import { getChallenge } from "../../services/challengeServices";
import { useNavigate } from 'react-router-dom';
import '../selectall/SelectAllChallenges.css';
// import update from '../../assets/img/Edit-File.svg';
// import delte from '../../assets/img/delete.svg';


const SelectAllChallenges = ({ challengeId }) => {
    const [challenges, setChallenges] = useState([]);
    const navigate = useNavigate();

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

    const handleChange = (event) => {
        const selectedChallengeId = event.target.value;
        navigate(`/card/${selectedChallengeId}`);
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
             <div className="centered-table">
            <table className='container-table'>
                <tbody>
                    <tr>
                        <td className='title-table'>RetoID:</td>
                        <td>{selectedChallenge?.id}</td>
                        <div className='logos'>
                        {/* <img src={update} alt="logo-update" />
                        <img src={delte} alt="logo-delete" /> */}
                        </div>
                    </tr>
                    <tr>
                        <td className='title-table'>Descripción:</td>
                        <td>{selectedChallenge?.description}</td>
                    </tr>
                    <tr>
                        <td className='title-table'>Fecha Inicio:</td>
                        <td>{selectedChallenge?.start_date}</td>
                    </tr>
                    <tr>
                        <td className='title-table'>Fecha Fin:</td>
                        <td>{selectedChallenge?.end_date}</td>
                    </tr>
                    <tr>
                        <td className='title-table'>Estado Actual ID:</td>
                        <td>{selectedChallenge?.actual_state_id}</td>
                    </tr>
                </tbody>
            </table>
        </div>
              </>
            )}
        </div>
    );
};

export default SelectAllChallenges;
