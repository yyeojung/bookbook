import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  width?: number;
  children?: React.ReactNode;
}

const CustomBtn = styled.button`
  background: ${(props) => props.theme.subColor03};
  min-width: 7rem;
  height: 4rem;
  border-radius: 0.8rem;
  color: #fff;
  font-weight: 800;

  &.gray {
    background: var(--grayA3);
  }
`;

export default function Button({
  text,
  children,
  width,
  ...props
}: ButtonProps) {
  return (
    <CustomBtn style={{ width: width }} {...props}>
      {text}
      {children}
    </CustomBtn>
  );
}
