import SubHeader from 'components/common/SubHeader';
import styled from 'styled-components';
import Button from 'components/common/Button';
import { useNavigate, useParams } from 'react-router-dom';
import useBookStore from 'store/useBookStore';
import { useEffect, useState } from 'react';
import Loading from 'components/common/Loading';

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
    border-radius: 0.8rem;
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
  const { isbn } = useParams();
  const { bookData, fetchBookData } = useBookStore();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isbn) {
      setLoading(true);
      fetchBookData(isbn).finally(() => {
        setLoading(false); // 데이터 로딩이 끝나면 로딩 종료
      });
    }
  }, [isbn]);

  if (loading) {
    return <Loading />;
  }

  // 저장 이벤트
  const onClickSave = () => {
    navigate(`/home/register/${isbn}`);
  };

  return (
    <>
      <SubHeader text='책 상세' />
      {!bookData ? (
        <p>책 정보를 찾을 수 없습니다.</p>
      ) : (
        <>
          <BookCover>
            <p className='title'>{bookData[0].title}</p>
            <img src={bookData[0].cover} alt={bookData[0].title} />
            <p className='fs_14 gray78'>
              {bookData[0].author} ({bookData[0].subInfo.itemPage}p)
            </p>
            <a
              href={bookData[0].link}
              target='_blank'
              rel='noopener noreferrer'
            >
              알라딘 링크 이동
            </a>
          </BookCover>
          <BookInfo>
            <strong>책 소개</strong>
            <p>{bookData[0].description}</p>
            <strong>출판사</strong>
            <p>{bookData[0].publisher}</p>
            <strong>ISBN</strong>
            <p>
              {bookData[0].isbn} {bookData[0].isbn13}
            </p>
            <strong>페이지</strong>
            <p>{bookData[0].subInfo.itemPage}</p>
            <div className='btn'>
              <Button onClick={onClickSave} width={100} text='저장' />
            </div>
          </BookInfo>
        </>
      )}

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
