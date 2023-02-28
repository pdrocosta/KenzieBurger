import { useContext, useEffect } from 'react'; // Removed unused import `useEffect`
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import { StyledProductList } from './style';
import { CartContext } from '../../context/cartContext';

const ProductList = () => {
  const { products } = useContext(CartContext);

  const navigate = useNavigate();

  return (

      <StyledProductList>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          category={product.category}
          price={product.price}
          img={product.img}
        />
      ))}
    </StyledProductList>
   
   
  );
};

export default ProductList;
