import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import UserPlaceList from '../components/UserPlaceList';
import LoadingSpinner from '../../elements/components/uielements/LoadingSpinner';
import {useHttpClient} from '../../elements/hooks/http-hook';



import './UserPlaces.css';


/* const DUMMY_PLACES =[
    {id: 'p1',
title: '솔밭식당',
description: '한정식과 건강식을 함께 즐길 수 있는 곳',
image: 'https://post-phinf.pstatic.net/MjAyMDAxMDZfMTY4/MDAxNTc4Mjg1MzUzNzU5.ZCH7YKEi7KWTuE9N-g2o-4QZdreKZ-Aflm4BpvLZIZ0g.6Xd_wZpXB7y9uAAQ4RZ9YhumEmarhja-0cwdIkxgQjYg.JPEG/3%ED%94%8C%EB%9E%9C%ED%8A%B8.jpg?type=w1200',
address: '서울 강남구 역삼동 34-1',
location: {
lat:37.50766369999999,
lng :127.0405894
},
creator: 'u1'
    },
    {id: 'p2',
title: '솔밭식당',
description: '한정식과 건강식을 함께 즐길 수 있는 곳',
image: 'https://images.unsplash.com/photo-1565893321847-76fe35a3032c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1200&q=60',
address: '서울 강남구 역삼동 34-1',
location: {
lat:37.50766369999999,
lng :127.0405894
},
creator: 'u1'
    },
    {id: 'p3',
title: '솔밭식당',
description: '한정식과 건강식을 함께 즐길 수 있는 곳',
image: 'https://images.unsplash.com/photo-1516749396351-ab12ad535d7c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1200&q=60',
address: '서울 강남구 역삼동 34-1',
location: {
lat:37.50766369999999,
lng :127.0405894
},
creator: 'u1'
    },
    
    {id: 'p4',
title: '솔밭식당',
description: '한정식과 건강식을 함께 즐길 수 있는 곳',
image: 'https://post-phinf.pstatic.net/MjAyMDAxMDZfMTY4/MDAxNTc4Mjg1MzUzNzU5.ZCH7YKEi7KWTuE9N-g2o-4QZdreKZ-Aflm4BpvLZIZ0g.6Xd_wZpXB7y9uAAQ4RZ9YhumEmarhja-0cwdIkxgQjYg.JPEG/3%ED%94%8C%EB%9E%9C%ED%8A%B8.jpg?type=w1200',
address: '서울 강남구 역삼동 34-1',
location: {
lat:37.50766369999999,
lng :127.0405894
},
creator: 'u4'
    },
    
    {id: 'p5',
title: '솔밭식당',
description: '한정식과 건강식을 함께 즐길 수 있는 곳',
image: 'https://post-phinf.pstatic.net/MjAyMDAxMDZfMTY4/MDAxNTc4Mjg1MzUzNzU5.ZCH7YKEi7KWTuE9N-g2o-4QZdreKZ-Aflm4BpvLZIZ0g.6Xd_wZpXB7y9uAAQ4RZ9YhumEmarhja-0cwdIkxgQjYg.JPEG/3%ED%94%8C%EB%9E%9C%ED%8A%B8.jpg?type=w1200',
address: '서울 강남구 역삼동 34-1',
location: {
lat:37.50766369999999,
lng :127.0405894
},
creator: 'u5'
    },
    
    {id: 'p6',
title: '솔밭식당',
description: '한정식과 건강식을 함께 즐길 수 있는 곳',
image: 'https://post-phinf.pstatic.net/MjAyMDAxMDZfMTY4/MDAxNTc4Mjg1MzUzNzU5.ZCH7YKEi7KWTuE9N-g2o-4QZdreKZ-Aflm4BpvLZIZ0g.6Xd_wZpXB7y9uAAQ4RZ9YhumEmarhja-0cwdIkxgQjYg.JPEG/3%ED%94%8C%EB%9E%9C%ED%8A%B8.jpg?type=w1200',
address: '서울 강남구 역삼동 34-1',
location: {
lat:37.50766369999999,
lng :127.0405894
},
creator: 'u6'
    },
    ];
*/
    const UserPlaces = () => { 
const [loadedUserPlaces, setLoadedUserPlaces] = useState();
const {isLoading, error, sendRequest, clearError } = useHttpClient();
const userId = useParams().userId;

useEffect (() => {
    const fetchUserPlaces = async () => {
        try {
        const responseData = await sendRequest(
            `http://localhost:5000/api/places/user/${userId}`
        );
        setLoadedUserPlaces(responseData.places);
        } catch (err) {}
    };
    fetchUserPlaces();
},[sendRequest, userId]);

const placeDeletedHandler = deletedPlaceId => {
    setLoadedUserPlaces(prevPlaces =>
        prevPlaces.filter(place => place.id !== deletedPlaceId)
        );
};


    return (
        <React.Fragment>
    {isLoading && (
        <div className="center">
            <LoadingSpinner/>
        </div>
    )}
    {!isLoading && loadedUserPlaces && (

    
    <div className="user-places-table">
    <div className="user-places-table__title">
        <h3>내가 등록한 맛집</h3>
    </div>
    <UserPlaceList items={loadedUserPlaces}  onDeletePlace={placeDeletedHandler}/>
    </div> 
    )}
    </React.Fragment>
    );
};

export default UserPlaces;

