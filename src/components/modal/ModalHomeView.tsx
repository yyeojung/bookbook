import styled from 'styled-components';
import Button from '../common/Button';
import RadioBtn from '../common/RadioBtn';
import ModalLayout from './ModalLayout';
import { ChangeEvent, FormEvent, useState } from 'react';
import Dropdown from 'components/common/Dropdown';
import { selectMonth, selectYear } from 'data/selectOption';
import { useViewStore } from 'store/useViewStore';
import { useSelectStore } from 'store/useSelectStore';

interface ModalHomeProps {
  isOpen: boolean;
  onClick: () => void;
}

const Contents = styled.div`
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  align-items: start;

  .select_wrap {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 1rem;
  }
`;

export default function ModalHomeView({ isOpen, onClick }: ModalHomeProps) {
  const { isView, setIsView } = useViewStore();
  const [isYear, setIsYear] = useState(isView);
  const { selectOption, setSelectOption } = useSelectStore();

  const onChangeRadio = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIsYear(value);

    if (value === 'year') {
      // 드롭다운 상태 초기화
      if (!selectOption.find((opt) => opt.name === 'year')) {
        setSelectOption('year', selectYear()[0].value);
      }
      if (!selectOption.find((opt) => opt.name === 'month')) {
        setSelectOption('month', selectMonth()[0].value);
      }
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isYear === 'year') {
      setIsView('year');
    } else {
      setIsView('all');
    }
    onClick();
  };

  return (
    <ModalLayout isOpen={isOpen} onClose={onClick}>
      <form onSubmit={onSubmit}>
        <Contents>
          <RadioBtn
            name='view'
            value='all'
            text='모든 도서 전체 보기'
            onChange={onChangeRadio}
            defaultChecked={isYear === 'all'}
          />
          <RadioBtn
            name='view'
            value='year'
            text='연도별로 보기'
            onChange={onChangeRadio}
            defaultChecked={isYear === 'year'}
          />
          {isYear === 'year' && (
            <div className='select_wrap'>
              <Dropdown name='year' width='11.2rem' options={selectYear()} />
              <Dropdown name='month' width='11.2rem' options={selectMonth()} />
            </div>
          )}
        </Contents>
        <div className='btn_wrap'>
          <Button type='submit' width={100}>
            확인
          </Button>
        </div>
      </form>
    </ModalLayout>
  );
}
