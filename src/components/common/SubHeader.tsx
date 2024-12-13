import styled from 'styled-components';
import { IoIosArrowBack } from 'react-icons/io';

const Header = styled.div`
  height: 6rem;
  text-align: center;
  position: relative;
  background: #fff;

  button {
    position: absolute;
    left: 1rem;
    top: 1rem;
    width: 4rem;
    height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      width: 2rem;
      height: 2rem;
    }
  }

  strong {
    font-size: 1.8rem;
    line-height: 6rem;
  }
`;

interface SubHeaderProps {
  text: string;
  onClick: () => void;
}

export default function SubHeader({ text, onClick }: SubHeaderProps) {
  return (
    <Header>
      <button onClick={onClick}>
        <IoIosArrowBack />
      </button>
      <strong>{text}</strong>
    </Header>
  );
}
