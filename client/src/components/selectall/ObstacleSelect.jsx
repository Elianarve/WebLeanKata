import { useState, useEffect } from 'react';
import { deleteObstacle, getObstacle } from '../../services/obstacleServices';
import more from '../../assets/img/Plus.svg';
import update from '../../assets/img/Edit-File.svg';
import HypothesisSelect from './HypothesisSelect';
import EditObstacle from '../edit/EditObstacle';
import { useNavigate } from 'react-router-dom';
import delte from '../../assets/img/delete.svg';
import Obstacle from '../forms/Obstacle';
import Hypothesis from '../forms/Hypothesis';

const ObstacleSelect = ({targetState}) => {
    const [obstacles, setObstacles] = useState([]);
    const [imgZoom, setImgZoom] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [editable, setEditable] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); 
    const [editHypothesis, setEditHypothesis] = useState(false);
    const [loadH, setLoadH] = useState(false);
    const [selectedObstacle, setSelectedObstacle] = useState(null);

    const handleClick = (image) => {
        setSelectedImage(image);
        setImgZoom(true);
        window.open(image, '_blank');
    };

    useEffect(() => {
        const fetchObstacle = async () => {
            try {
                const arrayTargetStaId = [];
                const obstacleData = await getObstacle();
                targetState.map(item =>{ 
                    const targetId = item.id
                    arrayTargetStaId.push(targetId);   
                });
                const arrayObstacleFiltered = [];
                arrayTargetStaId.map(targetId => {
                    const obstacleFilteredData =  obstacleData.filter(contrast => contrast.target_state_id ===  targetId );
                    arrayObstacleFiltered.push(...obstacleFilteredData);                    
                })         
                setObstacles(arrayObstacleFiltered);
                setLoading(false);
                setLoadH(false);
            } catch (error){
                console.error('Error fetching:', error);
            }
        };

        fetchObstacle();
    }, [targetState, loading, loadH]);

    const handleAddHypothesis = (obstacleId) => {
        setSelectedObstacle(obstacleId);
        setEditHypothesis(true);
    };

    return (
        <div className='container-challenge'>
            {obstacles.length > 0 && (
                <>
                    <h3>OBSTACULOS</h3>
                    <div className="centered-table">
                        <table className='container-table'>
                                {obstacles.map((obstacle) => (
                                    <tbody key={obstacle.id}>
                                        <tr>
                                            <td className='title-table'>Obstaculo ID</td>
                                            <td className='tr-table'>{obstacle.id}</td>
                                        </tr>
                                        <tr>
                                            <td className='title-table'>EOID</td>
                                            <td className='tr-table'>{obstacle.target_state_id}</td>
                                        </tr>
                                        <tr>
                                            <td className='title-table'>Descripción</td>
                                            <td className='tr-table'>{obstacle.description}</td>
                                        </tr>
                                        <tr>
                                            <td className='title-table'>Imagen</td>
                                            <td>
                                                <img
                                                    className='img-form'
                                                    src={obstacle.image}
                                                    alt="img-form"
                                                    onClick={() => handleClick(obstacle.image)}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='title-table'>Acciones</td>
                                            <td className='container-button'>
                                                <button className='button-edit' onClick={() => setEditable(obstacle.id)}>
                                                    <img src={update} alt="logo-update" className='logo-edit' />
                                                </button>
                                                <button className='button-add-t' onClick={() => handleAddHypothesis(obstacle.id)}>Añadir Hipotesis</button>
                                                <button className='button-edit' onClick={() => deleteObstacle(obstacle.id).then(() => navigate(0))}><img src={delte} alt="img-delete" className='img-delete' /></button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='title-table'></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                ))}
                        </table>
                    </div>
                </>
            )}
            {editable && obstacles.map((obstacle) => (    
                obstacle.id === editable &&                    
                <EditObstacle key={obstacle.id} obstacleId={obstacle.id} setLoading={setLoading} setEditable={setEditable}/>
            ))}
            {editHypothesis && <Hypothesis obstacle={obstacles} setLoadH={setLoadH}  setEditHypothesis={setEditHypothesis}/>}
            <HypothesisSelect obstacle={obstacles}/>
        </div>
    );
}

export default ObstacleSelect;



