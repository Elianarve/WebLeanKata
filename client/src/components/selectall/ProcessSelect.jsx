import { useState, useEffect } from 'react';
import { getOneProcess } from "../../services/processServices";
import '../selectall/SelectAllChallenges.css';
import update from '../../assets/img/Edit-File.svg';
import EditProcess from '../edit/EditProcess';

const ProcessSelect = ({processId}) => {
    const [process, setProcess] = useState(null);
    const [editable, setEditable] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProcess = async () => {
            try {
                const processData = await getOneProcess(processId);
                setProcess(processData.data);
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        fetchProcess();
    }, [processId, loading]);

    return (
        <div className='container-challenge'>
            {process && (
                <>
                    <h3>PROCESO</h3>
                    <div className="centered-table">
                        <table className='container-table'>
                                    <tbody key={process.id}>
                                        <tr className='tr-table'>
                                            <td className='title-table'>Proceso ID</td>
                                            <td className='tr-table'>{process.id}</td>
                                        </tr>
                                        <tr>
                                            <td className='title-table description'>Descripcion</td>
                                            <td className='tr-table'>{process.description}</td>
                                        </tr>
                                        <tr>
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
                <EditProcess processId={processId} setLoading={setLoading} setEditable={setEditable}/>
            )}
        </div>  
    );
};

export default ProcessSelect;

