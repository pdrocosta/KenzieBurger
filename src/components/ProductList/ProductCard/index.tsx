import { useContext } from 'react';
import { StyledProductCard } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph, StyledTitle } from '../../../styles/typography';
import { CartContext } from '../../../context/cartContext';

interface IProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  img: string;
  product?: any;
}

const ProductCard = ({ id, name, category, price, img, product }: IProduct) => {
  const { addToCart } = useContext(CartContext);

  return (
    <StyledProductCard>
      <div className='imageBox'>
        <img src={img} alt={name} />
      </div>
      <div className='content'>
        <StyledTitle tag='h3' $fontSize='three'>
          {name}
        </StyledTitle>
        <StyledParagraph className='category'>{category}</StyledParagraph>

        <StyledParagraph className='price'>{price}</StyledParagraph>
        <StyledButton
          onClick={() => addToCart({ product })}
          $buttonSize='medium'
          $buttonStyle='green'
        >
          Adicionar
        </StyledButton>
      </div>
    </StyledProductCard>
  );
};

export default ProductCard;
