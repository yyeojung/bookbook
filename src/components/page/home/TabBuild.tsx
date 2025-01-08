import styled from 'styled-components';
import { homeIcon } from 'data/homeCharacter';
import { Link } from 'react-router-dom';
import { useReadBook } from 'hook/useReadBook';

const Wrap = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  max-height: 100%;
  padding-top: 10rem;

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
      border: 0.2rem solid ${(props) => props.theme.subColor03};

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
        border-color: ${(props) => props.theme.subColor03} transparent
          transparent transparent;
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
    border-radius: 0.8rem;
    color: #fff;

    a {
      font-size: 1.4rem;
      padding: 0.4rem 1rem;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &:nth-child(4n) {
      background: ${(props) => props.theme.mainColor};
      margin: 0 -1rem 0 1rem;
      color: var(--textColor);
    }
    &:nth-child(4n + 1) {
      background: ${(props) => props.theme.subColor02};
      margin: 0 -1.6rem 0 1.6rem;
    }
    &:nth-child(4n + 2) {
      background: ${(props) => props.theme.subColor01};
      margin: 0 -1rem 0 -1rem;
      color: var(--textColor);
    }
    &:nth-child(4n + 3) {
      background: ${(props) => props.theme.subColor03};
    }
  }
`;

export default function TabBuild() {
  const { filterBooks } = useReadBook();

  const totalPage = filterBooks
    .map((book) => book.itemPage)
    .reduce((acc: number, cur: number | undefined) => acc + (cur || 0), 0);
  const totalPageCm = (totalPage * 0.005).toFixed(2);
  const selectIcon = homeIcon(parseFloat(totalPageCm));

  return (
    <Wrap>
      <div className='book_height'>
        <p>{totalPageCm}cm</p>
        <img src={selectIcon} alt='test' />
      </div>
      <BookList>
        {filterBooks
          .slice()
          .reverse()
          .map((book) => (
            <li
              style={{
                height: `${0.01 * (book.itemPage ?? 200)}rem` // 동적으로 계산된 높이
              }}
              key={book.bookId}
            >
              <Link to={`/library/report/${book.bookId}`}>
                <span className='text_ellipsis'>{book.title}</span>
              </Link>
            </li>
          ))}
      </BookList>
    </Wrap>
  );
}
