import SubHeader from 'components/common/SubHeader';
import { BookCover, BookDetail, BookInfo } from './HomeDetail';
import Button from 'components/common/Button';
import { useEffect, useState } from 'react';
import StarRating from 'components/common/StarRating';
import { BsFillHandThumbsUpFill } from 'react-icons/bs';
import { FaBookmark } from 'react-icons/fa6';
import styled from 'styled-components';
import { ProgressBar } from 'components/page/library/BookContents';
import { useNavigate, useParams } from 'react-router-dom';
import { useLibraryStore } from 'store/useLibraryStore';
import { useModal } from 'hook/useModal';
import ModalLayout from 'components/modal/ModalLayout';

const ReportBookCover = styled(BookCover)`
  .img_wrap {
    position: relative;
    margin-bottom: 0.6rem;

    .tag {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      background: ${(props) => props.theme.subColor02};
      color: #fff;
      font-size: 1.2rem;
      width: fit-content;
      height: 2rem;
      padding: 0 0.6rem;
      display: flex;
      gap: 0.4rem;
      align-items: center;
      border-radius: 1rem;
    }
  }
  .rating svg {
    width: 1.8rem;
    height: 1.8rem;
  }

  .report {
    text-align: left;

    .reading_period {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 1rem 0;

      .tag {
        font-size: 1.4rem;
        margin-top: 0;

        span {
          background: ${(props) => props.theme.subColor02};
          display: inline-block;
          height: 2rem;
          line-height: 2rem;
          padding: 0 0.6rem;
          color: #fff;
          border-radius: 2rem;
        }
      }
    }

    .period_box {
      background: var(--grayF2);
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 0.8rem;
      height: 4rem;
      padding: 0 2rem;
      position: relative;

      span {
        color: ${(props) => props.theme.subColor03};
        padding-right: 0.8rem;
      }

      i {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
      }
    }

    strong {
      height: 3rem;
      line-height: 3rem;
      font-weight: 700;
      display: block;
    }
  }
`;

export default function LibraryBook() {
  const { bookId } = useParams();
  const [isRead, setIsRead] = useState(true);
  const { books } = useLibraryStore();
  const { isModalOpen, openModal, closeModal } = useModal();
  const { deleteBook } = useLibraryStore();
  const navigate = useNavigate();

  const currentBook = books.find((book) => book.bookId === bookId);

  if (!currentBook) {
    return <p>해당 책을 찾을 수 없습니다.</p>;
  }

  useEffect(() => {
    if (!currentBook?.bookState) {
      setIsRead(false);
    }
  }, [currentBook]);

  //   독서 기간
  const readingPeriod = () => {
    if (!currentBook.startDate || !currentBook.endDate) {
      return null; // 날짜가 없는 경우 처리
    }

    const start = new Date(currentBook.startDate).getTime();
    const end = new Date(currentBook.endDate).getTime();
    const readingSeconds = end - start;

    const readingDays = Math.ceil(readingSeconds / (1000 * 60 * 60 * 24));
    return readingDays + 1;
  };

  //   독서기간
  const formatDate = (date: string | Date | null | undefined) => {
    if (!date) return '';

    const d = new Date(date);

    return `${d.getFullYear().toString()}.${(d.getMonth() + 1).toString().padStart(2, '0')}.${d.getDate().toString().padStart(2, '0')}`;
  };
  const formattedStart = formatDate(currentBook.startDate);
  const formattedEnd = formatDate(currentBook.endDate);

  //   독서량
  let pagePercent = currentBook.pageNum;
  if (!currentBook.pagePercent && currentBook.pageNum && currentBook.itemPage) {
    pagePercent = (currentBook.pageNum / currentBook.itemPage) * 100;
  }

  //   삭제
  const onClickDelete = (bookId: string) => {
    deleteBook(bookId);
    navigate('/library');
  };

  return (
    <>
      <SubHeader text={currentBook.bookState ? '읽은 책' : '읽고있는 책'} />

      <BookDetail>
        <ReportBookCover>
          <p className='title'>{currentBook.title}</p>
          <div className='img_wrap'>
            <img
              className='cover_img'
              src={currentBook.cover}
              alt={currentBook.title}
            />
            <p className='tag'>
              {isRead ? (
                <>
                  <BsFillHandThumbsUpFill />
                  읽은 책
                </>
              ) : (
                <>
                  <FaBookmark />
                  읽는 중
                </>
              )}
            </p>
          </div>
          <p className='fs_14 gray78'>
            {currentBook.author}{' '}
            {currentBook.itemPage ? `${currentBook.itemPage}p` : ''}
          </p>
          {isRead && (
            <StarRating
              className='rating mt_4'
              readonly
              rating={currentBook.starRating}
            />
          )}
          <a href='/' target='_blank' rel='noopener noreferrer'>
            알라딘 링크 이동
          </a>

          {/* report */}
          <div className='report'>
            <div className='reading_period'>
              <strong>독서 기간</strong>
              {isRead && (
                <p className='tag'>
                  <span>{readingPeriod()}</span> 일 동안 읽었어요.
                </p>
              )}
            </div>
            <div className='period_box'>
              <p>
                <span>시작</span>
                {formattedStart}
              </p>
              <i>~</i>
              {isRead && (
                <p>
                  <span>종료</span>
                  {formattedEnd}
                </p>
              )}
            </div>
            {isRead ? (
              <>
                <strong className='mt_20'>한줄평</strong>
                <p className='mt_10 fs_14'>{currentBook.review}</p>
              </>
            ) : (
              <>
                <strong className='mt_20'>독서량</strong>
                <ProgressBar className='mt_10'>
                  <div className='progress' style={{ height: '1rem' }}>
                    <div
                      className='percent'
                      style={{ width: `${pagePercent}%` }}
                    ></div>
                  </div>
                  <div className='percent_text'>
                    <p className='per'>{pagePercent?.toFixed(0)}%</p>
                    <p className='gray78'>
                      <span>
                        {currentBook.pagePercent
                          ? (currentBook.itemPage ?? 0) *
                            (currentBook.pageNum ?? 0) *
                            0.01
                          : currentBook.pageNum}
                      </span>{' '}
                      / <span>{currentBook.itemPage}p</span>
                    </p>
                  </div>
                </ProgressBar>
              </>
            )}
          </div>
        </ReportBookCover>

        <BookInfo>
          <strong>책 소개</strong>
          <p>{currentBook.description}</p>
          <strong>출판사</strong>
          <p>{currentBook.publisher}</p>
          <strong>ISBN</strong>
          <p>
            {currentBook.isbn} {currentBook.isbn13}
          </p>
          <strong>페이지</strong>
          <p>{currentBook.itemPage}</p>
          <div className='btn gap_10'>
            <Button
              className='gray'
              onClick={() => openModal('delete-confirm')}
              width={100}
              text='삭제'
            />
            <Button
              onClick={() =>
                navigate(`/home/register/${currentBook.bookId}`, {
                  state: currentBook
                })
              }
              width={100}
              text='수정'
            />
          </div>
        </BookInfo>
      </BookDetail>

      {/* 삭제 confirm */}
      <ModalLayout
        type='confirm'
        message={
          <>
            모든 데이터가 삭제되며
            <br />
            복구할 수 없습니다.
            <br />
            정말로 삭제할까요?
          </>
        }
        isOpen={isModalOpen === 'delete-confirm'}
        onClose={closeModal}
        onClick={() => onClickDelete(currentBook.bookId)}
      />
    </>
  );
}
