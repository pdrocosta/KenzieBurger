import * as yup from 'yup';

export const registerFormSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().required('Email is required.').email('Email is invalid.'),
  password: yup
    .string()
    .required('Password is required.')
    .min(6, 'Password must have 6 characters.'),
});
