import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getObstacle } from '../../services/obstacleServices';
import more from '../../assets/img/Plus.svg';
import update from '../../assets/img/Edit-File.svg';
import HypothesisSelect from './HypothesisSelect';

const Obstacle = ({targetState}) => {
    const [obstacles, setObstacles] = useState([]);
    const navigate = useNavigate();
    const [imgZoom, setImgZoom] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

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
                setObstacles(arrayObstacleFiltered)
            } catch (error){
                console.error('Error fetching Challenges:', error);
            }
        };

        fetchObstacle();
    }, [targetState]);

    return (
        <div className='container-challenge'>
            {obstacles.length > 0 && (
                <>
                    <h3>OBSTACULOS <button className='button-add-ob' onClick={() => navigate('/obstacle')}><img src={more} alt="logo-plus" className='img-plus-ob'/></button> </h3>
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
                                                <button className='button-edit' onClick={() => navigate(`/editobstacle/${obstacle.id}`)}>
                                                    <img src={update} alt="logo-update" className='logo-edit' />
                                                </button>
                                                <button className='button-add-t' onClick={() => navigate(`/hypothesis`)}>Añadir Hipotesis</button>
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
            <HypothesisSelect obstacle={obstacles}/>
        </div>
    );
}

export default Obstacle;
