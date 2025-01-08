import Dropdown from 'components/common/Dropdown';
import SubHeader from 'components/common/SubHeader';
import ChartBook from 'components/page/statistics/ChartBook';
import { useReadBook } from 'hook/useReadBook';
import { useSelectStore } from 'store/useSelectStore';
import styled from 'styled-components';

const Wrap = styled.div`
  padding: 2rem;

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export interface ChartColorProps {
  currentTheme: {
    mainColor: string;
    subColor01: string;
    subColor02: string;
    subColor03: string;
  };
}
export default function Statistics({ currentTheme }: ChartColorProps) {
  const { readBooks } = useReadBook();
  const { selectOption } = useSelectStore();

  //   읽은 책 연,월 추출
  const booksYear = readBooks
    .filter((book) => book.endDate)
    .map((book) => {
      const endDate = new Date(book.endDate!);
      return {
        year: endDate.getFullYear().toString(),
        month: endDate.getMonth()
      };
    });

  //   dropdown 옵션
  const uniqueYears = Array.from(new Set(booksYear.map((book) => book.year)));
  const chartYear = uniqueYears.map((year) => {
    return { value: year, label: year };
  });
  const defaultValue =
    selectOption.find((option) => option.label === 'chartYear') || chartYear[0];

  //   차트 연도별 책 권수
  const filterBooks = readBooks.filter((book) => {
    const bookYear = book.endDate && new Date(book.endDate).getFullYear();
    return bookYear === Number(defaultValue.value);
  });

  //   차트 연도별 페이지 수
  const itemPages = filterBooks.reduce((acc, cur) => {
    return acc + (cur.itemPage || 0);
  }, 0);

  //   차트 월별 데이터
  const chartBookData = booksYear
    .filter((book) => book?.year === defaultValue.value)
    .map((book) => book?.month);

  return (
    <>
      <SubHeader text='나의 기록' clear />
      <Wrap>
        <div className='title'>
          <strong>월별 독서량</strong>
          <Dropdown
            name='chartYear'
            width='14rem'
            options={chartYear}
            defaultValue={defaultValue}
          />
        </div>
        <div className='chart_contents'>
          <p className='mt_20'>
            권수별{' '}
            <span className='fs_14 gray78'>
              (총 {`${filterBooks.length}권`})
            </span>
          </p>
          <ChartBook chartData={chartBookData} currentTheme={currentTheme} />
          <p className='mt_20'>
            페이지별{' '}
            <span className='fs_14 gray78'>
              (총 {`${itemPages.toLocaleString()}p`})
            </span>
          </p>
        </div>
      </Wrap>
    </>
  );
}
