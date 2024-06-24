import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavigationMenuWrapper = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  max-width: max-content;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const NavigationMenuList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const NavigationMenuItem = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: #4b5563;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #1a202c;
  }
`;

const NavigationMenuTrigger = styled.button`
  background-color: #ffffff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  color: #4b5563;
  padding: 8px 12px;
  border-radius: 6px;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

  &:hover {
    background-color: #edf2f7;
    color: #2d3748;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
  }
`;

const ChevronIcon = styled(ChevronDown)`
  width: 18px;
  height: 18px;
  margin-left: 6px;
  transition: transform 0.2s ease-in-out;
`;

const NavigationMenuContent = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 160px;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  z-index: 1000;
  display: none;
`;

const NavigationMenuItemLink = styled(Link)`
  display: block;
  padding: 10px 16px;
  color: #4b5563;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #2d3748;
  }
`;

const NavigationMenuTriggerWrapper = styled.div`
  position: relative;
`;

function NavigationMenu({ children }) {
  return (
    <NavigationMenuWrapper>
      <NavigationMenuList>{children}</NavigationMenuList>
    </NavigationMenuWrapper>
  );
}

function NavigationMenuTriggerComponent({ children }) {
  return (
    <NavigationMenuTriggerWrapper>
      <NavigationMenuTrigger>
        {children}
        <ChevronIcon />
      </NavigationMenuTrigger>
    </NavigationMenuTriggerWrapper>
  );
}

function NavigationMenuContentComponent({ children }) {
  return <NavigationMenuContent>{children}</NavigationMenuContent>;
}

export {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuTriggerComponent as NavigationMenuTrigger,
  NavigationMenuContentComponent as NavigationMenuContent,
  NavigationMenuItemLink as NavigationMenuLink,
};
