import React from 'react';
import Card from '../../elements/components/uielements/Card';
import UserPlaceItem from './UserPlaceItem';

import './UserPlaceList.css';


const UserPlaceList = props => {
    if (props.items.length === 0) {
return ( <div className="user-place-list center">
<Card>
    <h2>등록하신 장소가 없습니다. 새로운 장소를 등록해주세요.</h2>
<button>장소 등록하기</button>
</Card>
</div>
 ); } 

return (
<ul className="user-place-list">
{props.items.map(place => (
<UserPlaceItem 
key={place.id} 
id={place.id} 
image={place.image}
title={place.title}
description={place.description}
address={place.address}
creatorId={place.creator}
coordinates={place.location}
onDelete={props.onDeletePlace}
/>
))}

</ul>
);
};
export default UserPlaceList;