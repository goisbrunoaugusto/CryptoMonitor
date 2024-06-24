import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import styled from 'styled-components';

const NavigationBarWrapper = styled.div`
  min-height: 4rem;
  background-color: #2d3748; /* Cor de fundo */
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
`;

const NavigationMenuList = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
`;

const NavigationMenuItem = styled.li`
  margin-left: 1rem;
`;

const NavigationMenuLink = styled(Link)`
  color: #cbd5e1; /* Cor do texto */
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  padding: 0.5rem 1rem;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #ffffff; /* Cor do texto ao passar o mouse */
  }
`;

const LogoutButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #cbd5e1; /* Cor do texto */
  font-size: 14px;
  font-weight: 500;
  padding: 0.5rem 1rem;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #ffffff; /* Cor do texto ao passar o mouse */
  }
`;

function NavigationBar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Verifica se o cookie do usuário está presente
        const userId = Cookies.get('userId');
        if (userId) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleSignOut = () => {
        // Remove o cookie e atualiza o estado
        Cookies.remove('userId');
        setIsLoggedIn(false);
        navigate('/'); // Redireciona para a página de login
    };

    return (
        <NavigationBarWrapper>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuLink as={Link} to="/home">
                        Dashboard
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink as={Link} to="/favorites">
                        Favorites
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    {isLoggedIn ? (
                        <LogoutButton onClick={handleSignOut}>Sign Out</LogoutButton>
                    ) : (
                        <NavigationMenuLink as={Link} to="/">Sign In</NavigationMenuLink>
                    )}
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationBarWrapper>
    );
}

export default NavigationBar;
