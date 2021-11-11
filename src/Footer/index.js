import { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import styled from 'styled-components';
import btcImg from '../images/btc.svg';
import gramImg from '../images/gram.svg';
import mailImg from '../images/mail.svg';
import venmoImg from '../images/venmo.svg';
import Container from '../Container';
import BTCDetails, { BTCDetailsStyle } from '../BTCDetails';

import {
  contactEmail,
  venmoLink,
  instaLink,
} from '../constants';

const FooterStyle = styled.footer`
  padding-bottom: 11vh;
  nav {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    button {
      position: relative;
      ${BTCDetailsStyle} {
        position: absolute;
        overflow: hidden;
        width: 300px;
        height: auto;
        bottom: 50px;
        left: 10px;
        transform: translateX(-50%);
        border: 1px solid ${props => props.theme.colors.black};
        border-top: none;
      }
    }
  }

`;

const IconStyle = styled.span.attrs({ role: 'img' })`
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  display: block;
`;

const MailIconStyle = styled(IconStyle)`
  background-image: url(${mailImg});
  width: 24px;
  height: 24px;
`;

const GramIconStyle = styled(IconStyle)`
  background-image: url(${gramImg});
  width: 24px;
  height: 24px;
`;

const VenmoIconStyle = styled(IconStyle)`
  background-image: url(${venmoImg});
  width: 64px;
  height: 12px;
`;

const BTCIconStyle = styled(IconStyle)`
  background-image: url(${btcImg});
  width: 31px;
  height: 31px;
`;


const Footer = () => {

  const [BTCDetailsOpen, setBTCDetailsOpen] = useState(false);

  const handleBTCClick = () => {
    setBTCDetailsOpen(!BTCDetailsOpen);
  }

  return (
    <FooterStyle>
      <Container>
        <nav>
          <a href={`mailto: ${contactEmail}`}>
            <MailIconStyle />
          </a>
          <a href={instaLink} target="_blank" rel="noopener noreferrer">
            <GramIconStyle />
          </a>
          <a href={venmoLink} target="_blank" rel="noopener noreferrer">
            <VenmoIconStyle />
          </a>
          <OutsideClickHandler onOutsideClick={() => setBTCDetailsOpen(false)}>
            <button onClick={handleBTCClick}>
              { BTCDetailsOpen ? <BTCDetails /> : null }
              <BTCIconStyle />
            </button>
          </OutsideClickHandler>
        </nav>
      </Container>
    </FooterStyle>
  );
};

export default Footer;
