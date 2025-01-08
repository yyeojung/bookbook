import Button from 'components/common/Button';
import Calendar from 'components/common/Calendar';
import CalendarPeriod from 'components/common/CalendarPeriod';
import Dropdown from 'components/common/Dropdown';
import RadioBtn from 'components/common/RadioBtn';
import StarRating from 'components/common/StarRating';
import SubHeader from 'components/common/SubHeader';
import ModalLayout from 'components/modal/ModalLayout';
import { selectYearData } from 'data/selectOption';
import { useModal } from 'hook/useModal';
import { useReadBook } from 'hook/useReadBook';
import { useState } from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  background: #e1dede;
  h3 {
    padding-top: 2rem;
  }
`;
const Flex = styled.div`
  display: flex;
  gap: 1rem;
`;

export default function Styleguide() {
  const { isModalOpen, openModal, closeModal } = useModal();
  const [rating, setRating] = useState(0);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const { selectYear } = useReadBook();

  // rating
  const onChangeRating = (rate: number) => {
    setRating(rate);
  };
  const [selectDate, setSelectDate] = useState<Date | null>(null);

  const sampleOption = [
    { value: '전체', label: '전체' },
    { value: '딸기', label: '딸기' },
    { value: '홍시', label: '홍시' },
    { value: '초콜릿', label: '초콜릿' },
    { value: '나쵸', label: '나쵸' },
    { value: '피자', label: '피자' }
  ];

  return (
    <Wrap>
      {/* button */}
      <h3>button</h3>
      <Flex>
        <Button>button</Button>
        <Button className='gray'>button</Button>
      </Flex>

      {/* star rating */}
      <h3>star rating</h3>
      <div>
        <StarRating rating={rating} onChangeRating={onChangeRating} />
      </div>
      <StarRating readonly rating={3} />

      {/* sub header */}
      <h3>sub header</h3>
      <SubHeader text='제목' onClick={() => console.log('sub')} />

      {/* form */}
      <h3>form</h3>
      <Dropdown
        name='sample'
        width='30rem'
        options={sampleOption}
        defaultValue={sampleOption[0]}
      />
      <Dropdown
        name='sample'
        width='30rem'
        options={selectYearData()}
        defaultValue={selectYear}
      />
      <Calendar selectedDate={selectDate} setSelectedDate={setSelectDate} />
      <CalendarPeriod
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />

      {/* radio */}
      <h3>radio</h3>
      <Flex>
        <RadioBtn name='style' />
        <RadioBtn name='style' defaultChecked />
        <RadioBtn name='style' text='text' />
      </Flex>

      {/* modal */}
      <h3>modal</h3>
      <Flex>
        <Button onClick={() => openModal('style-alert')}>alert</Button>
        <Button onClick={() => openModal('style-confirm')}>confirm</Button>
        <Button onClick={() => openModal('style-modal')}>modal</Button>
      </Flex>
      <ModalLayout
        type='alert'
        message='alert입니더'
        isOpen={isModalOpen === 'style-alert'}
        onClose={closeModal}
      />
      <ModalLayout
        type='confirm'
        message='confirm입니더'
        isOpen={isModalOpen === 'style-confirm'}
        onClose={closeModal}
        onClick={() => console.log('click')}
      />
      <ModalLayout
        isOpen={isModalOpen === 'style-modal'}
        onClose={closeModal}
      />
    </Wrap>
  );
}
