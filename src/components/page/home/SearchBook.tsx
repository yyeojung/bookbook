import styled from 'styled-components';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from 'components/common/Button';
import { IoIosCloseCircle } from 'react-icons/io';
const Form = styled.form`
  display: flex;
  gap: 1rem;
`;
const InputWrap = styled.div`
  width: 100%;
  position: relative;

  input {
    background: var(--grayF2);
    height: 4rem;
    border-radius: 0.8rem;
    padding: 1rem 1.6rem;
    width: 100%;
  }

  button {
    position: absolute;
    top: 1rem;
    right: 1.4rem;

    svg {
      width: 2rem;
      height: 2rem;
      fill: #8f8f8f;
    }
  }

  &::placeholder {
    color: var(--gray78);
    height: 4rem;
  }
`;

export default function SearchBook() {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const query = queryParams.get('q');

  //   query가 있을 때 input 기본값으로
  useEffect(() => {
    if (query) {
      setSearchValue(query);
    }
  }, []);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchValue === '') {
      alert('내용 입력해주쇼');
    } else {
      navigate(`/home/search?q=${searchValue}`);
    }
  };

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  // 검색어 삭제 이벤트
  const onClickRemove = () => {
    setSearchValue('');
  };
  return (
    <Form onSubmit={onSubmit}>
      <InputWrap>
        <input
          type='text'
          placeholder='책 검색하기'
          onChange={onChangeInput}
          value={searchValue}
        />
        <button type='button' onClick={onClickRemove}>
          <IoIosCloseCircle />
          <span className='sr_only'>닫기</span>
        </button>
      </InputWrap>
      <Button type='submit' text='검색' />
    </Form>
  );
}
