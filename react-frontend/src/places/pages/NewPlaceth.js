import React, {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import Input from '../../elements/components/formelements/Input';
import Button from '../../elements/components/formelements/Button';
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH
} from '../../elements/util/validators';
import ErrorModal from '../../elements/components/uielements/ErrorModal';
import LoadingSpinner from '../../elements/components/uielements/LoadingSpinner';

import { useForm} from '../../elements/hooks/form-hook';
import {useHttpClient} from '../../elements/hooks/http-hook';
import {AuthContext} from '../../elements/context/auth-context';
import './NewPlace.css';
import ImageUpload from '../../elements/components/formelements/ImageUpload';


const NewPlace = () => {
    const auth = useContext(AuthContext);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
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
        },
        image : {
            value: null,
            isValid: false
        }
    },
    false
  );

  const history = useHistory();

  const placeSubmitHandler = async event => {
      event.preventDefault();
      /* console.log(formState.inputs); */
      try {
          const formData = new FormData();
          formData.append('title', formState.inputs.title.value);
          formData.append('description', formState.inputs.description.value);
          formData.append('address', formState.inputs.address.value);
          formData.append('image', formState.inputs.image.value);
          await sendRequest(process.env.REACT_APP_BACKEND_URL + '/places','Post', formData, {
              Authorization: 'Bearer' + auth.token
          }
          );
          history.push('/');

      } catch (err) {}

  };



    return  ( 
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
    <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner as Overlay/>}
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
        errorText="등록할 식당 설명을 5글자 이상 입력해주세요"
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
        <ImageUpload
        id="image"
        onInput= {inputHandler}
        errorText="이미지를 등록해주세요."
        />
        <Button type="submit" disabled={!formState.isValid}>
            식당 등록하기
        </Button>

    </form>
    </React.Fragment>
    );
};

export default NewPlace;