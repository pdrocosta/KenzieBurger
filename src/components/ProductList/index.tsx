import { useContext } from 'react'; // Removed unused import `useEffect`
import ProductCard from './ProductCard';
import { StyledProductList } from './style';
import { UserContext } from '../../context/userContext';

const ProductList = () => {
  const { products } = useContext(UserContext);

  return (
    <StyledProductList>
      {products.map((product) => (
        <ProductCard
          product={product}
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
