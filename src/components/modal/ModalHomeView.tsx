import styled from 'styled-components';
import Button from '../common/Button';
import RadioBtn from '../common/RadioBtn';
import ModalLayout from './ModalLayout';
import { ChangeEvent, useState } from 'react';
import Dropdown from 'components/common/Dropdown';
import { selectMonth, selectYear } from 'data/selectOption';

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
    display: flex;
    gap: 1rem;
  }
`;

export default function ModalHomeView({ isOpen, onClick }: ModalHomeProps) {
  const [isYear, setIsYear] = useState(false);

  const onChangeRadio = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === 'year') {
      setIsYear(true);
    } else {
      setIsYear(false);
    }
  };
  return (
    <ModalLayout isOpen={isOpen} onClose={onClick}>
      <Contents>
        <RadioBtn
          name='style'
          text='모든 도서 전체 보기'
          onChange={onChangeRadio}
          defaultChecked
        />
        <RadioBtn
          name='style'
          value='year'
          text='연도별로 보기'
          onChange={onChangeRadio}
        />
        {isYear && (
          <div className='select_wrap'>
            <Dropdown width='11.2rem' options={selectYear()} />
            <Dropdown width='11.2rem' options={selectMonth()} />
          </div>
        )}
      </Contents>
      <div className='btn_wrap'>
        <Button width={100} onClick={onClick}>
          확인
        </Button>
      </div>
    </ModalLayout>
  );
}
