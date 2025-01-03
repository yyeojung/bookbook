import StarRating from 'components/common/StarRating';
import styled from 'styled-components';
import { LibraryBook } from 'types/bookData';

const BookList = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 0.1rem solid var(--grayD5);

  img {
    width: 9rem;
    height: 13.6rem;
    object-fit: fill;
    box-shadow: var(--card_shadow);
    border-radius: 1rem;
  }

  ul {
    width: calc(100% - 10rem);
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    position: relative;

    li {
      svg {
        width: 1.8rem;
        height: 1.8rem;
      }

      &.review {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 1.4rem;
      }

      &.date {
        position: absolute;
        bottom: 0;
        right: 0;
        color: var(--gray78);
        font-size: 1.3rem;
      }
    }
  }
`;

export default function BookContents({ book }: { book: LibraryBook }) {
  const startNewDate = book.startDate ? new Date(book.startDate) : null;
  const endNewDate = book.endDate ? new Date(book.endDate) : null;

  const start = startNewDate
    ? `${startNewDate.getFullYear()}.${startNewDate.getMonth() + 1}.${startNewDate.getDate()}`
    : '';

  const end = endNewDate
    ? `${endNewDate.getFullYear()}.${endNewDate.getMonth() + 1}.${endNewDate.getDate()}`
    : '';

  return (
    <BookList>
      <img src={book.cover} alt={book.title} />
      <ul>
        <li>
          <strong className='text_ellipsis d_block'>{book.title}</strong>
        </li>
        <li>
          <StarRating rating={book.starRating} readonly />
        </li>
        {/* 읽고있는 책의 경우 ui */}
        <li className='review'>{book.review}</li>
        <li className='date'>
          <p>
            {start} ~ {end}
          </p>
        </li>
      </ul>
    </BookList>
  );
}
