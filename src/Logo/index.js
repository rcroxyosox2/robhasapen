import styled from 'styled-components';
import logoImg from './images/logo.svg';

const LogoStyle = styled.div.attrs({role: 'img'})`
  display: block;
  background-image: url(${logoImg});
  width: 65px;
  height: 46px;
  background-size: 100%;
`;

const Logo = () => <LogoStyle />;

export default Logo;
