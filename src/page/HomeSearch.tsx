import SubHeader from 'components/common/SubHeader';
import SearchForm from 'components/page/home/SearchForm';
import SearchList from 'components/page/home/SearchList';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Wrap = styled.div`
  position: relative;
  form {
    margin: 1rem 2rem 0;
  }
`;

export default function HomeSearch() {
  const navigate = useNavigate();

  //   header 이벤트
  const onClickHome = () => {
    navigate('/home');
  };

  return (
    <Wrap>
      <SubHeader text='책 검색' onClick={onClickHome} />
      <SearchForm />
      <SearchList />
    </Wrap>
  );
}
