import { createContext, useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

interface IDefaultProviderProps {
  children: ReactNode;
}
interface ICartProduct {
  id: number;
  name: string;
  category?: string | undefined;
  price?: number | undefined;
  img: string;
}

interface IUserContext {
  loginUser: (data: IUser) => void;
  registerUser: (data: IRegisterUser) => void;
  user1: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  setProducts: React.Dispatch<React.SetStateAction<ICartProduct[]>>;
  products: IProduct[];
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
interface IProduct {
  id: number;
  name: string;
  category?: string | undefined;
  price?: number | undefined;
  img: string;
}

export const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: IDefaultProviderProps) => {
  const [user1, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate();
  const [products, setProducts] = useState<IProduct[]>([]);

  const loginUser = async (formData: IUser) => {
    try {
      const response = await api.post('/login', formData);
      setUser(response.data.user);
      localStorage.setItem('@Token:', response.data.accessToken);
      localStorage.setItem('@USERID:', response.data.user.id);
      navigate('/shop');
      getProducts();
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(error);
    }
  };
  const registerUser = async (formData: IRegisterUser) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await api.post('/users', formData);
      navigate('/');
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(error);
    }
  };

  const getProducts = async () => {
    try {
      const response = await api.get('/products', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(`@Token:`)}`,
        },
      });
      setProducts(response.data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('@Token:');
    if (token) {
      autoLogin();
      getProducts();
    }
  }, []);

  const autoLogin = async () => {
    const token = localStorage.getItem('@Token:');
    if (token) {
      navigate('/shop');
    } else {
      // eslint-disable-next-line no-alert
      alert('Faca login');
      localStorage.clear();
      navigate('/');
    }
  };

  return (
    <UserContext.Provider
      value={{ loginUser, user1, setUser, registerUser, products, setProducts }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
