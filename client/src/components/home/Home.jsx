import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getChallenge } from '../../services/challengeServices'; 
import styled from 'styled-components';


const HomeContainer = styled.div`
  padding: 2%;
  background-color: #ECF0F1;
  border-radius: 10px;
`;

const Gallery = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const RetoCard = styled.tr`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const CardContent = styled.td`
  padding: 0%;
  display: flex;
  flex-direction: raw;
  justify-content: space-around;  
`;

// const Home = () => {
//   const [retos, setRetos] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchRetos = async () => {
//       try {
//         const retosData = await getChallenge();
//         setRetos(retosData); 
//       } catch (error) {
//         console.error('Error fetching retos:', error);
//       }
//     };

//     fetchRetos();
//   }, []);
  
//   return (
//     <HomeContainer>
//       <h2>Retos</h2>
//       <Gallery>
//         <tbody>
//           {challenges.map((challenge) => (
//             <RetoCard key={challenge.id} onClick={() => navigate(`/card/${challenge.id}`)}>
//               <CardContent>
//                 <h3>{reto.name}</h3>
//                 <p>{reto.descripcion}</p>
//                 <p>Estado: {reto.estado}</p>
//               </CardContent>
//             </RetoCard>
//           ))}
//         </tbody>
//       </Gallery>
//     </HomeContainer>
//   );
// };

export default Home;

const Home = () => {
  const [challenges, setChallenges] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const challengesData = await getChallenge();
        setChallenges(challengesData); 
      } catch (error) {
        console.error('Error fetching retos:', error);
      }
    };

    fetchChallenges();
  }, []);
return (
    <div className="home-container">
      {/* <Search /> */}
      <h2>Retos</h2>
      <div className="gallery-items">
      {challenges.map((challenge) => (
          <div key={challenge.id} className="challenge-description" onClick={() => navigate(`/card/${challenge.id}`)}>
          {challenge.description}
          </div>
        ))}
      </div>
    </div>
  );
};


export default Home;


