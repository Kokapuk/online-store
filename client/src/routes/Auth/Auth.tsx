import React, { useEffect, useState } from 'react';
import styles from './Auth.module.scss';
import useToken from '../../hooks/useToken';
import { useGetMeQuery } from '../../services/auth';
import { Link, useNavigate } from 'react-router-dom';
import { Route } from '../router';
import axios from '../../services/axios';
import { HiArrowLeft } from 'react-icons/hi2';

export enum AuthType {
  SignUp = 'Sign Up',
  SignIn = 'Sign In',
}

interface Props {
  authType: AuthType;
}

const Auth = ({ authType }: Props) => {
  const [token, setToken] = useToken();
  const { data } = useGetMeQuery(token);
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState<{ login: string; password: string }>({ login: '', password: '' });

  useEffect(() => {
    if (data) {
      navigate(Route.Profile);
    }
  }, [data]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post(authType === AuthType.SignUp ? '/auth/signup' : '/auth/signin', loginData);
      setToken(response.data.token);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <header className={styles.header}>
        <Link to={Route.Home}>
          <button className='transparent'>
            <HiArrowLeft />
          </button>
        </Link>
        <h3>{authType}</h3>
      </header>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          value={loginData.login}
          onChange={(e) => setLoginData((prev) => ({ ...prev, login: e.target.value }))}
          className={styles.input}
          type='text'
          required
          minLength={3}
          maxLength={12}
          placeholder='Login'
        />
        <input
          value={loginData.password}
          onChange={(e) => setLoginData((prev) => ({ ...prev, password: e.target.value }))}
          className={styles.input}
          type='password'
          required
          minLength={6}
          maxLength={32}
          placeholder='Password'
        />
        <button type='submit'>{authType}</button>
      </form>
    </>
  );
};

export default Auth;
