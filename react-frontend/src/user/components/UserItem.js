import React from 'react';

import Avatar from '../../elements/components/uielements/Avatar';
import Card from '../../elements/components/uielements/Card';


import './UserItem.css';

const UserItem = props => {
return(
    
    <li className= "user-item">
        <Card className="user-item__content">
            
            <div className="user-item__image">
             <img src={`https://tebackend.herokuapp.com/${props.image}`} alt={props.name}/>
             </div>
             <div className="user-item__info">
                 <h2>{props.name}</h2>
                <p>{props.email}</p>
                 
                 </div>          
        </Card>
    </li>
    
)
};

export default UserItem;