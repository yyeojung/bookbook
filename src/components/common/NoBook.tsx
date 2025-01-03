import styled from 'styled-components';

const Nodata = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1.5;
`;

export default function NoBook() {
  return (
    <Nodata>
      읽은 책이 없습니다.
      <br />
      책을 추가해보세요 :&#41;
    </Nodata>
  );
}
