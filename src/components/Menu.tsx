import styled from 'styled-components';
import { MdHomeFilled } from 'react-icons/md';
import { IoSettingsSharp } from 'react-icons/io5';
import { FaBook, FaChartSimple } from 'react-icons/fa6';

const MenuWrap = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 6rem;
  background: #fafafa;
  border-top: 0.1rem solid #d9d9d9;
  padding: 0 2rem;
  box-shadow: 0 -0.4rem 2rem 0 rgba(0, 0, 0, 0.08);
`;

const MenuList = styled.ul`
  display: flex;
  height: 100%;

  li {
    width: 25%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    span {
      margin-top: 0.4rem;
    }
  }
`;

export default function Menu() {
  return (
    <MenuWrap>
      <MenuList>
        <li>
          <MdHomeFilled />
          <span>홈</span>
        </li>
        <li>
          <FaBook />
          <span>서재</span>
        </li>
        <li>
          <FaChartSimple />
          <span>통계</span>
        </li>
        <li>
          <IoSettingsSharp />
          <span>설정</span>
        </li>
      </MenuList>
    </MenuWrap>
  );
}
