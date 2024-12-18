import styled from 'styled-components';
import { BiLoaderCircle } from 'react-icons/bi';

const Wrap = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 8rem;
    height: 8rem;
    fill: #fff;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default function Loading() {
  return (
    <Wrap>
      <BiLoaderCircle />
    </Wrap>
  );
}
