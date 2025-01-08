import SubHeader from 'components/common/SubHeader';
import styled from 'styled-components';
import Button from 'components/common/Button';
import { useNavigate, useParams } from 'react-router-dom';
import useBookStore from 'store/useBookStore';
import { useEffect, useState } from 'react';
import Loading from 'components/common/Loading';
import { useLibraryStore } from 'store/useLibraryStore';
import { useModal } from 'hook/useModal';
import ModalLayout from 'components/modal/ModalLayout';

export const BookDetail = styled.div`
  max-height: calc(100vh - 12rem);
  overflow-y: auto;
`;

export const BookCover = styled.div`
  padding: 1rem 2rem 2rem;
  text-align: center;
  border-bottom: 0.1rem solid var(--grayD9);

  .title {
    line-height: 1.3;
  }

  img {
    width: 13rem;
    height: 16rem;
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
export const BookInfo = styled.div`
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
    margin-top: 2rem;
    display: flex;
    justify-content: center;
  }
`;

export default function HomeDetail() {
  const { isbn } = useParams();
  const { bookData, fetchBookData } = useBookStore();
  const [loading, setLoading] = useState(true);
  const { books } = useLibraryStore();
  const { isModalOpen, openModal, closeModal } = useModal();
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
  if (!bookData) {
    return <p>책 정보를 찾을 수 없습니다.</p>;
  }

  // 저장 이벤트
  const onClickSave = () => {
    const sameId = books.filter((book) => book.isbn13 === isbn);
    if (sameId.length > 0) {
      openModal('re-save');
    } else {
      navigate(`/home/register/${isbn}`, { state: bookData?.[0] });
    }
  };

  // 재저장 이벤트
  const onClickReSave = () => {
    navigate(`/home/register/${isbn}`, { state: bookData?.[0] });
  };

  return (
    <>
      <SubHeader text='책 상세' />

      <BookDetail>
        <BookCover>
          <p className='title'>{bookData[0].title}</p>
          <img
            className='cover_img'
            src={bookData[0].cover}
            alt={bookData[0].title}
          />
          <p className='fs_14 gray78'>
            {bookData[0].author} ({bookData[0].subInfo?.itemPage}p)
          </p>
          <a href={bookData[0].link} target='_blank' rel='noopener noreferrer'>
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
          <p>{bookData[0].subInfo?.itemPage}</p>
          <div className='btn'>
            <Button onClick={onClickSave} width={100} text='저장' />
          </div>
        </BookInfo>
      </BookDetail>

      {/* 이미 등록한 책 confirm */}
      <ModalLayout
        type='confirm'
        message={
          <>
            저장하려는 책이 이미 존재해요! <br />
            다시 저장할까요?
          </>
        }
        isOpen={isModalOpen === 're-save'}
        onClick={onClickReSave}
        onClose={closeModal}
      />
    </>
  );
}
