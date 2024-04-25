import React from "react";
import { useNavigate } from "react-router-dom"; 
import styled from "styled-components"; 
 
const AddButton = styled.button`    // Crea un componente AddButton con styled-components
        background-color: #3DE361;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: 'Jost', sans-serif;
        width: 25vw;
        height: 8vh;
        max-width: 150px;
        margin-right: 20px;
        border-radius: 15px;
        

        &:hover {
            background-color: #3DE361;
            color: black;
            transform: scale(1.1);
            transition: 0.5s;
        }

        &:active {
            background-color: #3DE361;
            color: black;
            transform: scale(0.9);
            transition: 0.5s;
        }

    
        .add-reto {
            justify-content: center;
            font-size:1vw;
            margin:0;
        }

        //media queries
        @media (width > 550px) {
            width: 30%;
            margin-right: 10px;

            add-reto {
                font-size: 50%;
                text-align: center;
                

        }

      

       
    `;

const Addbutton = () => {   
    const navigate = useNavigate(); 

    return (  
        <AddButton className="add-button" onClick={() => navigate("/NewItem")}>             
                <p className="add-reto">Añadir Reto</p>
        </AddButton>
        );
}

export default Addbutton; 