import React, {useEffect, useState} from 'react';
import UserContainer from '../components/UserContainer';
import {useHttpClient} from '../../elements/hooks/http-hook';
import LoadingSpinner  from '../../elements/components/uielements/LoadingSpinner';

const User = () => {
  const {isLoading, error, sendRequest, clearError} = useHttpClient();
  const [loadedUser, setLoadedUser] = useState();
   /* const USER_DATA = [
      { id: 'u1',
       name: 'pen',
       image: 'https://images.unsplash.com/photo-1465101162946-4377e57745c3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
       places : 3

    }
    ]
*/
useEffect (() => {
  const fetchUser = async () => {
    try {
      const responseData = await sendRequest(
        'https://tebackend.herokuapp.com/api/users/:uid'
      );
      setLoadedUser(responseData.users)
    } catch(err) {}
  };
  fetchUser();
},[sendRequest]);
 
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
     <UserContainer items={loadedUser}/>
     }
     </React.Fragment>
    )
};

export default User;