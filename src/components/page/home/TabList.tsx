import StarRating from 'components/common/StarRating';
import styled from 'styled-components';
import { useLibraryStore } from 'store/useLibraryStore';
import { Link } from 'react-router-dom';

const BookList = styled.ul`
  display: flex;
  gap: 1.4rem;
  flex-wrap: wrap;
  max-height: 100%;

  li {
    width: calc((100% - 2.8rem) / 3);
    cursor: pointer;

    a {
      display: block;
      height: 100%;
    }

    @media (min-width: 500px) {
      width: calc((100% - 4.2rem) / 4);
    }
    img {
      width: 100%;
      height: 13rem;
      border-radius: 0.8rem;
      object-fit: fill;
      box-shadow: var(--card_shadow);
      @media (min-width: 500px) {
        height: 14rem;
      }
    }

    .title {
      margin-top: 0.6rem;
      max-width: 100%;
    }

    @media (max-width: 420px) {
      .star-svg {
        width: 2rem;
        height: 2rem;
      }
    }
  }
`;

export default function TabList() {
  const { readBooks } = useLibraryStore();

  return (
    <BookList>
      {readBooks
        .slice()
        .reverse()
        .map((book) => (
          <li key={book.isbn13}>
            <Link to='/home'>
              <img src={book.cover} alt={book.isbn13} />
              <p className='title text_ellipsis'>{book.title}</p>
              <p className='sub_title mt_4 text_ellipsis'>{book.author}</p>
              <StarRating readonly rating={book.starRating} />
            </Link>
          </li>
        ))}
    </BookList>
  );
}
