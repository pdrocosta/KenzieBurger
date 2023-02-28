import { createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

interface IDefaultProviderProps {
  children: React.ReactNode;
}

interface ILoginFormValues {
  email: string;
  password: string;
}

const navigate = useNavigate();

export const UserContext = createContext<{loginUser: (formData: ILoginFormValues) => Promise<void> }>({
  loginUser: async () => {}
});

export const UserProvider = ({ children }: IDefaultProviderProps) => {
  const loginUser = async (formData: ILoginFormValues) => {
    try {
      const response = await api.post('/login', formData);
      localStorage.setItem(`@Token:`, response.data.accessToken);
      localStorage.setItem(`@USERID:`, response.data.user.id);
      navigate('/shop');
    } catch (error) {
      console.log(error);
    }
  };

  return <UserContext.Provider value={{ loginUser }}>{children}</UserContext.Provider>;
};
