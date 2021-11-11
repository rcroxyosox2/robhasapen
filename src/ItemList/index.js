import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import items, { getItemByKey } from '../items';
import Modal from '../Modal';
import DetailView from '../DetailView';
import withIsMobile from '../hoc/withIsMobile';
let frs = '1fr';

if (items.length > 3) {
  frs = '1fr 1fr 1fr';
} else if (items.length % 2 === 0) {
  frs = '1fr 1fr';
}

const ItemListStyle = styled.div`
  display: grid;
  grid-template-columns: ${frs};
  gap: 1.5vw;
  margin: 8vh 0;
  > button {
    display: flex;
    flex-flow: column nowrap;
    padding: 2vw;
    border: 1px solid transparent;
    &:hover {
      border: 1px dotted black;
    }
    img {
      max-width: 100%;
    }
    aside {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      margin-top: 1rem;
    }
  }

  @media (max-width: ${(props) => props.theme.responsive.largestMobileScreen}) {
    display: flex;
    flex-flow: column nowrap;
  }
`;

const ItemList = ({ isMobile }) => {

  const [modalOpen, setModalOpen] = useState(null);
  const [itemKeyOpen, setItemKeyOpen] = useState(null);
  const navigate = useNavigate();

  const handleClick = (key) => () => {
    if (isMobile()) {
      navigate(`/${key}`);
    } else {
      setModalOpen(true);
      setItemKeyOpen(key);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
  }

  return (
    <ItemListStyle>
      <Modal isOpen={!!modalOpen} onModalClose={handleModalClose} maxWidth="none" width="70%">
        <DetailView item={getItemByKey(itemKeyOpen)} closeModal={handleModalClose} />
      </Modal>
      {items.map(item => (
        <button key={item.key} onClick={handleClick(item.key)}>
          <img src={item.img} />
          <aside>
            <h3>{item.title}</h3>
            <data data-type="usd">${item.price.usd}</data>
          </aside>
        </button>
      ))}
    </ItemListStyle>
  );
};

export default withIsMobile(ItemList);
