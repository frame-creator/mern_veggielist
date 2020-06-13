import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import {AuthContext} from '../context/auth-context';
import './NavLinks.css';

const NavLinks = props => {
const auth = useContext(AuthContext);

return ( <ul className="nav-links">
    <li>
        <NavLink to ="/" exact >
            채식 맛집 전체
        </NavLink>
    </li>
    {auth.isLoggedIn && (
    <li>
      <NavLink to ={`/${auth.userId}/places`}>
            내가 등록한 맛집
    </NavLink>
    </li> 
    )}
    {auth.isLoggedIn && (
    <li>
      <NavLink to ="/places/new"  >
            채식 맛집 등록하기
    </NavLink>
    </li>
    )}
    {!auth.isLoggedIn && (
    <li>
      <NavLink to ="/auth">
            내가 등록한 맛집
    </NavLink>
    </li> 
    )}
    {!auth.isLoggedIn && (
    <li>
      <NavLink to ="/places/new"  >
            채식 맛집 등록하기
    </NavLink>
    </li>
    )}
    {!auth.isLoggedIn &&(
   
    <li>
      <NavLink to ="/auth"  >
           로그인
    </NavLink>
    </li>
    )}
    {auth.isLoggedIn && (
      <li>
        <button onClick={auth.logout}>
          로그아웃
        </button>
      </li>
    )}
    </ul>
);  
};
export default NavLinks;