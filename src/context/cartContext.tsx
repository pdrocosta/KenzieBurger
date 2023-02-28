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
}
export const CartContext = createContext({} as ICartContext);

export const CartProvider = ({ children }: IDefaultProviderProps2) => {
  const [openModal, setOpenModal] = useState(false);
  const [cartProducts, setCartProducts] = useState<ICartProduct[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const navigate = useNavigate();
  const { user1 } = useContext(UserContext);

  async function userLogout() {
    localStorage.removeItem(`@USERID:`);
    localStorage.removeItem(`@Token:`);
    navigate('/');
  }

  function addToCart(id: number) {
    // eslint-disable-next-line no-console
    console.log(id, products);
    const productToAdd: IProduct  = products.find(
      (product) => product.id === id
    );
    console.log(productToAdd);

    setCartProducts([...cartProducts, productToAdd]);
    console.log(cartProducts);
  }

  useEffect(() => {
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

    getProducts();
  }, []);

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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
