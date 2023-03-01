import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './userContext';
import api from '../services/api';

interface IDefaultProviderProps2 {
  children: ReactNode;
}

interface ICartContext {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  userLogout: () => void;
  addToCart: (id: number) => void;
  products: IProduct[];
  cartProducts: ICartProduct[];
  setCartProducts: React.Dispatch<React.SetStateAction<ICartProduct[]>>;
  getProducts: any;
}

interface ICartProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  img: string;
}

interface IProduct {
  id: number;
  name: string;
  category?: string;
  price?: number;
  img: string;
  product: any;
}
export const CartContext = createContext({} as ICartContext);

export const CartProvider = ({ children }: IDefaultProviderProps2) => {
  const [openModal, setOpenModal] = useState(false);
  const [cartProducts, setCartProducts] = useState<ICartProduct[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const navigate = useNavigate();


  async function userLogout() {
    localStorage.removeItem(`@USERID:`);
    localStorage.removeItem(`@Token:`);
    navigate('/');
  }

  function addToCart(prod: ICartProduct) {
    setCartProducts([...cartProducts, prod]);
  }

  const getProducts = async () => {
    try {
      const response = await api.get('/products', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(`@Token:`)}`,
        },
      });
      setProducts(response.data);
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        setOpenModal,
        openModal,
        userLogout,
        products,
        addToCart,
        cartProducts,
        setCartProducts,
        getProducts
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
