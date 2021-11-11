import { BaseButtonStyle } from '../styles';
import gramImg from '../../images/gram.svg';
import { instaLink } from '../../constants';

const InstaButton = ({ title }) => {

  const handleClick = () => {
    window.open(instaLink);
  }

  return (
    <BaseButtonStyle onClick={handleClick}>
      <img src={gramImg} />
      <span>DM on the gram</span>
    </BaseButtonStyle>
  );
};

export default InstaButton;
