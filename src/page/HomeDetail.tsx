import SubHeader from 'components/common/SubHeader';
import styled from 'styled-components';
import dummyIng from '../assets/image/dummyIng.png';
import Button from 'components/common/Button';

const BookCover = styled.div`
  padding: 1rem 2rem 2rem;
  text-align: center;
  border-bottom: 0.1rem solid var(--grayD9);

  .title {
    line-height: 1.3;
  }

  img {
    width: 13rem;
    height: 16rem;
    object-fit: fill;
    margin: 2rem auto 1rem;
  }

  a {
    display: block;
    margin-top: 1rem;
    text-align: right;
    font-size: 1.4rem;
    color: ${(props) => props.theme.subColor03};
    text-decoration: underline;
    text-underline-offset: 0.3rem;
  }
`;
const BookInfo = styled.div`
  padding: 2rem;

  strong {
    font-weight: 700;
    display: block;

    &:not(:first-child) {
      margin-top: 2rem;
    }
  }

  p {
    color: var(--gray78);
    margin-top: 1rem;
  }

  .btn {
    text-align: center;
    margin-top: 2rem;
  }
`;

export default function HomeDetail() {
  return (
    <>
      <SubHeader text='책 상세' />
      <BookCover>
        <p className='title'>
          책이름책이름책이름책이름책이름책이름책이름책이름책이름책이름책이름책이름책이름책이이름
        </p>
        <img src={dummyIng} alt='dd' />
        <p className='fs_14 gray78'>작가이름 (323p)</p>
        <a
          href='https://www.google.com'
          target='_blank'
          rel='noopener noreferrer'
        >
          알라딘 링크 이동
        </a>
      </BookCover>
      <BookInfo>
        <strong>책 소개</strong>
        <p>
          어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구
        </p>
        <strong>출판사</strong>
        <p>저쩌구</p>
        <strong>ISBN</strong>
        <p>234234</p>
        <strong>페이지</strong>
        <p>234</p>
        <div className='btn'>
          <Button width={100} text='저장' />
        </div>
      </BookInfo>

      {/* 이미 등록한 책 confirm */}
      {/* <ModalLayout
        type='confirm'
        message='confirm입니더'
        isOpen={isModalOpen === 're-register'}
        onClose={closeModal}
      /> */}
    </>
  );
}
