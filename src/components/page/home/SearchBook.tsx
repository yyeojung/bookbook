import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'components/common/Button';

const Form = styled.form`
  display: flex;
  gap: 1rem;
`;
const Input = styled.input`
  background: ${(props) => props.theme.colors.grayF2};
  height: 4rem;
  border-radius: 0.8rem;
  padding: 1rem 1.6rem;
  width: 100%;

  &::placeholder {
    color: ${(props) => props.theme.colors.gray78};
  }
`;

export default function SearchBook() {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchValue === '') {
      alert('내용 입력해주쇼');
    } else {
      navigate(`/home/search?q=${searchValue}`);
    }
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  return (
    <Form onSubmit={onSubmit}>
      <Input
        type='text'
        placeholder='책 검색하기'
        onChange={onChangeInput}
        value={searchValue}
      />
      <Button type='submit' text='검색' />
    </Form>
  );
}
