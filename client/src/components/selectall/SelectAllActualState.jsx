// import { useState, useEffect } from 'react';
// import { getActualState } from "../../services/actualStateServices";
// import { useNavigate } from 'react-router-dom';
// import '../selectall/SelectAllChallenges.css';
// import update from '../../assets/img/Edit-File.svg';


// const SelectAllActualState = ({ actualStateId }) => {
//     const [actualStates, setActualStateData] = useState([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchActualState = async () => {
//             try {
//                 const actualStateData = await getActualState();
//                 console.log(actualStateData)
//                 setActualStateData(actualStateData);
//             } catch (error) {
//                 console.error('Error fetching Challenges:', error);
//             }
//         };

//         fetchActualState();
//     }, []);

//     const handleChange = (event) => {
//         const selectedActualStateDataId = event.target.value;
//         navigate(`/card/${selectedActualStateDataId}`);
//     };

//     const selectedActualState = actualStates.find(actualState => actualState.id === actualStateId);
//     console.log(selectedActualState)

//     return (
//         <div className='container-challenge'>
//             <select value={actualStateId} onChange={handleChange} className='container-select'>
//                 {actualStates.map((actualstate) => (
//                     <option key={actualstate.id} value={actualstate.id}>
//                         {actualstate.id}
//                     </option>
//                 ))}
//             </select>
//             {selectedActualState && (
//               <>
//              <div className="centered-table">
//             <table className='container-table'>
//                 <tbody>
//                     <tr>
//                         <td className='title-table'>Estado Actual ID:</td>
//                         <td>{selectedActualState?.id}</td>
//                         <td className='edit'>Editar</td>
//                     </tr>
//                     <tr>
//                         <td className='title-table'>Descripción:</td>
//                         <td>{selectedActualState?.description}</td>
//                     </tr>
//                     <tr>
//                         <td className='title-table'>Fecha:</td>
//                         <td>{selectedActualState?.date}</td>
//                         <td className='logos'>
//                         <button className='button-edit' onClick={()=> navigate(`/editchallenge/${selectedActualState.id}`)}><img src={update} alt="logo-update" className='logo-edit' /></button>
//                         </td>
//                     </tr>
//                 </tbody>
//             </table>
//         </div>
//               </>
//             )}
//         </div>
//     );
// };

// export default SelectAllActualState;

