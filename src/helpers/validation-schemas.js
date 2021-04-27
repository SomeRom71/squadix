import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('E-mail is required'),
  password: yup.string()
    .required('No password provided') 
    .min(8, 'Password is too short - should be 8 chars minimum')
    .max(25, 'Password is too long - should be 25 chars maximum')
});
  
export const registerSchema = yup.object().shape({
  displayName: yup.string().required('Name is required'), 
  email: yup.string().email('Invalid email').required('E-mail is required'),
  password: yup.string()
    .required('No password provided') 
    .min(8, 'Password is too short - should be 8 chars minimum')
    .max(25, 'Password is too long - should be 25 chars maximum'),
  confirmPassword: yup.string()
    .required('Confirm password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  phone: yup.string(),
});
  