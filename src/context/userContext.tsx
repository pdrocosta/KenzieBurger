import { createContext, useState, ReactNode, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './cartContext';
import api from '../services/api';

interface IDefaultProviderProps {
  children: ReactNode;
}

interface IUserContext {
  loginUser: (data: IUser) => void;
  registerUser: (data: IRegisterUser) => void;
  user1: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
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
  const {getProducts} = useContext(CartContext)
  const navigate = useNavigate();

  const loginUser = async (formData: IUser) => {
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(formData))
    
    try {
      const response = await api.post('/login', (formData));
      localStorage.setItem('@Token:', response.data.accessToken);
      localStorage.setItem('@USERID:', response.data.user.id);
      setUser(response.data.user);
      navigate('/shop');
      getProducts();
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(error);
    }
  };

  const registerUser = async (formData: IRegisterUser) => {
    try {
      const response = await api.post('/users', formData);
      navigate('/');
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(error);
    }
  };
  useEffect(() => {
    async function autoLogin() {
      try {
        const response = await api.post(
          `/login/${localStorage.getItem('@Token:')}`
        );
        setUser(response.data.user);
        navigate(`/shop`);
      } catch (error) {
        // eslint-disable-next-line no-alert
        alert('Faca login');
        localStorage.clear();
        navigate('/');
      }
    }
  }, []);

  useEffect(() => {}, [user1]);

  return (
    <UserContext.Provider value={{ loginUser, user1, setUser, registerUser }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;
