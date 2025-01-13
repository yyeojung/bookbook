import Button from 'components/common/Button';
import Calendar from 'components/common/Calendar';
import CalendarPeriod from 'components/common/CalendarPeriod';
import RadioBtn from 'components/common/RadioBtn';
import StarRating from 'components/common/StarRating';
import SubHeader from 'components/common/SubHeader';
import Textarea from 'components/common/Textarea';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useLibraryStore } from 'store/useLibraryStore';
import styled from 'styled-components';
import { LibraryBook } from 'types/bookData';

const Contents = styled.form`
  padding: 2rem;

  .title {
    margin-bottom: 1.6rem;
    font-weight: bold;

    &:not(:first-child) {
      margin-top: 2.4rem;
    }
  }
  .radio_wrap {
    display: flex;
    gap: 2rem;
  }
`;

const BookPage = styled.div`
  display: flex;
  justify-content: space-between;

  input {
    width: calc(100% - 9rem);
  }
  .tab_wrap {
    width: 8rem;
    height: 3.8rem;
    li.bg {
      background: ${(props) => props.theme.subColor03};
    }
  }
`;

export default function HomeRegister() {
  const location = useLocation();
  const { isbn } = useParams();
  const { state } = location;
  const navigate = useNavigate();
  const { books, addBook, editBook } = useLibraryStore();

  const currentBook = books.find((book) => book.bookId === isbn);

  const [readFinish, setReadFinish] = useState(true); // 읽은 책, 읽고 있는 책
  const [pageBtn, setPageBtn] = useState(true); // 읽고 있는 책 쪽, %
  const [inputPage, setInputPage] = useState<number>(0); // 읽고 있는 책 페이지
  const [review, setReview] = useState(''); // 한줄평
  const [rating, setRating] = useState(0);
  const [readingDate, setReadingDate] = useState<Date | null>(new Date());
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  // 페이지 초기값 설정
  useEffect(() => {
    if (currentBook) {
      setReadFinish(currentBook.bookState ?? true);
      setPageBtn(currentBook.pagePercent ?? true);
      setInputPage(currentBook.pageNum ?? 0);
      setReview(currentBook.review ?? '');
      setRating(currentBook.starRating ?? 0);
      setReadingDate(currentBook.startDate ?? new Date());
      setStartDate(currentBook.startDate ?? new Date());
      setEndDate(currentBook.endDate ?? new Date());
    }
  }, [currentBook]);

  // rating
  const onChangeRating = (rate: number) => {
    setRating(rate);
  };

  // page
  const onClickPage = (e: boolean) => {
    setPageBtn(e);
  };

  // radio
  const onChangeRadio = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === 'finish') {
      setReadFinish(true);
    } else {
      setReadFinish(false);
    }
  };

  // submit
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const bookData: LibraryBook = {
      bookId: currentBook
        ? currentBook.bookId
        : `${state.isbn13}-${Date.now()}`,
      bookState: readFinish,
      startDate: readFinish ? startDate : readingDate,
      endDate: readFinish ? endDate : null,
      starRating: readFinish ? rating : undefined,
      review: readFinish ? review : null,
      pagePercent: !readFinish || !pageBtn,
      pageNum: !readFinish ? inputPage : 0,

      // 책 정보
      title: state.title,
      cover: state.cover,
      author: state.author,
      itemPage: currentBook
        ? currentBook.itemPage
        : state.subInfo.itemPage || 0,
      link: state.link,
      description: state.description,
      publisher: state.publisher,
      isbn: state.isbn,
      isbn13: state.isbn13
    };

    currentBook ? editBook(bookData) : addBook(bookData);
    navigate(-2);
  };

  return (
    <>
      <SubHeader text={currentBook ? '책 수정' : '책 등록'} />
      <Contents onSubmit={onSubmit}>
        <p className='title'>독서 상태</p>
        <div className='radio_wrap'>
          <RadioBtn
            name='read'
            value='finish'
            text='읽은 책'
            onChange={onChangeRadio}
            defaultChecked={currentBook?.bookState ?? true}
          />
          <RadioBtn
            name='read'
            text='읽고 있는 책'
            onChange={onChangeRadio}
            defaultChecked={
              currentBook?.bookState === undefined
                ? false
                : !currentBook?.bookState
            }
          />
        </div>
        {readFinish ? (
          // 읽은 책
          <>
            <p className='title'>독서 기간</p>
            <CalendarPeriod
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
            />
            <p className='title'>평점</p>
            <StarRating
              rating={rating}
              onChangeRating={onChangeRating}
              size={28}
            />
            <p className='title'>한줄평</p>
            <Textarea
              text={review}
              setText={setReview}
              placeholder='짧은 감상평을 남겨보세요. (선택)'
              maxLength={200}
            />
          </>
        ) : (
          //  읽고있는 책
          <>
            <p className='title'>독서 시작일</p>
            <Calendar
              selectedDate={readingDate}
              setSelectedDate={setReadingDate}
            />
            <p className='title'>독서량</p>
            <BookPage>
              <input
                type='number'
                value={inputPage}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setInputPage(Number(e.target.value))
                }
                placeholder='0'
              />
              <ul className='tab_wrap'>
                <li
                  onClick={() => onClickPage(true)}
                  className={pageBtn ? 'active' : ''}
                >
                  쪽
                </li>
                <li
                  onClick={() => onClickPage(false)}
                  className={!pageBtn ? 'active' : ''}
                >
                  %
                </li>
                <li className={`bg ${pageBtn ? 'left' : 'right'}`}></li>
              </ul>
            </BookPage>
          </>
        )}
        <div className='btn_wrap'>
          <Button type='submit' text='저장' width={160} />
        </div>
      </Contents>
    </>
  );
}
