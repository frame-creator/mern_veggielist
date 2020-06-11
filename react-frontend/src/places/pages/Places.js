import React, {useEffect, useState} from 'react';
import PlaceList from '../components/PlaceList';
import ErrorModal from '../../elements/components/uielements/ErrorModal';
import LoadingSpinner from '../../elements/components/uielements/LoadingSpinner';
import {useHttpClient} from '../../elements/hooks/http-hook';

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
image: 'https://images.unsplash.com/photo-1544510806-07b18f692386?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
address: '서울 강남구 역삼동 34-1',
location: {
lat:37.50766369999999,
lng :127.0405894
},
creator: 'u2'
    },
    {id: 'p3',
title: '솔밭식당',
description: '한정식과 건강식을 함께 즐길 수 있는 곳',
image: 'https://images.unsplash.com/photo-1535923633864-cbf229ad891c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1200&q=60',
address: '서울 강남구 역삼동 34-1',
location: {
lat:37.50766369999999,
lng :127.0405894
},
creator: 'u3'
    },
    
    {id: 'p4',
title: '솔밭식당',
description: '한정식과 건강식을 함께 즐길 수 있는 곳',
image: 'https://images.unsplash.com/photo-1519996409144-56c88c9aa612?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
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
image: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1200&q=60',
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
image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1200&q=60',
address: '서울 강남구 역삼동 34-1',
location: {
lat:37.50766369999999,
lng :127.0405894
},
creator: 'u6'
    },
    ];
*/
    const Places = () => { 

const {isLoading, error, sendRequest, clearError} = useHttpClient();
const [loadedPlaces, setLoadedPlaces] = useState();

useEffect (() => {
    const fetchPlaces = async() => {
        try {
            const responseData = await sendRequest (
                'http://localhost:5000/api/places'
               
            );

            setLoadedPlaces(responseData.places);
        } catch (err) {}
    };
    fetchPlaces();
}, [sendRequest]);


    return (
<React.Fragment>
 
    {isLoading && (
        <div className ="center">
            <LoadingSpinner/>
        </div>
    )}
    {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces}/>}
</React.Fragment>
    );
};

export default Places;

