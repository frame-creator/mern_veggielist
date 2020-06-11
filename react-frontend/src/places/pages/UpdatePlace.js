import React, {useEffect, useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';

import Input from '../../elements/components/formelements/Input';
import Button from '../../elements/components/formelements/Button';
import Card from '../../elements/components/uielements/Card';
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH
} from '../../elements/util/validators';
import LoadingSpinner from '../../elements/components/uielements/LoadingSpinner';

import { useForm } from '../../elements/hooks/form-hook';
import './UpdatePlace.css';

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


    const UpdatePlace = () => {
        const [isLoading, setIsLoading] = useState(true);
        const placeId = useParams().placeId;

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

    const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId);


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

return (
    <form className="place-form" onSubmit={placeUpadateSubmitHandler}>
        <Input
        id="title"
        element="input"
        type="text"
        label="식당 이름"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="변경할 식당 이름을 입력해주세요."
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
        />

        <Input
        id="description"
        element="textarea"
        label="자세한 설명"
        validator={[VALIDATOR_MINLENGTH(5)]}
        errorText="변경할 설명을 입력해주세요."
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
   />
   <Button type="submit" disabled={!formState.isValid}>
       업데이트
   </Button>
    </form>
)

    };

    export default UpdatePlace;