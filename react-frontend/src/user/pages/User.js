import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import UserItem from '../components/UserItem';
import {useHttpClient} from '../../elements/hooks/http-hook';
import LoadingSpinner  from '../../elements/components/uielements/LoadingSpinner';

const User = () => {
  const {isLoading, error, sendRequest, clearError} = useHttpClient();
  const [loadedUser, setLoadedUser] = useState();
  const userId = useParams().userId;
   /* const USER_DATA = [
      { id: 'u1',
       name: 'pen',
       image: 'https://images.unsplash.com/photo-1465101162946-4377e57745c3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
     

    }
    ]
*/
useEffect (() => {
  const fetchUser = async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/users/${userId}`
      );
      setLoadedUser(responseData.user)
    } catch(err) {}
  };
  fetchUser();
},[sendRequest, userId]);
 
    return (
    <React.Fragment>
      {isLoading && (
        <div className="center">
          <LoadingSpinner/>
        </div>
      )}
      {
        !isLoading &&
        loadedUser &&
     <UserItem 
          loadedUser={loadedUser}
          key={loadedUser.id}
          id={loadedUser.id}
          image={loadedUser.image}
          name={loadedUser.name}
          email={loadedUser.email}/>
     }
     </React.Fragment>
    )
};

export default User;