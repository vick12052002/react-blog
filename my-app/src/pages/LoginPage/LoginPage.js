import React, { useState,useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button, ButtonLight } from '../../components/Button';
import { login } from '../../WebAPI';
import { setAuthToken } from '../../utils'
const LoginForm = styled.form`
  max-width: 320px;
  height: auto;
  margin: 40px auto;
  box-shadow: 5px 5px 5px ${(props) => props.theme.shadow}44;
  border-radius: 5px;
  border: 1px solid;
  padding: 20px 50px;
  position: relative;
`;
const FormTitle = styled.h4`
  color: #0e4e7cff;
  text-align: center;
`;
const ErrorMessage = styled.h6`
  color: ${(props) => props.theme.errorText};
  text-align: center;
  margin: 0 auto;
`;
const InputLabel = styled.label`
  margin: 20px auto;
  text-align: center;
  font-size: 1.2rem;
  display: block;
`;
const Input = styled.input`
  padding: 8px 16px;
  font-size: 1.2rem;
  border: none;
  border-bottom: 2px solid ${(props) => props.theme.background};
`;
const SubmitBtn = styled(ButtonLight)`
  margin: 30px auto;
  position: relative;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
`;

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!username || !password) {
      return setErrorMessage('請填寫帳號或密碼');
    }
    login(username, password).then((data) => {
      if (!data.ok) {
        return setErrorMessage(data.message.toString());
      }
      setAuthToken(data.token)
    });
  };
  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setErrorMessage(null);
    if (name === 'username') {
      setUsername(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
  };
  return (
      <LoginForm>
        <FormTitle>登入</FormTitle>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <InputLabel name="username">
          帳號：
          <Input type="text" name="username" value={username} onChange={handleChangeValue} />
        </InputLabel>
        <InputLabel name="password">
          密碼：
          <Input type="password" name="password" value={password} onChange={handleChangeValue} />
        </InputLabel>
        <SubmitBtn type="submit" onClick={handleLogin}>
          送出
        </SubmitBtn>
      </LoginForm>
  );
}
