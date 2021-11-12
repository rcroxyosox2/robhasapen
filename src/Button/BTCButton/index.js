import styled from 'styled-components';
import { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { BaseButtonStyle } from '../styles';
import btcImg from '../../images/btc.svg';
import { btcDiscountPerc } from '../../constants';
import BTCDetails from '../../BTCDetails';

const BTCButonStyle = styled(BaseButtonStyle)`
  padding: 0;
  flex-flow: column;
  height: auto;
  min-height: ${props => props.theme.button.height.default};
  position: relative;
  overflow: hidden;
  width: 100%;
  > * {
    width: 100%;
  }
  &:before {
    display: block;
    width: 100%;
    font-size: 0.8rem;
    padding: 1em 0;
    content: attr(data-message) " ";
    color: ${props => props.theme.colors.white};
    background: ${props => props.theme.colors.black};
  }
  > span {
    width: 100%;
    &:first-child {
      padding: ${props => props.theme.button.padding.default};
      flex: ${props => props.theme.button.height.default};
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
    }
  }
`;

const BTCButton = ({ price, title }) => {

  const [buttonOpen, setButtonOpen] = useState(false);


  const handleClick = (e) => {
    e.stopPropagation();
    setButtonOpen(!buttonOpen);
  }

  return (
    <OutsideClickHandler onOutsideClick={() => setButtonOpen(false)}>
      <BTCButonStyle onClick={handleClick} opened={buttonOpen} data-message={`Pay with Bitcoin and get a ${btcDiscountPerc}% discount`}>
        <span>
          <img src={btcImg} />
          <span>${price} USD</span>
        </span>
        { buttonOpen ? <BTCDetails title={title} /> : null}
      </BTCButonStyle>
    </OutsideClickHandler>
  );
};

export default BTCButton;
