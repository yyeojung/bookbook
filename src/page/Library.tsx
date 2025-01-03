import SubHeader from 'components/common/SubHeader';
import { useState } from 'react';
import styled from 'styled-components';
import { FaSort } from 'react-icons/fa';
import BookContents from 'components/page/library/BookContents';
import { useReadBook } from 'hook/useReadBook';

const Tab = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;
  border-bottom: 0.1rem solid var(--grayD5);
  padding: 0 2rem;
  li {
    cursor: pointer;
    padding: 0 0.8rem;
    height: 100%;
    line-height: 4rem;
    margin-bottom: -0.1rem;

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

  // 책 필터링
  let isViewBook = [];
  if (bookState === 'all') {
    isViewBook = [...readBooks, ...readingBooks];
  } else if (bookState === 'read') {
    isViewBook = readBooks;
  } else {
    isViewBook = readingBooks;
  }

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
          <button>
            오래된 저장 순
            <FaSort />
          </button>
        </SortTag>
        {isViewBook.map((book, index) => (
          <BookContents key={`${book.isbn13}${index}`} book={book} />
        ))}
      </ContentsWrap>
      {/* // 데이터 없을시 */}
      {/* <NoBook /> */}
    </>
  );
}
