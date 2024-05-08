import { useState, useEffect } from 'react';
import { getOneChallenge } from '../../services/challengeServices';
import { useParams } from 'react-router-dom';
import SelectAllChallenges from '../selectall/SelectAllChallenges';
import SelectAllTargetState from '../selectall/selectAlllTargetStates'; 
import SelectAllObstacles from '../selectall/SelectAllObstacles';
import SelectAllHypothesis from '../selectall/SelectAllHypothesis';
import SelectAllExperiments from '../selectall/SelectAllExperiments';

const Detail = () => {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [targetState, setTargetState] = useState(null);
  const [obstacle, setObstacle] = useState(null);
  const [hypothesis, setHypothesis] = useState(null);
  const [experiment, setExperiment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const challengeData = await getOneChallenge(id);
        setChallenge(challengeData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchChallenge();
  }, [id]);

  return (
    <div className="cardContainer">
      <SelectAllChallenges onChallengeSelect={(selectedChallenge) => {
        setChallenge(selectedChallenge);
        setTargetState(null);
        setObstacle(null);
        setHypothesis(null);
        setExperiment(null);
      }} />
      {challenge && <SelectAllTargetState onTargetStateSelect={(selectedTargetState) => {
        setTargetState(selectedTargetState);
        setObstacle(null);
        setHypothesis(null);
        setExperiment(null);
      }} />}
      {targetState && <SelectAllObstacles onObstacleSelect={(selectedObstacle) => {
        setObstacle(selectedObstacle);
        setHypothesis(null);
        setExperiment(null);
      }} />}
      {obstacle && <SelectAllHypothesis onHypothesisSelect={(selectedHypothesis) => {
        setHypothesis(selectedHypothesis);
        setExperiment(null);
      }} />}
      {hypothesis && <SelectAllExperiments onExperimentSelect={setExperiment} />}
    </div>
  );
};

export default Detail;