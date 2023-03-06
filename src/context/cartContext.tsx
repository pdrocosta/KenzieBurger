import {
  createContext,
  useState,
  ReactNode,
} from 'react';
import { useNavigate } from 'react-router-dom';

interface IDefaultProviderProps2 {
  children: ReactNode;
}

interface ICartContext {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  userLogout: () => void;
  addToCart: (prod: ICartProduct) => void;

  cartProducts: ICartProduct[];
  setCartProducts: React.Dispatch<React.SetStateAction<ICartProduct[]>>;
}

interface ICartProduct {
  id: number;
  name: string;
  category?: string | undefined;
  price?: number | undefined;
  img: string;
}

export const CartContext = createContext({} as ICartContext);

export const CartProvider = ({ children }: IDefaultProviderProps2) => {
  const [openModal, setOpenModal] = useState(false);
  const [cartProducts, setCartProducts] = useState<ICartProduct[]>([]);
  const navigate = useNavigate();

  async function userLogout() {
    localStorage.removeItem(`@USERID:`);
    localStorage.removeItem(`@Token:`);
    navigate('/');
  }

  function addToCart(prod: ICartProduct) {
    setCartProducts([...cartProducts, prod]);
  }

  return (
    <CartContext.Provider
      value={{
        setOpenModal,
        openModal,
        userLogout,
      
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
