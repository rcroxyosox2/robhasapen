import styled from 'styled-components';
import Container from '../../Container';
import ItemList from '../../ItemList';
import Header from '../../Header';
import Footer from '../../Footer';


const Home = () => {
  return (
    <div>
      <Header />
      <Container>
        <ItemList />
      </Container>
      <Footer />
    </div>
  );
};

export default Home;
