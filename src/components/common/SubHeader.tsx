import styled from 'styled-components';
import { IoIosArrowBack } from 'react-icons/io';

const Header = styled.div`
  height: 6rem;
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
