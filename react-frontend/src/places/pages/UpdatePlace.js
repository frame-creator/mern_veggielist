import React, {useEffect, useState, useContext} from 'react';
import {useParams, useHistory} from 'react-router-dom';

import Input from '../../elements/components/formelements/Input';
import Button from '../../elements/components/formelements/Button';
import Card from '../../elements/components/uielements/Card';
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH
} from '../../elements/util/validators';
import LoadingSpinner from '../../elements/components/uielements/LoadingSpinner';
import ErrorModal from '../../elements/components/uielements/LoadingSpinner';
import { useForm } from '../../elements/hooks/form-hook';
import './UpdatePlace.css';
import { useHttpClient} from '../../elements/hooks/http-hook';
import {AuthContext} from '../../elements/context/auth-context';

/*
const DUMMY_PLACES =[
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

    const UpdatePlace = () => {
        const auth = useContext(AuthContext);
        const {isLoading, error, sendRequest, clearError} = useHttpClient();
        const [loadedPlace, setLoadedPlace] = useState();
        const placeId = useParams().placeId;
        const history = useHistory();

        const [formState, inputHandler, setFormData] = useForm(
        {
            title: {
                value: '',
                isValid: false
            },
            description: {
                value: '',
                isValid: false
            }
        },
        false
        );

    /* const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId); 


    useEffect(() => {
        if (identifiedPlace) {
            setFormData (
                {
                title: {
                    value: identifiedPlace.title,
                    isValid: true
                },
                description : {
                    value: identifiedPlace.description,
                    isValid: true
                }
            },
            true
            );
        }

        setIsLoading(false);
     }, [setFormData, identifiedPlace]);
    const placeUpadateSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
    };

    if (!identifiedPlace) {
      return (
          <div className="center">
              <Card>
                  <h2>식당을 찾을 수 없습니다.</h2>
              </Card>
          </div>
      );
    }

if(isLoading) {
    return (
        <div className="center">
            <h2>로딩중...</h2>
        </div>
    );
}
*/

useEffect(() => {
    const fetchPlace = async () => {
        try {
            const responseData = await sendRequest(
                `http://localhost:5000/api/places/${placeId}`
            );
            setLoadedPlace(responseData.place);
            setFormData(
                {
                    title: {
                        value: responseData.place.title,
                        isValid: true
                    },
                    description : {
                        value: responseData.place.description,
                        isValid: true
                    }
                },
                true
            );
        } catch(err) { }
    };
    fetchPlace();
}, [sendRequest, placeId, setFormData]);

const placeUpadateSubmitHandler = async event => {
    event.preventDefault();
    try {
        await sendRequest(
            `http://localhost:5000/api/places/${placeId}`,
            'PATCH',
            JSON.stringify({
                title: formState.inputs.title.value,
                description: formState.inputs.description.value
            }),
            {
                'Content-Type' : 'application/json',
                Authorization: 'Bearer ' + auth.token
            }
        );
        history.push('/' + auth.userId + '/places');
    } catch (err) {}

            };

   if (isLoading) {
       return (
           <div className = "center">
           <LoadingSpinner/>
           </div>
       );
   }     
   
   if (!loadedPlace && !error) {
       return (
           <div className="center">
           <Card>
           <h2>해당 맛집을 찾을 수 없습니다.</h2>
           </Card>
           </div>
       );
   }
        

return (
    <React.Fragment>
        <ErrorModal error={error} onClear={clearError}/>
        {!isLoading && loadedPlace && (
    <form className="place-form" onSubmit={placeUpadateSubmitHandler}>
        <Input
        id="title"
        element="input"
        type="text"
        label="식당 이름"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="변경할 맛집 이름을 입력해주세요."
        onInput={inputHandler}
        initialValue = {loadedPlace.title}
        initialValid = {true}
        />

        <Input
        id="description"
        element="textarea"
        label="자세한 설명"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="변경할 맛집 설명을 5글자 이상 입력해주세요."
        onInput={inputHandler}
        initialValue={loadedPlace.description}
        initialValid={true}
   />
   <Button type="submit" disabled={!formState.isValid}>
       업데이트
   </Button>
    </form>
        )}
</React.Fragment>
);

    };

    export default UpdatePlace;