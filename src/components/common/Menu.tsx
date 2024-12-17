import styled from 'styled-components';
import { GoHomeFill } from 'react-icons/go';
import { IoSettingsSharp } from 'react-icons/io5';
import { FaBook, FaChartSimple } from 'react-icons/fa6';
import { NavLink } from 'react-router-dom';

const MenuWrap = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
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

    a {
      font-size: 0;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.4rem;

      &.active {
        svg {
          fill: ${(props) => props.theme.subColor03};
        }
        p {
          color: ${(props) => props.theme.subColor03};
        }
      }
    }

    svg {
      width: 2.4rem;
      height: 2.4rem;
      fill: var(--grayD9);
    }

    p {
      color: #525252;
      font-size: 1.2rem;
      text-align: center;
    }
  }
`;

export default function Menu() {
  return (
    <MenuWrap>
      <MenuList>
        <li>
          <NavLink
            to='/home'
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <GoHomeFill />
            <p>홈</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/library'
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <FaBook />
            <p>서재</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/statistics'
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <FaChartSimple />
            <p>통계</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/setting'
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <IoSettingsSharp />
            <p>설정</p>
          </NavLink>
        </li>
      </MenuList>
    </MenuWrap>
  );
}
