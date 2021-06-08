import React, {useState} from 'react';
import {useDispatch} from 'react-redux';

import {push} from 'connected-react-router';
import Routes from 'App/constants/routes';

import Request from 'App/utils/request';

import {
  loginAction,
} from 'Features/auth';

import LockIcon from '@material-ui/icons/Lock';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Input from './components/input';

import WaveHeader from 'Components/waveHeader';
import {WhiteCircularProgress} from 'Components/circularProgress';

import SetLogo from 'Assets/set_logo.svg';
import MiniLogoIcon from 'Assets/mini_logo.svg';

import {
  Wrapper,
  BigHead,
  HeaderLogo,
  ContentWrapper,
  ForgotPasswordLink,
  LoginButton,
  FooterWrapper,
  MiniLogo,
  FooterText,
}  from './index.styled';

function Login() {
  const dispatch = useDispatch();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const disabled = !login || !password;

  const loginHandler = () => {
    if (loading) {
      return;
    }

    if (login && password) {
      const _login = login.startsWith('+') ? login : `+${login}`;

      setLoading(true);

      Request
        .post('/login', {login: _login, password})
        .then(({data}) => {
          dispatch(loginAction(data));
        })
        .catch(error => {
          setLoading(false);

          if (error.response && error.response.status === 401) {
            setError('Incorrect data for the login');
          } else {
            setError('Something went wrong. Please, try again later');
          }
        });
    }
  };

  const enterPressedHandler = (key) => {
    if (key === 13) {
      loginHandler();
    }
  };

  const loginInputHandler = (phone) => {
    setError(null);
    setLogin(phone);
  };

  const passwordInputHandler = (event) => {
    setError(null);
    setPassword(event.target.value);
  };

  return (
    <Wrapper>
      <WaveHeader>
        <HeaderLogo src={SetLogo}/>
        <BigHead>
          Welcome Back
        </BigHead>
      </WaveHeader>

      <ContentWrapper>

        <PhoneInput
          country={'us'}
          placeholder={'Phone number'}
          value={login}
          onKeyPress={(e) => enterPressedHandler(e.charCode)}
          onChange={loginInputHandler}

          inputStyle={{
            width: '100%',
            height: 40,
            border: 'none',
            borderBottom: error ? '2px solid #f44335' : '1px solid #949494',
          }}

          buttonStyle={{
            border: 'none',
            borderBottom: '2px solid #fff',
            background: '#fff',
          }}
        />

        <Input
          icon={<LockIcon/>}
          label={'Password'}
          type={'password'}
          onKeyPress={(e) => enterPressedHandler(e.charCode)}
          value={password}
          onChange={passwordInputHandler}
          error={!!error}
          helperText={error}
        />

        <ForgotPasswordLink onClick={() => dispatch(push(Routes.RESET_PASSWORD))}>
          Forgot Password
        </ForgotPasswordLink>

        <LoginButton
          onClick={() => loginHandler()}
          disabled={disabled}
        >
          {!loading ? `Log In` : ''}
          {loading && <WhiteCircularProgress size={24} />}
        </LoginButton>

        <FooterWrapper>
          <MiniLogo src={MiniLogoIcon}/>
          <FooterText>
            Footer text
          </FooterText>
        </FooterWrapper>
      </ContentWrapper>
    </Wrapper>
  );
}

export default Login;
