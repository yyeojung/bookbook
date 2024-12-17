import SubHeader from 'components/common/SubHeader';
import SearchBook from 'components/page/home/SearchBook';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface BookTypes {
  itemId: string;
  title: string;
  author: string;
  cover: string;
  pubDate: string;
}

const Wrap = styled.div`
  .contents_wrap {
    padding: 1rem 2rem 2rem;
  }
  .contents {
    padding: 1rem 0 8rem;
    min-height: calc(100vh - 17rem);

    ul li {
      cursor: pointer;
    }
  }
`;

const BookList = styled.ul`
  li {
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

export default function HomeSearch() {
  // 검색어 가져오기
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const query = queryParams.get('q');
  const [resultBooks, setResultBooks] = useState<BookTypes[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, [query]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        // cors 오류로 heroku/api주소
        `
            https://tranquil-tundra-65213-03a93afc8c4f.herokuapp.com/http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${
              process.env.REACT_APP_TTB_KEY
            }&Query=${query}&QueryType=Title&MaxResults=10&start=1&SearchTarget=Book&Cover=Big&output=js&Version=20131101
        `
      );

      const data = await response.json();
      setResultBooks(data.item);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  const onClickHome = () => {
    navigate('/home');
  };

  return (
    <Wrap>
      <SubHeader text='책 검색' onClick={onClickHome} />
      <div className='contents_wrap'>
        <SearchBook />
        <div className={`contents ${resultBooks.length > 0 ? '' : 'empty'}`}>
          {loading ? (
            <p>로딩중</p>
          ) : resultBooks.length > 0 ? (
            <BookList>
              {resultBooks?.map((item) => (
                <li key={item.itemId}>
                  <img src={item.cover} alt={item.title} />
                  <div className='desc'>
                    <p className='title'>{item.title}</p>
                    <div className='sub'>
                      <span>{item.author}</span> | <span>{item.pubDate}</span>
                    </div>
                  </div>
                </li>
              ))}
            </BookList>
          ) : (
            <div className='empty_text'>
              검색 결과가 없습니다.
              <br />
              검색어를 다시 확인해주세요 :&#41;
            </div>
          )}
        </div>
      </div>
    </Wrap>
  );
}
