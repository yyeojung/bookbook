import Dropdown from 'components/common/Dropdown';
import SubHeader from 'components/common/SubHeader';
import ChartBook from 'components/page/statistics/ChartBook';
import ChartPage from 'components/page/statistics/ChartPage';
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
export default function Statistics({
  currentTheme
}: ChartColorProps): JSX.Element {
  const { readBooks } = useReadBook();
  const { selectOption } = useSelectStore();

  //   읽은 책 연,월 추출
  const booksYear = readBooks
    .filter((book) => book.endDate)
    .map((book) => {
      const endDate = book.endDate ? new Date(book.endDate) : new Date();
      return {
        year: endDate.getFullYear().toString(),
        month: endDate.getMonth(),
        itemPages: book.itemPage || 0
      };
    });

  //  dropdown  endDate 중 가장 작은 연도에서 현재 연도까지 생성
  const currentYear = new Date().getFullYear();
  const minYear = Math.min(
    ...booksYear.map((book) => parseInt(book.year, 10)),
    currentYear
  );
  const uniqueYears = Array.from(
    { length: currentYear - minYear + 1 },
    (_, i) => (minYear + i).toString()
  );
  const chartYear = uniqueYears.map((year) => {
    return { value: year, label: year };
  });
  const defaultValue =
    selectOption.find((option) => option.label === 'chartYear') || chartYear[0];

  //   차트 연도별 책 수
  const filterBooks = booksYear.filter(
    (book) => book.year === defaultValue.value
  );

  //   차트 연도별 페이지 수
  const itemPages = filterBooks.reduce((acc, cur) => acc + cur.itemPages, 0);

  //   차트 데이터
  //   const chartData = <T extends keyof (typeof filterBooks)[0]>(key: T) => {
  //     return filterBooks.map((book) => Number(book[key]));
  //   };

  //   권수별 차트 데이터
  const chartBookData = filterBooks.map((book) => book.month);

  // 페이지별 차트 데이터
  const chartPageData = filterBooks.map((book) => book.itemPages);
  //   console.log(chartData('year'));
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
          <ChartPage chartData={chartPageData} currentTheme={currentTheme} />
        </div>
      </Wrap>
    </>
  );
}
