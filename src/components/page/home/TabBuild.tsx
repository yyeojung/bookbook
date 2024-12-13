import styled from 'styled-components';
import test from '../../../assets/image/character/book-icon-01.png';

const Wrap = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);

  .book_height {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    margin-bottom: 1rem;

    img {
      width: 4rem;
    }

    p {
      position: relative;
      height: 3.2rem;
      min-width: 9rem;
      width: fit-content;
      margin: auto;
      text-align: center;
      line-height: 3.2rem;
      font-size: 1.4rem;
      font-weight: 600;
      border-radius: 1.6rem;
      border: 0.2rem solid ${(props) => props.theme.currentTheme.subColor03};

      &::before,
      &::after {
        display: block;
        content: '';
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 1rem 1rem 0rem 1rem;
      }
      &::before {
        bottom: -1rem;
        border-color: ${(props) => props.theme.currentTheme.subColor03}
          transparent transparent transparent;
      }
      &::after {
        bottom: -0.8rem;
        border-color: #fff transparent transparent transparent;
      }
    }
  }
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
    font-size: 1.4rem;

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
      <div className='book_height'>
        <p>13.8cm</p>
        <img src={test} alt='test' />
      </div>
      <BookList>
        {dummy.map((name, i) => (
          <li key={i}>{name}</li>
        ))}
      </BookList>
    </Wrap>
  );
}
