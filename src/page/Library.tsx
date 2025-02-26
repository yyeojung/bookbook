import SubHeader from 'components/common/SubHeader';
import { useState } from 'react';
import styled from 'styled-components';
import { FaSort } from 'react-icons/fa';
import BookContents from 'components/page/library/BookContents';
import { useReadBook } from 'hook/useReadBook';
import { Link } from 'react-router-dom';
import NoBook from 'components/common/NoBook';
import { useViewStore } from 'store/useViewStore';

const Tab = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;
  border-bottom: 0.1rem solid var(--grayD5);
  padding: 0 2rem;
  li {
    cursor: pointer;
    height: 100%;
    line-height: 4rem;
    width: 33.333%;
    max-width: 14rem;
    margin-bottom: -0.1rem;
    text-align: center;

    &.active {
      border-bottom: 0.2rem solid ${(props) => props.theme.subColor03};
    }
  }
`;

const SortTag = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 2rem 0;

  button {
    display: flex;
    align-items: center;
    height: 2rem;
    gap: 0.6rem;
    font-size: 1.4rem;

    svg {
      fill: ${(props) => props.theme.subColor03};
    }
  }
`;

const ContentsWrap = styled.div`
  max-height: calc(100vh - 16rem);
  padding: 0 2rem;
`;

export default function Library() {
  const [bookState, setBookState] = useState('all');
  const { readBooks, readingBooks } = useReadBook();
  const { isAscending, setIsAscending } = useViewStore();

  // tab list
  const libraryTab = [
    {
      name: '전체',
      state: 'all',
      length: readBooks.length + readingBooks.length
    },
    { name: '읽은 책', state: 'read', length: readBooks.length },
    { name: '읽고 있는 책', state: 'reading', length: readingBooks.length }
  ];

  const onClickState = (state: string) => {
    setBookState(state);
  };

  // 정렬 버튼
  const onClickSort = () => {
    setIsAscending();
  };

  // 책 필터링
  let isViewBook = [];
  if (bookState === 'all') {
    isViewBook = [...readBooks, ...readingBooks];
  } else if (bookState === 'read') {
    isViewBook = readBooks;
  } else {
    isViewBook = readingBooks;
  }

  // 정렬 (읽고있는 책은 시작일 기준)
  isViewBook.sort((a, b) => {
    const dateA = a.endDate ? new Date(a.endDate) : new Date(a.startDate!);
    const dateB = b.endDate ? new Date(b.endDate) : new Date(b.startDate!);

    if (isAscending) {
      return dateA.getTime() - dateB.getTime();
    } else {
      return dateB.getTime() - dateA.getTime();
    }
  });

  //   현재 탭
  const currentTab = libraryTab.find((item) => item.state === bookState);
  return (
    <>
      <SubHeader text='책 상세' />
      <Tab>
        {libraryTab.map((tab) => (
          <li
            key={tab.state}
            onClick={() => onClickState(tab.state)}
            className={bookState === tab.state ? 'active' : ''}
          >{`${tab.name} (${tab.length})`}</li>
        ))}
      </Tab>
      <ContentsWrap className='scroll'>
        <SortTag>
          <button onClick={onClickSort}>
            독서 {isAscending ? '오름차순' : '내림차순'}
            <FaSort />
          </button>
        </SortTag>
        {isViewBook.map((book) => (
          <Link key={book.bookId} to={`/library/report/${book.bookId}`}>
            <BookContents book={book} />
          </Link>
        ))}
      </ContentsWrap>
      {/* // 데이터 없을시 */}
      {currentTab?.length === 0 && <NoBook height='calc(100% - 22rem)' />}
    </>
  );
}
