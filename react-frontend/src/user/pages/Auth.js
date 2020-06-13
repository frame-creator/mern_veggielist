import React, {useState, useContext} from 'react';
import Card from '../../elements/components/uielements/Card';
import Input from '../../elements/components/formelements/Input';
import Button from '../../elements/components/formelements/Button';
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE
} from '../../elements/util/validators';
import {useForm} from '../../elements/hooks/form-hook';
import {AuthContext} from '../../elements/context/auth-context';
import './Auth.css';
import LoadingSpinner from '../../elements/components/uielements/LoadingSpinner';
import ErrorModal from '../../elements/components/uielements/ErrorModal';
import {useHttpClient} from '../../elements/hooks/http-hook';
import ImageUpload from '../../elements/components/formelements/ImageUpload';

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
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
    }
    setIsLoginMode(prevMode => !prevMode);
  };

  const authSubmitHandler = async event => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/api/users/login',
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }),
          {
            'Content-Type': 'application/json'
          }
        );
        auth.login(responseData.userId, responseData.token);
      } catch (err) {}
    } else {
      try {
        const formData = new FormData();
        formData.append('email', formState.inputs.email.value);
        formData.append('name', formState.inputs.name.value);
        formData.append('password', formState.inputs.password.value);
        formData.append('image', formState.inputs.image.value);
        const responseData = await sendRequest(
          'http://localhost:5000/api/users/signup',
          'POST',
          formData
        );

        auth.login(responseData.userId, responseData.token);
      } catch (err) {}
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              element="input"
              id="name"
              type="text"
              label="프로필명"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="프로필 별명을 입력해주세요."
              onInput={inputHandler}
            />
          )}
          {!isLoginMode && (
            <ImageUpload
              center
              id="image"
              onInput={inputHandler}
              errorText="프로필 이미지를 등록해주세요."
            />
          )}
          <Input
            element="input"
            id="email"
            type="email"
            label="이메일"
            validators={[VALIDATOR_EMAIL()]}
            errorText="이메일 주소를 적어주세요."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="비밀번호"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="5글자 이상 비밀번호를 적어주세요."
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? '로그인' : '회원가입'}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          {isLoginMode ? '회원가입' : '로그인'} 화면으로 변경
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default Auth;