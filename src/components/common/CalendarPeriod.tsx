import { useState } from 'react';
import Calendar from './Calendar';
import styled from 'styled-components';
import ModalLayout from 'components/modal/ModalLayout';
import { useModal } from 'hook/useModal';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default function CalendarPeriod() {
  const { isModalOpen, openModal, closeModal } = useModal();
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  //   날짜 비교
  const onChangeDate = (date: Date | null) => {
    if (!startDate || !date) return;

    if (startDate.getTime() > date.getTime()) {
      openModal('date-alert');
    } else {
      setEndDate(date);
    }
  };
  return (
    <Wrap>
      <Calendar
        text='시작일'
        selectedDate={startDate}
        setSelectedDate={setStartDate}
      />
      <Calendar
        text='종료일'
        selectedDate={endDate}
        setSelectedDate={onChangeDate}
      />

      {/* 기간 설정 오류 모달 */}
      <ModalLayout
        type='alert'
        message='종료일을 시작일보다 이전으로 선택해주세요.'
        isOpen={isModalOpen === 'date-alert'}
        onClose={closeModal}
      />
    </Wrap>
  );
}
