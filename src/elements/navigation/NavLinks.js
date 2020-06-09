import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import {AuthContext} from '../context/auth-context';
import './NavLinks.css';

const NavLinks = props => {
const auth = useContext(AuthContext);

return  <ul className="nav-links">
    <li>
        <NavLink to ="/" exact >
            채식 식당 전체
        </NavLink>
    </li>
    <li>
      <NavLink to ="/u1/places"  >
            내가 등록한 식당
    </NavLink>
    </li>
    <li>
      <NavLink to ="/places/new"  >
            채식 식당 등록하기
    </NavLink>
    </li>
    <li>
      <NavLink to ="/auth"  >
           로그인
    </NavLink>
    </li>
    </ul>
    
};
export default NavLinks;