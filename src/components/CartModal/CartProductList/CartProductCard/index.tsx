import { MdDelete } from 'react-icons/md';

import { useContext } from 'react';
import { StyledCartProductCard } from './style';
import { StyledTitle } from '../../../../styles/typography';
import { CartContext } from '../../../../context/cartContext';

interface IProduct {
  id: number;
  name?: string | undefined;
  img?: string | undefined;
}
const CartProductCard = ({ id, name, img }: IProduct) => {
  const { removeFromCart } = useContext(CartContext);
  return (
    <StyledCartProductCard>
      <div className='imageBox'>
        <img src={img} alt={name} />
      </div>
      <div className='contentBox'>
        <StyledTitle tag='h3' $fontSize='three'>
          {name}
        </StyledTitle>
        <button type='button' aria-label='Remover'>
          <MdDelete onClick={() => removeFromCart(id)} size={24} />
        </button>
      </div>
    </StyledCartProductCard>
  );
};

export default CartProductCard;
