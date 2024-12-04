import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

const CustomBtn = styled.button`
  background: ${(props) => props.theme.currentTheme.subColor03};
  min-width: 7rem;
  height: 4rem;
  border-radius: 0.8rem;
  color: #fff;
  font-weight: 800;
`;

export default function Button({ text, ...props }: ButtonProps) {
  return <CustomBtn {...props}>{text}</CustomBtn>;
}
