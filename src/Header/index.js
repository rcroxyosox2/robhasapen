import Logo from '../Logo';
import styled, { keyframes } from 'styled-components';

const anim = keyframes`
  0%, 100% {
    transform: rotate( -14deg );
  }
  50% {
    transform: rotate( 14deg );
  }
`;


const HeaderStyle = styled.header`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  padding-top: 11vh;
  position: relative;
  &:before, &:after {
    content: "for sale";
    text-transform: uppercase;
    color: ${props => props.theme.colors.white};
    background: ${props => props.theme.colors.black};
    padding: 1% 2%;
    position: absolute;
    animation-fill-mode: both;
  }
  &:before {
    left: 20%;
    transform: rotate(-14deg);
    animation: ${anim} 15s infinite ease-in-out;
  }
  &:after {
    right: 20%;
    transform: rotate(12deg);
    animation: ${anim} 10s infinite ease-in-out;
  }
  @media (max-width: 580px) {
    &:before {
      left: 10%;
    }
    &:after {
      right: 10%;
    }
  }
`;

const Header = () => {
  return (
    <HeaderStyle>
      <Logo />
    </HeaderStyle>
  );
};

export default Header;
