import React from 'react';
import AuthContainer from '../containers/auth';
import LoginForm from '../components/auth-forms/login-form';

const Login = () => {
  return (
    <AuthContainer>
      <LoginForm />
    </AuthContainer>
  )
}

export default Login;
