import { useState, useEffect } from 'react';
import { getChallenge } from "../../services/challengeServices";
import { useNavigate } from 'react-router-dom';
import '../selectall/SelectAllChallenges.css';

// const SelectAllChallenges = ({ challengeId }) => {
//     const [challenges, setChallenges] = useState([]);
//     const navigate = useNavigate();
  
//     useEffect(() => {
//       const fetchChallenges = async () => {
//         try {
//           const challengesData = await getChallenge(); 
//           setChallenges(challengesData);
//         } catch (error) {
//           console.error('Error fetching Challenges:', error);
//         }
//       };
  
//       fetchChallenges();
//     }, []);

//     const handleChange = (event) => {
//       const challengeId = event.target.value;
//       navigate(`/card/${challengeId}`);
//     };

//   return (
//     <select value={challengeId} onChange={handleChange}>
//       {challenges.map((challenge) => (
//         <option key={challenge.id} value={challenge.id}>
//           {challenge.name} 
//         </option>
//       ))}
//     </select>
//   )
// }

// export default SelectAllChallenges;


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
                <div className='challenge-details'>
                    <div className="detail-pair">
                        <div className='detail'>
                            <p className='title-table'>RetoID:</p>
                            <p>{selectedChallenge?.id}</p>
                        </div>
                        <div className='detail'>
                            <p className='title-table'>Nombre:</p>
                            <p>{selectedChallenge?.name}</p>
                        </div>
                    </div>
                    <div className="detail-pair">
                        <div className='detail'>
                            <p className='title-table'>Descripción:</p>
                            <p>{selectedChallenge?.description}</p>
                        </div>
                        <div className='detail'>
                            <p className='title-table'>Fecha Inicio:</p>
                            <p>{selectedChallenge?.start_date}</p>
                        </div>
                    </div>
                    <div className="detail-pair">
                        <div className='detail'>
                            <p className='title-table'>Fecha Fin:</p>
                            <p>{selectedChallenge?.end_date}</p>
                        </div>
                        <div className='detail'>
                            <p className='title-table'>Estado Actual ID:</p>
                            <p>{selectedChallenge?.actual_state_id}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SelectAllChallenges;
