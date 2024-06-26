import { useState, useEffect } from 'react';
import { deleteObstacle, getObstacle } from '../../services/obstacleServices';
import update from "../../assets/img/EditButton.svg";
import HypothesisSelect from './HypothesisSelect';
import EditObstacle from '../edit/EditObstacle';
import { useNavigate } from 'react-router-dom';
import delte from '../../assets/img/delete.svg';
import Hypothesis from '../forms/Hypothesis';
import './css/SelectAll.css';
import HypothesisLogo from '../../assets/img/hypothesisButton.svg'

const ObstacleSelect = ({targetState}) => {
    const navigate = useNavigate(); 
    const [obstacles, setObstacles] = useState([]);
    const [imgZoom, setImgZoom] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [editObstacle, setEditObstacle] = useState(false);
    const [loading, setLoading] = useState(false);
    const [editHypothesis, setEditHypothesis] = useState(false);
    const [editObstacleId, setEditObstacleId ] = useState();

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
            } catch (error){
                console.error('Error fetching:', error);
            }
        };

        fetchObstacle();
    }, [targetState, loading]);

    return (
        <div className='container-challenge'>
            {obstacles.length > 0 && (
                <>
                    <h3>OBSTACULOS</h3>
                    <div className="centered-table">
                        <table className='container-table'>
                                {obstacles.map((obstacle) => (
                                    <tbody key={obstacle.id}>
                                        <tr className="tr-table">
                                            <td className='title-table'>Obstaculo ID</td>
                                            <td className='tr-table'>{obstacle.id}</td>
                                        </tr>
                                        <tr className="tr-table">
                                            <td className='title-table'>EOID</td>
                                            <td className='tr-table'>{obstacle.target_state_id}</td>
                                        </tr>
                                        <tr className="tr-table">
                                            <td className='title-table'>Descripción</td>
                                            <td className='tr-table'>{obstacle.description}</td>
                                        </tr>
                                        <tr className="tr-table">
                                            <td className='title-table'>Imagen</td>
                                            <td className="tr-table">
                                                <img
                                                    className='img-form'
                                                    src={obstacle.image}
                                                    alt="img-form"
                                                    onClick={() => handleClick(obstacle.image)}
                                                />
                                            </td>
                                        </tr>
                                        <tr className="tr-table">
                                            <td className='title-table'>Acciones</td>
                                            <td className='container-button'>
                                                <button title='Editar' className='CardActionButtonContainer' onClick={() => {setEditObstacleId(obstacle.id), setEditObstacle(true)}}>
                                                    <img src={update} alt="logo-update" className='logo-edit' />
                                                </button>
                                                <button title='Añadir hipotesis' className='CardActionButtonContainer' onClick={() => {setEditObstacleId(obstacle.id), setEditHypothesis(true)}}>
                                                    <img src={HypothesisLogo}/>
                                                </button>
                                                <button title='Eliminar' className='CardActionButtonContainer' onClick={() => {deleteObstacle(obstacle.id), setLoading(true)}}>
                                                    <img src={delte} alt="img-delete" className='delete' />
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                ))}
                        </table>
                    </div>
                </>
            )}
            {editObstacle && (                     
                <EditObstacle editObstacleId={editObstacleId} setLoading={setLoading} setEditObstacle={setEditObstacle}/>
            )}
            {editHypothesis && <Hypothesis editObstacleId={editObstacleId} setLoading={setLoading}  setEditHypothesis={setEditHypothesis}/>}
            <HypothesisSelect obstacle={obstacles}/>
        </div>
    );
}
export default ObstacleSelect;