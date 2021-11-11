import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { btcWalletOnCoinBase, contactEmail } from '../constants';
import btcAddrImg from '../images/btcaddr.png';

const EmailButtonStyle = styled.button`
  text-decoration: underline;
  &:hover {
    text-decoration: none;
  }
`;

export const BTCDetailsStyle = styled.span.attrs({ className: 'BTCDetailsStyle' })`
  display: block;
  img {
    max-width: 46%;
    margin-bottom: 1em;
  }
  > section {
    padding: 2em;
  }
  aside {
    font-size: 0.8rem;
  }
`;


const FlagStyle = styled.div`
  background: ${props => props.theme.colors.black};
  color: ${props => props.theme.colors.white};
  font-size: 0.8rem;
  padding: 1em;
  opacity: 0;
  position: absolute;
  transition: all 250ms ease-in-out;
  transform: translate(-100%, -100%) rotate(-5deg);
  &.enter, &.enter-active, &.enter-done {
    opacity: 1;
    transform: rotate(-5deg);
  }
`;

const BTCAddressInputStyle = styled.input`
  border: ${props => props.theme.button.border.default};
  border-right: none;
  border-left: none;
  padding: ${props => props.theme.button.padding.default};
  padding-top: 1em;
  padding-bottom: 1em;
  width: 100%;
  text-align: center;
  cursor: pointer;
`;

const BTCDetails = ({ title, message: messageFromProps }) => {

  const [copiedMessageIn, setCopiedMessageIn] = useState(false);
  const copiedMessageTimout = useRef();
  const flagAnimationTime = 2000;

  useEffect(() => {

    return () => {
      clearTimeout(copiedMessageTimout.current);
    }
  }, []);

  const handleAddressInputlick = (e) => {
    e.stopPropagation();
    e.target.select();
    navigator.clipboard.writeText(e.target.value);

    if (copiedMessageTimout.current) {
      console.log('nope')
      return;
    }

    setCopiedMessageIn(true);
    copiedMessageTimout.current = setTimeout(() => {
      console.log('trying.');
      setCopiedMessageIn(false);
      copiedMessageTimout.current = null;
    }, flagAnimationTime);
  }

  const handleEmailClick = (e) => {
    e.stopPropagation();
    const subject = `RE your ${title} piece`;
    const url = `mailto:${contactEmail}?subject=${subject}`
    window.location = url;
  }

  // const FooterMessage = ();
  const message = (messageFromProps)
  ? messageFromProps : title
  ? <>{`Put “${title}” in the memo section. Once complete let me know at`} <EmailButtonStyle onClick={handleEmailClick}>{contactEmail}</EmailButtonStyle></>
  : null;

  return (
    <BTCDetailsStyle>
      <CSSTransition in={copiedMessageIn} timeout={flagAnimationTime}>
        <FlagStyle>Copied to clipboard</FlagStyle>
      </CSSTransition>
      <BTCAddressInputStyle value={btcWalletOnCoinBase} onClick={handleAddressInputlick} readOnly />
      <section>
        <img src={btcAddrImg} />
        <aside>
          { message }
        </aside>
      </section>
    </BTCDetailsStyle>
  );
};


export default BTCDetails;
