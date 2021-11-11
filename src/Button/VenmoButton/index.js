import { BaseButtonStyle } from '../styles';
import venmoImg from '../../images/venmo.svg';
import {venmoLink} from '../../constants';

const VenmoButton = ({ price }) => {

  const handleClick = () => {
    window.open(venmoLink);
  }

  return (
    <BaseButtonStyle onClick={handleClick}>
      <img src={venmoImg} />
      <span>${price} USD</span>
    </BaseButtonStyle>
  );
};

export default VenmoButton;
