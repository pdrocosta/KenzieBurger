import * as yup from "yup";

export const loginFormSchema = yup.object().shape({
  email: yup.string().required("Email is required.").email("Email is invalid."),
  password: yup
    .string()
    .required("Password is required.")
    .min(6, "Password must have 6 characters."),
});
