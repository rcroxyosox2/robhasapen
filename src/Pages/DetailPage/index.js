import styled from 'styled-components';
import DetailView from '../../DetailView';

const DetailPageStyle = styled.div`
  padding: 8%;
`;

const DetailPage = () => {
  return (
    <DetailPageStyle>
      <DetailView />
    </DetailPageStyle>
  );
};

export default DetailPage;
