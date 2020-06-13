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
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [formState, inputHandler] = useForm(
      {
        title: {
          value: '',
          isValid: false
        },
        description: {
          value: '',
          isValid: false
        },
        address: {
          value: '',
          isValid: false
        },
        image: {
          value: null,
          isValid: false
        }
      },
      false
    );
  
    const history = useHistory();
  
    const placeSubmitHandler = async event => {
      event.preventDefault();
      try {
        const formData = new FormData();
        formData.append('title', formState.inputs.title.value);
        formData.append('description', formState.inputs.description.value);
        formData.append('address', formState.inputs.address.value);
        formData.append('image', formState.inputs.image.value);
        await sendRequest('http://localhost:5000/api/places/new', 'POST', formData, {
          Authorization: 'Bearer ' + auth.token
        });
        history.push('/');
      } catch (err) {}
    };
  
    return (
      <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        <form className="place-form" onSubmit={placeSubmitHandler}>
          {isLoading && <LoadingSpinner asOverlay />}
          <Input
            id="title"
            element="input"
            type="text"
            label="맛집 이름"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="맛집 이름을 입력해주세요."
            onInput={inputHandler}
          />
          <Input
            id="description"
            element="textarea"
            label="맛집 설명"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="5글자 이상 맛집 설명을 적어주세요."
            onInput={inputHandler}
          />
          <Input
            id="address"
            element="input"
            label="맛집 주소"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="맛집 주소를 적어주세요. 등록 후 지도에 자동 표시됩니다."
            onInput={inputHandler}
          />
          <ImageUpload
            id="image"
            onInput={inputHandler}
            errorText="이미지를 등록해주세요."
          />
          <Button type="submit" disabled={!formState.isValid}>
            채식 맛집 등록하기
          </Button>
        </form>
      </React.Fragment>
    );
  };
  
  export default NewPlace;