import Loading from 'components/common/Loading';
import useIntersect from 'hook/useIntersect';
import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
import { BookData } from 'types/bookData';

const Contents = styled.div`
  margin-top: 1rem;
  padding: 0 2rem 2rem;
  overflow-y: auto;
  max-height: calc(100vh - 18rem);
`;

const BookList = styled.ul`
  li a {
    padding: 1rem 0;
    display: flex;
    gap: 1rem;
    border-bottom: 0.1rem solid #d5d5d5;

    img {
      width: 9rem;
      height: 11rem;
      border-radius: 0.8rem;
      object-fit: fill;
      box-shadow: var(--card_shadow);
    }

    .desc {
      width: calc(100% - 10rem);
      .title {
        margin: 0.6rem 0 0.4rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        -webkit-line-clamp: 2;
        line-height: 1.25;
      }

      .sub {
        word-break: break-word;
        font-size: 1.4rem;
        color: var(--gray78);
      }
    }
  }
`;

export default function SearchList() {
  // 검색어 가져오기
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const query = queryParams.get('q');
  const [resultBooks, setResultBooks] = useState<BookData[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setResultBooks([]); // 검색어 변경 시 기존 데이터 초기화
    setPage(1); // 페이지 번호 초기화
    setHasMore(true); // 데이터 추가 요청 가능 상태로 초기화
  }, [query]);

  const fetchBooks = async () => {
    if (!query || !hasMore) return;

    setLoading(true);

    try {
      const response = await fetch(
        // cors 오류로 heroku/api주소
        `
            https://tranquil-tundra-65213-03a93afc8c4f.herokuapp.com/http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${
              process.env.REACT_APP_TTB_KEY
            }&Query=${query}&QueryType=Title&MaxResults=10&start=${page}&SearchTarget=Book&Cover=Big&output=js&Version=20131101
        `
      );

      const data = await response.json();

      if (data.item.length === 0) {
        setHasMore(false); // 데이터 더 이상 없으면 false
      } else {
        setResultBooks((prev) => [...prev, ...data.item]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [page, query]);

  const onIntersect = () => {
    if (hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  const ref = useIntersect<HTMLDivElement>(onIntersect, {
    threshold: 0.5
  });

  return (
    <Contents className={`contents ${resultBooks.length > 0 ? '' : 'empty'}`}>
      {loading && !resultBooks.length ? (
        <Loading />
      ) : resultBooks.length > 0 ? (
        <>
          <BookList>
            {resultBooks?.map(
              (item) =>
                item.isbn13 && (
                  <li key={item.isbn13}>
                    <Link to={`/home/detail/${item.isbn13}`}>
                      <img src={item.cover} alt={item.title} />
                      <div className='desc'>
                        <p className='title'>{item.title}</p>
                        <div className='sub'>
                          <span>{item.author}</span> |{' '}
                          <span>{item.pubDate}</span>
                        </div>
                      </div>
                    </Link>
                  </li>
                )
            )}
          </BookList>
          {loading && <Loading />}
          <div ref={ref}></div>
        </>
      ) : (
        <div className='empty_text'>
          검색 결과가 없습니다.
          <br />
          검색어를 다시 확인해주세요 :&#41;
        </div>
      )}
    </Contents>
  );
}
