import React from 'react';
import User from '../../user/pages/User';
import UserPlaces from './UserPlaces';
import './UserAndUserPlaces.css';
const UserAndUserPlaces = () => {
 return (
    <div className = "user-and-userplaces">
     <div className = "user-and-userplaces__title">
     <User/>
     </div>
     <div className = "user-and-userplaces__places">
     <UserPlaces/>
     </div>
     </div>
 )
}

export default UserAndUserPlaces;