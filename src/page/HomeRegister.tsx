import Button from 'components/common/Button';
import Calendar from 'components/common/Calendar';
import CalendarPeriod from 'components/common/CalendarPeriod';
import RadioBtn from 'components/common/RadioBtn';
import StarRating from 'components/common/StarRating';
import SubHeader from 'components/common/SubHeader';
import Textarea from 'components/common/Textarea';
import { ChangeEvent, FormEvent, useState } from 'react';
import styled from 'styled-components';

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
  const [reading, setReading] = useState(false);
  const [pageBtn, setPageBtn] = useState(true);
  const [inputPage, setInputPage] = useState('0');
  const [review, setReview] = useState(''); // 한줄평
  const [rating, setRating] = useState(0);
  const [readingDate, setReadingDate] = useState<Date | null>(new Date());
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

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
    if (e.target.value === 'reading') {
      setReading(true);
    } else {
      setReading(false);
    }
  };

  // submit
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <>
      <SubHeader text='책 등록' />
      <Contents onSubmit={onSubmit}>
        <p className='title'>독서 상태</p>
        <div className='radio_wrap'>
          <RadioBtn
            name='read'
            text='읽은 책'
            onChange={onChangeRadio}
            defaultChecked
          />
          <RadioBtn
            name='read'
            value='reading'
            text='읽고 있는 책'
            onChange={onChangeRadio}
          />
        </div>
        {!reading ? (
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
            <p className='title'>독서 시작일</p>
            <BookPage>
              <input
                type='number'
                value={inputPage}
                onChange={(e) => setInputPage(e.target.value)}
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
