import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';



const StyledNav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #333;
  color: white;
  padding: 10px 0;
`;


const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  margin: 0 10px;
`;

const Nav = () => {
  return (
    <StyledNav>
      <p>LEANKATA</p>
      <StyledLink to="/NewItem">Proyecto-retos</StyledLink>
      <StyledLink to="/">INICIO</StyledLink>
      <StyledLink to="/Edit/:id">Tablero-Principal</StyledLink>

    </StyledNav>
  );
};

export default Nav;

