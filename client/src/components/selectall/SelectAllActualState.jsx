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
        <h3>Estado actual</h3>
            <div className="centered-table">
                <table className='container-table'>
                    <thead>
                        <tr>
                            <th className='title-table'>Estado Actual ID</th>
                            <th className='title-table'>Descripción</th>
                            <td className='title-table'>Fecha</td>
                            </tr>
                    </thead>
                    <tbody>
                            <tr key={actualState.id}>
                            <td>{actualState.id}</td>
                            <td>{actualState.description}</td>
                            <td>{actualState.date}</td>
                            <td>
                        <button className='button-edit' onClick={()=> navigate(`/editchallenge/${actualState.id}`)}><img src={update} alt="logo-update" className='logo-edit' /></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
              </>
            )}
        </div>
    );
};

export default SelectAllActualState;

