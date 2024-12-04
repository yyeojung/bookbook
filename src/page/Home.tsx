import styled from 'styled-components';
import { GoTriangleDown } from 'react-icons/go';
import { useState } from 'react';
import TabBuild from 'components/page/home/TabBuild';
import TabList from 'components/page/home/TabList';
import SearchBook from 'components/page/home/SearchBook';

const Wrap = styled.div`
  padding: 2rem 2rem 0;

  .show_text {
    font-size: 1.8rem;
    height: 5.4rem;
    font-weight: 800;
    display: flex;
    align-items: center;
    gap: 0.4rem;

    svg {
      width: 3rem;
      height: 3rem;
      fill: ${(props) => props.theme.currentTheme.subColor03};
    }
  }

  .tab_contents {
    position: relative;
    min-height: calc(100vh - 21.4rem);
  }
`;

const TabShow = styled.ul`
  background: ${(props) => props.theme.colors.grayF2};
  border-radius: 8px;
  height: 4rem;
  display: flex;
  align-items: center;

  li {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.2s all;

    &.active {
      background: ${(props) => props.theme.currentTheme.subColor03};
      color: #fff;
    }
  }
`;

export default function Home() {
  const [currentTab, setCurrentTab] = useState(true);

  const onClickTab = (e: boolean) => {
    setCurrentTab(e);
  };
  return (
    <Wrap>
      <SearchBook />
      <div className='show_text'>
        <span>전체 보기 (0)</span>
        <GoTriangleDown />
      </div>
      <TabShow>
        <li
          onClick={() => onClickTab(true)}
          className={currentTab ? 'active' : ''}
        >
          쌓아보기
        </li>
        <li
          onClick={() => onClickTab(false)}
          className={!currentTab ? 'active' : ''}
        >
          리스트형 보기
        </li>
      </TabShow>
      <div className='tab_contents'>
        {/* 데이터 없을시 */}
        <p>
          읽은 책이 없습니다.
          <br />
          책을 추가해보세요 :&#41;
        </p>
        {currentTab ? <TabBuild /> : <TabList />}
      </div>
    </Wrap>
  );
}
