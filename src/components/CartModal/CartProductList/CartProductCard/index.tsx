import { MdDelete } from 'react-icons/md';

import { StyledCartProductCard } from './style';
import { StyledTitle } from '../../../../styles/typography';

interface ICartProduct {
  name: string;
  img: string;
}

const CartProductCard = ({ name, img }: ICartProduct) => (
  <StyledCartProductCard>
    <div className='imageBox'>
      <img src={img} alt={name} />
    </div>
    <div className='contentBox'>
      <StyledTitle tag='h3' $fontSize='three'>
        {name}
      </StyledTitle>
      <button type='button' aria-label='Remover'>
        <MdDelete size={24} />
      </button>
    </div>
  </StyledCartProductCard>
);

export default CartProductCard;
