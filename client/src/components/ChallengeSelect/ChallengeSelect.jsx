import { useNavigate } from 'react-router-dom';


const ChallengeSelect = ({ challenges, selectedChallengeId, onSelectChange }) => {
    const navigate = useNavigate();

    const handleChange = (event) => {
        const selectedChallengeId = event.target.value;
        onSelectChange(selectedChallengeId);
        navigate(`/home/card/${selectedChallengeId}`);
    };

    return (
        <>
        <select value={selectedChallengeId} onChange={handleChange} className='container-select'>
            {challenges.map((challenge) => (                                
                <option key={challenge.id} value={challenge.id} >{challenge.name}
                </option>
            ))}
        </select>
        </>
    );
};


export default ChallengeSelect
