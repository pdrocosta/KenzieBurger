/* eslint-disable import/no-extraneous-dependencies */
import { createContext, useState, ReactNode, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api';

interface IDefaultProviderProps2 {
  children: ReactNode;
}

interface ICartContext {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  addToCart: (prod: ICartProduct) => void;
  getProducts: () => void;
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
  products: IProduct[];
  cartProducts: ICartProduct[];
  removeFromCart: (id: number) => void;
  getTotal: (cartProducts2: ICartProduct[]) => number;
  setCartProducts: React.Dispatch<React.SetStateAction<ICartProduct[]>>;
}

interface ICartProduct {
  id: number | undefined;
  name?: string;
  category?: string | undefined;
  price?: number | undefined;
  img?: string;
}

interface IProduct {
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

  const [products, setProducts] = useState<IProduct[]>([]);

  function removeFromCart(id: number | undefined) {
    if (id) {
      const newCartProducts = cartProducts.filter((prod) => prod.id !== id);
      setCartProducts(newCartProducts);
    }
  }

  function addToCart(prod: ICartProduct) {
    setCartProducts([...cartProducts, prod]);
  }

  function getTotal(cartProducts2: ICartProduct[]) {
    let total = 0;
    cartProducts2.forEach((product) => {
      if (product.price) {
        total += product.price;
      }
    });
    return total;
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
      toast.error('Please login.');
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <CartContext.Provider
      value={{
        setOpenModal,
        openModal,
        removeFromCart,
        getProducts,
        products,
        setProducts,
        addToCart,
        cartProducts,
        setCartProducts,
        getTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
