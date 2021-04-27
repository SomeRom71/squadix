import React from 'react';
import AuthContainer from '../containers/auth';
import RegisterForm from '../components/auth-forms/regiter-form';

const Login = () => {
  return (
    <AuthContainer>
      <RegisterForm />
    </AuthContainer>
  )
}

export default Login;
