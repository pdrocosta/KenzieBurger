/* eslint-disable import/no-extraneous-dependencies */
import { createContext, useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';
import 'react-toastify/dist/ReactToastify.css';

interface IDefaultProviderProps {
  children: ReactNode;
}

interface IUserContext {
  loginUser: (data: IUser) => void;
  registerUser: (data: IRegisterUser) => void;
  user1: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  userLogout: () => void;
}
interface IUser {
  email: string;
  password: string;
}

interface IRegisterUser {
  name: string;
  email: string;
  password: string;
}

export const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: IDefaultProviderProps) => {
  const [user1, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate();

  async function userLogout() {
    localStorage.removeItem(`@USERID:`);
    localStorage.removeItem(`@Token:`);
    navigate('/');
  }

  const loginUser = async (formData: IUser) => {
    try {
      const response = await api.post('/login', formData);
      setUser(response.data.user);
      localStorage.setItem('@Token:', response.data.accessToken);
      localStorage.setItem('@USERID:', response.data.user.id);
      toast.success(`Login confirmed`);
      navigate('/shop');
    } catch (error) {
      toast.error(`Login failed`);
    }
  };
  const registerUser = async (formData: IRegisterUser) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await api.post('/users', formData);
      toast.success(`Register confirmed`);
      navigate('/');
    } catch (error) {
      toast.error(`Register failed`);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('@Token:');
    if (token) {
      autoLogin();
    } else {
      toast.error(`Please login to access this page.`);
      localStorage.clear();
      navigate('/');
    }
  }, []);

  const autoLogin = async () => {
    const token = localStorage.getItem('@Token:');

    if (token) {
      navigate('/shop');
    } else {
      localStorage.clear();
      toast.error(`Please login to access this page.`);
      navigate('/');
    }
  };

  return (
    <UserContext.Provider
      value={{ loginUser, userLogout, user1, setUser, registerUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
