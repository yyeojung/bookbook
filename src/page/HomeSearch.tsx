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

const Wrap = styled.div``;

export default function HomeSearch() {
  // 검색어 가져오기
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
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
        `
            https://cors-anywhere.herokuapp.com/http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${
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
  console.log(resultBooks);

  const navigate = useNavigate();

  const onClickBack = () => {
    navigate(-1);
  };

  return (
    <Wrap>
      <SubHeader text='책 검색' onClick={onClickBack} />
      <SearchBook />
      {loading ? (
        <p>로딩중</p>
      ) : (
        <ul>
          {resultBooks?.map((item) => (
            <li key={item.itemId}>
              <img src={item.cover} alt={item.title} />
              <p>{item.title}</p>
              <div>
                <span>{item.author}</span>
                <span>{item.pubDate}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Wrap>
  );
}
