import React from 'react';
import AuthContainer from '../containers/auth';
import ResetForm from '../components/auth-forms/reset-form';

const Reset = () => {
  return (
    <AuthContainer>
      <ResetForm />
    </AuthContainer>
  )
}

export default Reset;
