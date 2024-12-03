import styled from 'styled-components';
import Button from './common/Button';

const Wrap = styled.div`
  display: flex;
  gap: 1rem;
`;
const Input = styled.input`
  background: ${(props) => props.theme.colors.grayF2};
  height: 4rem;
  border-radius: 0.8rem;
  padding: 1rem 1.6rem;
  width: 100%;

  &::placeholder {
    color: ${(props) => props.theme.colors.gray78};
  }
`;

export default function HomeSearch() {
  return (
    <Wrap>
      <Input type='text' placeholder='책 검색하기' />
      <Button text='검색' />
    </Wrap>
  );
}
