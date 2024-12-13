import styled from 'styled-components';
import { IoChatbubbleSharp } from 'react-icons/io5';

import LoginImg from '../assets/image/book.png';

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
`;

const KakaoLogin = styled.button`
  background: #ffea28;
  width: 31rem;
  height: 5.2rem;
  border-radius: 1.2rem;
  color: #371d1e;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 10rem auto 0;

  svg {
    width: 2rem;
    height: 2rem;
  }
`;

export default function Login() {
  return (
    <Wrap>
      <h2>책을 쌓아서 기록하자!</h2>
      <h1>북적북적</h1>
      <img src={LoginImg} alt='loginImg' />

      <KakaoLogin>
        <IoChatbubbleSharp />
        카카오톡으로 시작하기
      </KakaoLogin>
    </Wrap>
  );
}
