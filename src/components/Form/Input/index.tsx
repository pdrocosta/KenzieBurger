import { StyledTextField } from '../../../styles/form';
import { StyledParagraph } from '../../../styles/typography';

interface iInput{
  label: string,
  register: string, 
 
  placeholder: string
}

const Input = ({label, register, placeholder}: iInput) => {
<fieldset>
    <StyledTextField {...register} placeholder={placeholder} />
    <StyledParagraph>{label}</StyledParagraph>
  </fieldset>
}
  
;

export default Input;
