
import React, {useState, useCallback} from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import Places from './places/pages/Places';
import UserAndUserPlaces from './places/pages/UserAndUserPlaces';
import NewPlace from './places/pages/NewPlace';
import MainNavigation from './elements/navigation/MainNavigaton';
import Auth from './user/pages/Auth';
import UpdatePlace from './places/pages/UpdatePlace';
import './App.css';
import {AuthContext} from './elements/context/auth-context';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login= useCallback(
    () => {
      setIsLoggedIn(true)
    },
    [],
  );

  const logout = useCallback(
    () => {
      setIsLoggedIn(false);
    },[]
  );

  let routes;

if (isLoggedIn) {
  routes= (
    <Switch>
     <Route path="/" exact> 
       <Places/>
      
       
       </Route>
       <Route path="/:userId/places" exact>
            <UserAndUserPlaces/>
          </Route>
       <Route path="/places/new" exact> 
       <NewPlace/>
       </Route>
       <Route path="/auth" exact> 
       <Auth/>
       </Route>
      <Redirect to="/"/>
      </Switch>
  );
} else {
  routes= (
    <Switch>
     <Route path="/" exact> 
       <Places/>
      
       
       </Route>
       <Route path="/:userId/places" exact>
       <UserAndUserPlaces/>
          </Route>
       <Route path="/places/new" exact> 
       <NewPlace/>
       </Route>
       <Route path="/auth" exact> 
       <Auth/>
       </Route>
      <Redirect to="/auth"/>
      </Switch>
  );
}

  return (
   <AuthContext.Provider
   value={{isLoggedIn: isLoggedIn, login: login, logout: logout}}
  >
    <Router>
      <MainNavigation/>
      <main>{routes}</main>
    </Router>
  </AuthContext.Provider>
  );
}

export default App;
