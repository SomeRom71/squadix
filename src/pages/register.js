import React from 'react';
import AuthContainer from '../containers/auth';
import RegisterForm from '../components/auth-forms/register-form';

const Register = () => {
  return (
    <AuthContainer>
      <RegisterForm />
    </AuthContainer>
  )
}

export default Register;
