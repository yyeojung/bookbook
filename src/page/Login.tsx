import styled from 'styled-components';

import LoginImg from '../assets/image/book.png';
import { Link } from 'react-router-dom';

const Wrap = styled.div`
  background: #f9c2ba;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;

  h2 {
    color: #fff;
    font-size: 3.6rem;
    font-weight: 800;
  }

  h1 {
    color: #3c3c3c;
    font-size: 4.8rem;
    margin-top: 1.2rem;
    font-weight: 800;
  }

  img {
    width: calc(100% - 6.4rem);
    margin: 4.6rem 0 0 6.4rem;
  }

  a {
    margin-top: 2rem;
    width: 30rem;
    height: 4rem;
    line-height: 4rem;
    text-align: center;
    background: #e68a8d;
    border-radius: 2rem;
    font-weight: 700;
    color: #fff;
  }
`;

export default function Login() {
  return (
    <Wrap>
      <h2>책을 쌓아서 기록하자!</h2>
      <h1>북적북적</h1>
      <img src={LoginImg} alt='loginImg' />
      <Link to='/home'>홈 바로가기</Link>
    </Wrap>
  );
}
