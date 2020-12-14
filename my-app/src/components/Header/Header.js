import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { device } from '../../style/breakpoints';
import logo from '../../img/logo.png';
import { ReactComponent as Menu } from '../../img/menu.svg';
import { getAuthToken, setAuthToken } from '../../utils';
import { getMe } from '../../WebAPI';
import { AuthContext } from '../../context';
const HeaderContainer = styled.div`
  height: 90px;
  background-color: ${(props) => props.theme.background};
  text-align: center;
  position: relative;
  @media ${device.Tablets} {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
  }
`;
const Logo = styled.img`
  max-width: 150px;
  height: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @media ${device.Tablets} {
    position: unset;
    top: 0;
    left: 0;
    transform: unset;
    max-height: 40px;
  }
`;
const MemberGroup = styled.div`
  order: -1;
  background-color: white;
  display: flex;
  flex-direction: column;
  @media ${device.Tablets} {
    background-color: unset;
    order: 1;
    flex-direction: row;
  }
`;
const NavbarList = styled.nav`
  transition: text 0.8s ease-in, right 0.4s ease-in;
  display: flex;
  flex-direction: column;
  background-color: white;
  ${(props) =>
    props.$mouse &&
    `
    right:0;
    `}
  @media ${device.Tablets} {
    background-color: unset;
    top: 0;
    right: 0;
    display: block;
    height: auto;
    z-index: 1;
  }
`;
const MenuButton = styled.div`
  z-index: 2;
  width: 50px;
  height: 50px;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(-50%, -50%);
  cursor: pointer;
  @media ${device.Tablets} {
    display: none;
  }
`;
const NavbarContainer = styled.div`
  display: none;
  position: relative;
  z-index: 1;
  top: 90px;
  right: -100%;
  flex-direction: column;
  transition: text 0.8s ease-in, right 0.4s ease-in;

  ${(props) =>
    props.$mouse &&
    `
    display:flex;
    right:0;
  `}
  @media ${device.Tablets} {
    width: 70vw;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    display: flex;
    top: 0;
    right: 0;
  }
`;
const Nav = styled(Link)`
  text-align: center;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.navbarHover};
  border-bottom: 1px solid ${(props) => props.theme.background};
  font-size: 22px;
  padding: 16px 0;
  text-decoration: none;
  z-index: 1;
  transition: color 0.2s ease;
  &:hover {
    color: ${(props) => props.theme.textHover};
    cursor: pointer;
    background-color: ${(props) => props.theme.navbarHover}cc;
  }
  @media ${device.Tablets} {
    padding: 16px 1em;
    background-color: unset;
    z-index: 0;
    border-bottom: unset;
    &:hover {
      background-color: unset;
    }
  }
`;
const LogoutBtn = styled.div`
  text-align: center;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.navbarHover};
  border-bottom: 1px solid ${(props) => props.theme.background};
  font-size: 22px;
  padding: 16px 0;
  text-decoration: none;
  transition: text 0.8s ease-in;
  &:hover {
    color: ${(props) => props.theme.textHover};
    cursor: pointer;
    background-color: #0e4e7ccc;
  }
  @media ${device.Tablets} {
    padding: 16px 1em;
    background-color: unset;
    border-bottom: unset;
    &:hover {
      background-color: unset;
    }
  }
`;
const Brand = () => {
  return (
    <Link to="/">
      <Logo src={logo} />
    </Link>
  );
};

export default function Header() {
  const { user, setUser } = useContext(AuthContext);
  const [mouseInMenu, setMouseInMenu] = useState(false);
  const location = useLocation();
  console.log(location.pathname);
  useEffect(() => {
    const token = getAuthToken();
    console.log(token);
    if (token) {
      getMe().then((userInfo) => {
        setUser(userInfo.data);
      });
    }
  }, [setUser]);

  const handleLogout = (e) => {
    setAuthToken('');
    setUser(null);
  };
  const handleMouseEnter = (e) => {
    if (mouseInMenu) return;
    setMouseInMenu(true);
  };
  const handleMouseLeave = (e) => {
    setMouseInMenu(false);
  };
  return (
    <HeaderContainer>
      <Brand />
      <MenuButton onMouseEnter={handleMouseEnter} $mouse={mouseInMenu}>
        <Menu fill="#fff" width="50px" height="50px" />
      </MenuButton>
      <NavbarContainer $mouse={mouseInMenu} onMouseLeave={handleMouseLeave}>
        <NavbarList>
          <Nav $active to="/about">
            about
          </Nav>
          <Nav to="/all-posts">所有文章</Nav>
          {user && <Nav to="/add-post">我要發表文章</Nav>}
        </NavbarList>
        <MemberGroup>
          {user && (
            <LogoutBtn
              onClick={() => {
                handleLogout();
              }}>
              登出
            </LogoutBtn>
          )}
          {!user && (
            <>
              {location.pathname !== '/register' && <Nav to="/register">註冊</Nav>}
              {location.pathname !== '/login' &&<Nav to="/login">登入</Nav>}
            </>
          )}
        </MemberGroup>
      </NavbarContainer>
    </HeaderContainer>
  );
}
