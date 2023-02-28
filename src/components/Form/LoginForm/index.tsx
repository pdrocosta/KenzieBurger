import { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
// eslint-disable-next-line import/no-extraneous-dependencies
import { yupResolver } from '@hookform/resolvers/yup';
import { loginFormSchema } from './loginFormSchema';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import Input from '../Input';
import { UserContext } from '../../../context/userContext';

interface iLoginFormData {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<iLoginFormData>({
    resolver: yupResolver(loginFormSchema),
  });

  const { loginUser } = useContext(UserContext);

  const loginInputs: SubmitHandler<iLoginFormData> = (loginformInput) => {
    loginUser(loginformInput);
    reset();
  };
  return (
    <StyledForm onSubmit={handleSubmit(loginInputs)}>
      <Input
        label='Email'
        placeholder='Type your email'
        register={register('email')}
      />
      <Input
        label='Email'
        placeholder='Type your password'
        register={register('password')}
      />
      <StyledButton $buttonSize='default' $buttonStyle='green'>
        Entrar
      </StyledButton>
    </StyledForm>
  );
};
