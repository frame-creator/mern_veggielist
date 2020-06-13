import React from 'react';
import {Link} from 'react-router-dom';
 

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import './MainNavigation.css';

const MainNavigation = props => {
    return (
        <MainHeader>
         
         
      <h1 className="main-navigation__title">
        <Link to="/">베지리스트</Link>
      </h1>
      <nav className="main-navigation__header-nav">
       <NavLinks/>
      </nav>  

        </MainHeader>
    );
};

export default MainNavigation;