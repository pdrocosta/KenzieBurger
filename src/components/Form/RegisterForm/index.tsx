import { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
// eslint-disable-next-line import/no-extraneous-dependencies
import { yupResolver } from '@hookform/resolvers/yup';

import { registerFormSchema } from './registerFormSchema';
import Input from '../Input';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import { UserContext } from '../../../context/userContext';

interface iRegisterFormData {
  name: string;
  email: string;
  password: string;
}

const RegisterForm = () => {
  const {
    register,
    handleSubmit,

    reset,
  } = useForm<iRegisterFormData>({
    resolver: yupResolver(registerFormSchema),
  });

  const { registerUser } = useContext(UserContext);

  const registerInputs: SubmitHandler<iRegisterFormData> = (
    registerformInput
  ) => {
    registerUser(registerformInput);
    reset();
  };

  return (
    <StyledForm onSubmit={handleSubmit(registerInputs)}>
      <Input
        label='Name'
        placeholder='Type your Name'
        register={register('name')}
      />
      <Input
        label='Email'
        placeholder='Type your email'
        register={register('email')}
      />
      <Input
        label='Password'
        placeholder='Type your password'
        register={register('password')}
      />
      <StyledButton $buttonSize='default' $buttonStyle='gray'>
        Cadastrar
      </StyledButton>
    </StyledForm>
  );
};

export default RegisterForm;
