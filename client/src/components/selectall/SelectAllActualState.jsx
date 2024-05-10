import { useState, useEffect } from 'react';
import { getOneActualState } from "../../services/actualStateServices";
import { useNavigate } from 'react-router-dom';
import '../selectall/SelectAllChallenges.css';
import update from '../../assets/img/Edit-File.svg';


const SelectAllActualState = ({ actualStateId }) => {
    const [actualState, setActualState] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchActualState = async () => {
            try {
                const actualStateData = await getOneActualState(actualStateId);
                setActualState(actualStateData.data);

            } catch (error) {
                console.error('Error fetching Challenges:', error);
            }
        };

        fetchActualState();
    }, [actualStateId]);


    return (
        <div className='container-challenge'>
            {actualState && (
                <>
                    <h3>ESTADO ACTUAL</h3>
                    <div className="centered-table">
                        <table className='container-table'>
                            <tbody>
                                <thead>
                                    <tr key={actualState.id}>
                                        <tr>
                                            <td className='title-table'>Estado Actual ID</td>
                                            <td>{actualState.id}</td>
                                        </tr>
                                        <tr>
                                            <td className='title-table'>Descripción</td>
                                            <td>{actualState.description}</td>
                                        </tr>
                                        <tr>
                                            <td className='title-table'>Fecha</td>
                                            <td>{actualState.date}</td>
                                        </tr>
                                        <tr>
                                            <td className='title-table'>Acciones</td>
                                            <td>
                                                <button className='button-edit' onClick={() => navigate(`/editactualstate/${actualState.id}`)}><img src={update} alt="logo-update" className='logo-edit' /></button>
                                            </td>
                                        </tr>
                                    </tr>
                                </thead>
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

export default SelectAllActualState;

