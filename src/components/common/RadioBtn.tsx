import styled from 'styled-components';

const Radio = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  gap: 0.8rem;
  height: 2rem;

  input {
    display: none;
  }
  input:checked + .radiomark {
    background-image: url(${(props) => props.theme.radio});
  }
`;

interface RadioProps {
  name: string;
  text?: string;
  value?: string;
  defaultChecked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function RadioBtn({
  name,
  text,
  value,
  defaultChecked,
  onChange
}: RadioProps) {
  return (
    <Radio>
      <input
        type='radio'
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        onChange={onChange}
      />
      <span className='radiomark'></span>
      <span>{text}</span>
    </Radio>
  );
}
