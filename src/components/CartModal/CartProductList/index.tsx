import { useContext } from 'react';
import CartProductCard from './CartProductCard';

import { StyledCartProductList } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph } from '../../../styles/typography';
import { CartContext } from '../../../context/cartContext';

const CartProductList = () => {
  const { cartProducts } = useContext(CartContext);

  return (
    <StyledCartProductList>
      <ul>
        {cartProducts &&
          cartProducts.map((cartProduct) => (
            <CartProductCard
              name={cartProduct.name}
              img={cartProduct.img}
              key={cartProduct.id}
            />
          ))}
      </ul>

      <div className='totalBox'>
        <StyledParagraph>
          <strong>Total</strong>
        </StyledParagraph>
        <StyledParagraph className='total'>R$ 14,00</StyledParagraph>
      </div>
      <StyledButton $buttonSize='default' $buttonStyle='gray'>
        Remover todos
      </StyledButton>
    </StyledCartProductList>
  );
};

export default CartProductList;
