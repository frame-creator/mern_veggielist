import React from 'react';
import Input from '../../elements/components/formelements/Input';
import Button from '../../elements/components/formelements/Button';
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH
} from '../../elements/util/validators';
import { useForm} from '../../elements/hooks/form-hook';
import './NewPlace.css';


const NewPlace = () => {
  const [formState, inputHandler] = useForm(
    {
        title: {
            value: '',
            isValid: false
        },
        description : {
            value: '',
            isValid: false
        },
        address: {
            value: '',
            isValid: false
        }
    },
    false
  );

  const placeSubmitHandler = event => {
      event.preventDefault();
      console.log(formState.inputs);

  };



    return  ( 
    <form className="place-form" onSubmit={placeSubmitHandler}>
        <Input
        id="title"
        element="input" 
        type="text" 
        label="식당 이름"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="등록할 식당 제목을 입력해주세요"
        onInput={inputHandler}
        />
        <Input
        id="description"
        element="textarea" 
        
        label="자세한 이야기"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="등록할 식당 설명을 입력해주세요"
        onInput={inputHandler}
        />
        <Input
        id="address"
        element="input" 
        
        label="식당 주소"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="등록할 식당 주소를 입력해주세요"
        onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
            식당 등록하기
        </Button>

    </form>
    );
};

export default NewPlace;