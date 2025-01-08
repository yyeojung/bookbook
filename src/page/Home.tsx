import styled from 'styled-components';
import { GoTriangleDown } from 'react-icons/go';
import { useState } from 'react';
import TabBuild from 'components/page/home/TabBuild';
import TabList from 'components/page/home/TabList';
import SearchForm from 'components/page/home/SearchForm';
import { useModal } from 'hook/useModal';
import ModalHomeView from 'components/modal/ModalHomeView';
import { useReadBook } from 'hook/useReadBook';
import NoBook from 'components/common/NoBook';
import { useViewStore } from 'store/useViewStore';
const Wrap = styled.div`
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
      fill: ${(props) => props.theme.subColor03};
    }
  }

  .tab_contents {
    position: relative;
    height: calc(100vh - 22.4rem);
    max-height: calc(100vh - 22.4rem);
    overflow-y: auto;
    padding: 0 2rem;
  }

  .tab_wrap li.bg {
    background: ${(props) => props.theme.subColor03};
  }
`;

const HomeTop = styled.div`
  padding: 2rem 2rem 1rem;
`;

export default function Home() {
  const [tabBuild, setTabBuild] = useState(true);
  const { isModalOpen, openModal, closeModal } = useModal();
  const { isView } = useViewStore();
  const { selectYear, selectMonth, filterBooks } = useReadBook();

  const onClickTab = (e: boolean) => {
    setTabBuild(e);
  };

  const onClickModal = () => {
    closeModal();
  };

  // 보기 타이틀
  let viewText = '전체 보기';
  if (isView !== 'all') {
    if (selectMonth.value === '전체') {
      viewText = `${selectYear.value}년 전체`;
    } else {
      viewText = `${selectYear.value}년 ${selectMonth.value}월`;
    }
  }

  return (
    <Wrap>
      <HomeTop>
        <SearchForm />
        <button className='show_text' onClick={() => openModal('all-view')}>
          {viewText} ({filterBooks.length})
          <GoTriangleDown />
        </button>
        <ul className='tab_wrap'>
          <li
            onClick={() => onClickTab(true)}
            className={tabBuild ? 'active' : ''}
          >
            쌓아보기
          </li>
          <li
            onClick={() => onClickTab(false)}
            className={!tabBuild ? 'active' : ''}
          >
            리스트형 보기
          </li>
          <li className={`bg ${tabBuild ? 'left' : 'right'}`}></li>
        </ul>
      </HomeTop>
      <div className='tab_contents'>
        {filterBooks.length > 0 ? (
          tabBuild ? (
            <TabBuild />
          ) : (
            <TabList />
          )
        ) : (
          // 데이터 없을시
          <NoBook />
        )}
      </div>

      {/* modal */}
      <ModalHomeView
        isOpen={isModalOpen === 'all-view'}
        onClick={onClickModal}
      />
    </Wrap>
  );
}
