import Select, { SingleValue } from 'react-select';
import { useSelectStore } from 'store/useSelectStore';
import styled from 'styled-components';

interface Option {
  label: string;
  value: string;
}
interface DropdownProps {
  options: Option[];
  width?: string;
  defaultValue: Option;
  name: string;
}
const StyledSelect = styled(Select<Option>)<{ width?: string }>`
  width: ${(props) => props.width || '100%'};
  height: 4rem;
  // 드롭다운 박스
  .custom__control {
    border: 0.1rem solid #d5d5d5;
    border-radius: 0.8rem;
    font-weight: 600;
    box-shadow: none;

    .custom__value-container {
      padding: 0 0.8rem;
    }
    &:hover,
    &.custom__control---is-focused {
      box-shadow: none;
      border-color: #d5d5d5;
    }
  }

  // 화살표
  .custom__indicator-separator {
    display: none;
  }
  .custom__indicator {
    color: #575757;
  }

  // 드롭다운 옵션
  .custom__menu {
    margin-top: 0.4rem;
    border-radius: 0.8rem;
    border: 0.1rem solid #d5d5d5;
    box-shadow: 0 1rem 2rem 0 rgba(0, 0, 0, 0.08);
    font-weight: 600;

    .custom__menu-list {
      max-height: 16rem;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      padding: 1rem;
    }

    .custom__option {
      color: var(--textColor);
      border-radius: 0.8rem;
      text-align: center;

      &.custom__option--is-selected {
        background: ${(props) => props.theme.mainColor};
      }
      &.custom__option--is-focused {
        background: ${(props) => props.theme.subColor01};
      }
    }
  }
`;

export default function Dropdown({
  defaultValue,
  options,
  width,
  name
}: DropdownProps) {
  const { setSelectOption } = useSelectStore();

  return (
    <StyledSelect
      options={options}
      isSearchable={false} // 검색 기능 비활성화
      // menuIsOpen={true} 메뉴 항상 오픈
      classNamePrefix='custom'
      defaultValue={{ value: defaultValue.value, label: defaultValue.value }}
      width={width}
      name={name}
      onChange={(option: SingleValue<Option>) => {
        setSelectOption(name, option?.value || '');
      }}
    />
  );
}
