import React from 'react';

import UserItem from './UserItem';
import Card from '../../elements/components/uielements/Card';
import './UserContainer.css';

const UserContainer = props => {
  

  return (
    <ul className="users-list">
      {props.items.map(user => (
        <UserItem
          key={user.id}
          id={user.id}
          image={user.image}
          name={user.name}
          email={user.email}
         
        />
      ))}
    </ul>
  );
};

export default UserContainer;