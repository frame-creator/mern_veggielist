import React from 'react';
import UserContainer from '../components/UserContainer';

const User = () => {
    const USER_DATA = [
      { id: 'u1',
       name: 'pen',
       image: 'https://images.unsplash.com/photo-1465101162946-4377e57745c3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
       places : 3

    }
    ]

    return <UserContainer  items={USER_DATA}/>
};

export default User;