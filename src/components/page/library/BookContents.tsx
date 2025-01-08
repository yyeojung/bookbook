import StarRating from 'components/common/StarRating';
import styled from 'styled-components';
import { LibraryBook } from 'types/bookData';

const BookList = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 0.1rem solid var(--grayD5);

  img {
    height: 13.6rem;
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

export const ProgressBar = styled.div`
  .progress {
    width: 100%;
    height: 0.6rem;
    background: var(--grayF2);
    border-radius: 0.6rem;

    .percent {
      height: 100%;
      border-radius: 0.6rem;
      background: ${(props) => props.theme.subColor03};
    }
  }
  .percent_text {
    display: flex;
    justify-content: space-between;
    font-size: 1.3rem;
    margin-top: 0.6rem;

    .per {
      color: ${(props) => props.theme.subColor03};
    }
  }
`;

export default function BookContents({ book }: { book: LibraryBook }) {
  const startNewDate = book.startDate ? new Date(book.startDate) : null;
  const endNewDate = book.endDate ? new Date(book.endDate) : null;

  const start = startNewDate
    ? `${startNewDate.getFullYear()}.${(startNewDate.getMonth() + 1).toString().padStart(2, '0')}.${startNewDate.getDate().toString().padStart(2, '0')}`
    : '';

  const end = endNewDate
    ? `${endNewDate.getFullYear()}.${(endNewDate.getMonth() + 1).toString().padStart(2, '0')}.${endNewDate.getDate().toString().padStart(2, '0')}`
    : '';

  let pagePercent = book.pageNum;
  if (!book.pagePercent && book.pageNum && book.itemPage) {
    pagePercent = (book.pageNum / book.itemPage) * 100;
  }
  return (
    <BookList>
      <img className='cover_img' src={book.cover} alt={book.title} />
      <ul>
        <li>
          <strong className='text_ellipsis d_block'>{book.title}</strong>
        </li>
        {/* 읽고있는 책의 경우 ui */}
        {book.bookState === false ? (
          <li>
            <ProgressBar>
              <div className='progress'>
                <div
                  className='percent'
                  style={{ width: `${pagePercent}%` }}
                ></div>
              </div>
              <div className='percent_text'>
                <p className='per'>{pagePercent?.toFixed(0)}%</p>
                <p className='gray78'>
                  <span>
                    {book.pagePercent
                      ? (book.itemPage ?? 0) * (book.pageNum ?? 0) * 0.01
                      : book.pageNum}
                  </span>{' '}
                  / <span>{book.itemPage}p</span>
                </p>
              </div>
            </ProgressBar>
          </li>
        ) : (
          <>
            <li>
              <StarRating rating={book.starRating} readonly />
            </li>
            <li className='review'>{book.review}</li>
          </>
        )}
        <li className='date'>
          <p>
            {start} ~ {end}
          </p>
        </li>
      </ul>
    </BookList>
  );
}
