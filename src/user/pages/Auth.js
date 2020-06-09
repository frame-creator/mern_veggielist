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

const Auth = () => {
    const auth = useContext(AuthContext);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [formState, inputHandler, setFormData] = useForm (
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
                    name: undefined
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
                    }
                },
                false
            );
        }
        setIsLoginMode(prevMode => !prevMode);
        };

        const authSubmitHandler = event => {
            event.preventDefault();
            auth.login();
        };
        return (
            <Card className="authentication">
                <h2>로그인</h2>
                <hr/>
                <form onSubmit = {authSubmitHandler}>
                    {!isLoginMode && (
                        <input
                        element ="input"
                        id="name"
                        
                        type="text"
                        label="프로필 이름 또는 별명"
                        vlidators={[VALIDATOR_REQUIRE()]}
                        errorText="프로필 이름 또는 별명을 입력해 주세요."
                        onInput={inputHandler}
                        />
                    )}
                    <Input
                    element="input"
                    id="email"
                    type="email"
                    label="이메일"
                    validators={[VALIDATOR_EMAIL()]}
                    errorText="유효한 이메일 주소를 입력해주세요."
                    onInput={inputHandler}
                    />
                    
                
                    <Input
                    element="input"
                    id="password"
                    type="password"
                    label="비밀번호"
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText="유효한 비밀번호를 입력해주세요."
                    onInput={inputHandler}
                    />
                    <Button type="submit" disabled={!formState.isValid}>
                    {isLoginMode ? '로그인' : '회원가입'}
                    </Button>
                </form>
                <Button inverse onClick={switchModeHandler}>
                    {isLoginMode ? '회원가입' : "로그인"} 화면으로 변경
                </Button>
            </Card>
        );
    } ;
export default Auth;
