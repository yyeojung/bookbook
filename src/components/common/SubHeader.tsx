import styled from 'styled-components';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

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
  onClick?: () => void;
  clear?: boolean;
}

export default function SubHeader({ text, onClick, clear }: SubHeaderProps) {
  const navigate = useNavigate();

  const onClickBack = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(-1);
    }
  };
  return (
    <Header>
      {!clear && (
        <button onClick={onClickBack}>
          <IoIosArrowBack />
        </button>
      )}
      <strong>{text}</strong>
    </Header>
  );
}
