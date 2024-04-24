import React from 'react';
import React, { useState } from 'react';
import styled from "styled-components";
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const LikeContainer = styled.div`
    .like {
        width: 1vw;
        height: 1vh;
        margin: 0 0 0 0;
        padding: 0 0 0 0;
    }

    .like:hover {
        transform: scale(1.1);
        transition: 0.5s;
    }

    .like:active {
        transform: scale(0.9);
        transition: 0.5s;
        color: red;
    }
`;




function CounterLikes() {
  const [likes, setLikes] = useState(0);

  

  useEffect(() => {
  
    axios.get(`/server/db.json/${bicyles.Id}`)
      .then(response => {
        setLikes(response.data.likes);
      });
  }, [bicyles.Likes]);

  const handleLike = () => {

    setLikes(likes + 1);


    axios.put(`/server/db.json/${bicyles.Id}`, { likes: likes + 1 })
      .catch(error => {
        console.error('Hubo un error al actualizar los likes en la base de datos', error);

        setLikes(likes);
      });
  };



 
    return response.json(CounterLikes());
  
  };
