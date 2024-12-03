import styled from 'styled-components';

const Wrap = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
`;

const BookList = styled.ul`
  li {
    min-width: 18rem;
    max-width: 20rem;
    min-height: 2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0.4rem 1rem;
    border-radius: 0.8rem;
    text-align: center;
    color: #fff;

    &:nth-child(4n) {
      background: ${(props) => props.theme.currentTheme.mainColor};
      margin: 0 -1rem 0 1rem;
      color: ${(props) => props.theme.colors.textColor};
    }
    &:nth-child(4n + 1) {
      background: ${(props) => props.theme.currentTheme.subColor02};
      margin: 0 -1.6rem 0 1.6rem;
    }
    &:nth-child(4n + 2) {
      background: ${(props) => props.theme.currentTheme.subColor01};
      margin: 0 -1rem 0 -1rem;
      color: ${(props) => props.theme.colors.textColor};
    }
    &:nth-child(4n + 3) {
      background: ${(props) => props.theme.currentTheme.subColor03};
    }
  }
`;

export default function TabBuild() {
  const dummy = [
    '책이름',
    '책이름',
    '홍학의 자리',
    '홍학의 자리',
    '홍학의 자리',
    '홍학의 자리',
    '홍학의 자리',
    '홍학의 자리',
    '홍학의 자리홍학의 자리홍학의 자리홍학의 자리홍학의 자리홍학의 자리'
  ];
  return (
    <Wrap>
      <div className='cm_box'>13.8cm</div>
      <BookList>
        {dummy.map((name, i) => (
          <li key={i}>{name}</li>
        ))}
      </BookList>
    </Wrap>
  );
}
