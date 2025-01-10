import styled from 'styled-components';

const Nodata = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1.5;
`;

interface NoBookProps {
  height?: string;
}
export default function NoBook({ height }: NoBookProps) {
  return (
    <Nodata style={{ height: height }}>
      읽은 책이 없습니다.
      <br />
      책을 추가해보세요 :&#41;
    </Nodata>
  );
}
