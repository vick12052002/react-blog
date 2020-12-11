import React from 'react';
import styled from 'styled-components';
import logo from '../../img/logo.png';
import { device } from '../../style/breakpoints';
const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: ${(props) => props.theme.background};
  padding: 10px 30px;

  @media ${device.Desktops} {
    flex-direction: row;
  }
`;
const Logo = styled.img`
  max-width: 150px;
  height: auto;
`;
const Copyright = styled.p`
  color: ${(props) => props.theme.textColor};
  font-size: 12px;
`;

export default function Footer() {
  return (
    <FooterContainer>
      <Logo src={logo} to="/" />
      <Copyright>Made by alirong</Copyright>
    </FooterContainer>
  );
}
