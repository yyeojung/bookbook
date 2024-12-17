import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import icon from '../../assets/image/datepicker.svg';
import React from 'react';

const StyledPicker = styled.div`
  width: 100%;
  position: relative;
  display: inline-block;

  /* Wrapper Styling */
  .react-datepicker-wrapper {
    width: 100%;
  }

  /* Input Styling */
  .react-datepicker__input-container::before {
    /* 아이콘 적용 (대체 요소 사용) */
    display: block;
    content: '';
    clear: both;
    position: absolute;
    top: 0.9rem;
    right: 1rem;
    width: 2rem;
    height: 2rem;
    background: url(${icon}) center center/2rem no-repeat;
  }

  input {
    background: transparent;
    cursor: pointer;

    &:focus {
      border: ${(props) => props.theme.mainColor};
    }
  }

  /* common */
  button.react-datepicker__close-icon {
    display: none;
  }
  .react-datepicker-popper[data-placement^='bottom'] {
    padding-top: 0;
  }
  .react-datepicker__triangle {
    display: none;
  }
  /* text */
  .date_name {
    font-size: 1.4rem;
    margin-bottom: 0.6rem;
  }

  /* Datepicker Panel */
  .react-datepicker {
    border-radius: 1rem;
    background: #fff;
    color: var(--textColor);
    border: 0.1rem solid var(--grayD9);
    font-size: 1.2rem;
    box-shadow: var(--card_shadow);
  }

  .react-datepicker__navigation-icon::before {
    height: 0.6rem;
    width: 0.6rem;
    border-width: 0.2rem 0.2rem 0 0;
    top: 1.6rem;
    border-color: var(--gray78);
  }

  /* Header */
  .react-datepicker__header {
    background: transparent;
    color: var(--textColor);
    border: none;
    border-radius: 1rem;
    padding: 0;

    .react-datepicker__current-month {
      display: none;
    }

    .react-datepicker__year-dropdown-container--select,
    .react-datepicker__month-dropdown-container {
      margin: 0 0.5rem;
    }

    .react-datepicker__header__dropdown {
      border-bottom: var(--grayD9);
      line-height: 4.8rem;
      height: 4.8rem;
      display: flex;
      flex-direction: row-reverse;
      justify-content: center;
    }

    .react-datepicker__header__dropdown select {
      background: #fff;
      color: var(--textColor);
      font-size: 1.3rem;
      width: 6.8rem;
      outline: none;
      border-radius: 0.4rem;
      border: 0.1px solid var(--grayD9);
      height: 3.2rem;
    }
  }

  /* Day */
  .react-datepicker__day--keyboard-selected {
    background: transparent;
  }

  .react-datepicker__day-name,
  .react-datepicker__day {
    width: 3rem;
    line-height: 3rem;
    border-radius: 50%;
    color: var(--textColor);
  }

  .react-datepicker__day--selected {
    background: ${(props) => props.theme.subColor03};
    color: #fff;
  }

  .react-datepicker__day--disabled,
  .react-datepicker__day--outside-month {
    color: var(--grayA3);
  }

  .react-datepicker__day:not(.react-datepicker__day--disabled):hover {
    border-radius: 50%;
    background: ${(props) => props.theme.subColor01};
  }

  .react-datepicker__day-name {
    font-weight: bold;
  }
`;

interface CalendarPros {
  text?: string;
  selectedDate: Date | null;
  setSelectedDate: (e: Date | null) => void;
}

// input readonly 위해 추가
const CustomInput = React.forwardRef<
  HTMLInputElement,
  React.HTMLProps<HTMLInputElement>
>((props, ref) => {
  return (
    <input
      onClick={props.onClick}
      value={props.value}
      type='text'
      readOnly={true}
      ref={ref}
    />
  );
});
CustomInput.displayName = 'CustomInput';

export default function Calendar({
  text,
  selectedDate,
  setSelectedDate
}: CalendarPros) {
  //   const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const defaultDate = selectedDate || new Date();

  return (
    <StyledPicker>
      {text && <p className='date_name'>{text}</p>}
      <DatePicker
        locale={ko}
        dateFormat='yyyy.MM.dd' // 날짜 형태
        shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
        maxDate={new Date()} // maxDate 이후 날짜 선택 불가
        selected={defaultDate}
        onChange={(date) => setSelectedDate(date)}
        showMonthDropdown
        showYearDropdown
        dropdownMode='select'
        customInput={<CustomInput />}
      />
    </StyledPicker>
  );
}
