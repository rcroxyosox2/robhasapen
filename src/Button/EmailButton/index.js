import { BaseButtonStyle } from '../styles';
import emailImg from '../../images/mail.svg';
import {contactEmail} from '../../constants';

const EmailButton = ({ title }) => {

  const handleClick = () => {
    const subject = `RE your ${title} piece`;
    const url = `mailto:${contactEmail}?subject=${subject}`
    window.location = url;
  }

  return (
    <BaseButtonStyle onClick={handleClick}>
      <img src={emailImg} />
      <span>Email me</span>
    </BaseButtonStyle>
  );
};

export default EmailButton;
