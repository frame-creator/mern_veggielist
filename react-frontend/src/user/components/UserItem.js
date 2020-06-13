import React from 'react';


import Card from '../../elements/components/uielements/Card';


import './UserItem.css';

const UserItem = props => {
return(
    <React.Fragment>
    <li className= "user-item">
        <Card className="user-item__content">
            
            <div className="user-item__image">
             <img src={`http://localhost:5000/${props.image}`} alt={props.name}/>
             </div>
             <div className="user-item__info">
                 <h2>{props.name}</h2>
                <p>{props.email}</p>
                 
                 </div>          
        </Card>
    </li>
    </React.Fragment>
    
)
};

export default UserItem;