import styled from 'styled-components';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import VenmoButton from '../Button/VenmoButton';
import { getSizeFromItem, getItemByKey } from '../items';
import { BaseButtonStyle } from '../Button/styles';
import BTCButton from '../Button/BTCButton';
import EmailButton from '../Button/EmailButton';
import InstaButton from '../Button/InstaButton';

const DetailViewStyle = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 1.5rem;
  h3 {
    margin-bottom: 5%;
  }
  nav {
    display: flex;
    flex-flow: column nowrap;
    gap: 1rem;
  }
  > * {
    &:first-child {
      flex: 1 1 66%;
      img {
        max-width: 100%;
      }
    }
    &:last-child {
      flex: 0 1 33%;
      display: flex;
      gap: 1.5rem;
      flex-flow: column nowrap;
      /* justify-content: space-between; */
    }
  }
  li {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    width: 100%;
    align-items: flex-end;
    margin-bottom: 0.7em;
    > span {
      flex-shrink: 0;
      max-width: 60%;
      &:last-child {
        text-align: right;
      }
    }
    hr {
      border-bottom: 1px dotted ${ props => props.theme.colors.black };
      margin: 0;
      width: 100%;
      outline: none;
      padding: 0;
      border: none;
      border-bottom: 1px dotted #000000;
      margin-top: -1px;
      position: relative;
      top: -3px;
      flex-shrink: 1;
    }
  }
  @media (max-width: ${(props) => props.theme.responsive.largestMobileScreen}) {
    flex-flow: column nowrap;
  }
`;

const DetailView = ({ item: itemFromProps, closeModal }) => {
  const { itemKey } = useParams();
  const navigate = useNavigate();
  const item = itemKey ? getItemByKey(itemKey) : itemFromProps;

  if (itemKey && !item) {
    return <Navigate to="/" />;
  }

  if (!item) {
    return null;
  }

  const handleBack = () => {
    if (itemKey) {
      navigate('/');
    } else {
      closeModal();
    }
  };

  return (
    <DetailViewStyle>
      <div>
        <img src={item.img} />
      </div>
      <div>
        <h3>{item.title}</h3>
        <ul>
          <li>
            <span>Size</span>
            <hr />
            <span>{getSizeFromItem(item)}</span>
          </li>
          <li>
            <span>Media</span>
            <hr />
            <span>Some kind of media</span>
          </li>
        </ul>
        <nav>
          <h4>Purchase:</h4>
          <VenmoButton price={100} />
          <BTCButton price={0.002} title={item.title} />
        </nav>
        <nav>
          <h4>Contact:</h4>
          <EmailButton title={item.title} />
          <InstaButton />
          <BaseButtonStyle inverted centered onClick={handleBack}>Back</BaseButtonStyle>
        </nav>
      </div>
    </DetailViewStyle>
  );
};

export default DetailView;
