import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('E-mail is required'),
    password: yup.string()
      .required('No password provided') 
      .min(8, 'Password is too short - should be 8 chars minimum')
      .max(25, 'Password is too long - should be 25 chars maximum')
  });
  
export const registerSchema = yup.object().shape({
    name: yup.string().required('Name is required'), 
    email: yup.string().email('Invalid email').required('E-mail is required'),
    password: yup.string()
      .required('No password provided') 
      .min(8, 'Password is too short - should be 8 chars minimum')
      .matches(/[a-zA-Z]/, 'Password can only contain Latin letters'),
    confirmPassword: yup.string()
      .required('Confirm password')
      .oneOf([yup.ref('password')], 'Passwords must match'),
    promo: yup.string(),
    recaptcha: yup.bool().oneOf([true], 'Field must be checked'),
  });
  