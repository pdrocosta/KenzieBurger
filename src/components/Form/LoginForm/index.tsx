import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import Input from '../Input';
import { loginFormSchema } from "./loginFormSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { useContext } from "react";

interface iLoginFormData{
  email: string, 
  password: string
}

interface ILoginFormValues2 {
  email: string;
  password: string;
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<iLoginFormData>({
    resolver: yupResolver(loginFormSchema),
  });
  const {loginUser} = useContext(UserContext)


  const loginInputs: SubmitHandler<ILoginFormValues2> = (loginformInput) => {
    loginUser(loginformInput);
    reset();
  };
  return (
    <StyledForm onSubmit={handleSubmit(loginInputs)}>
      <Input label={"Email"}  placeholder={"Type your email"}  register={register("email")}/>
      <Input label={"Password"}  placeholder={"Password"} register={register("password" )} />
      <StyledButton $buttonSize='default' $buttonStyle='green'>
        Entrar
      </StyledButton>
    </StyledForm>
  );
};

export default LoginForm;
