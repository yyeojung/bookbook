import styled from 'styled-components';

interface ButtonProps {
  text?: string;
  width?: string;
  height?: string;
  className?: string;
}

const CustomBtn = styled.button`
  background: ${(props) => props.theme.currentTheme.subColor03};
  min-width: 7rem;
  height: 4rem;
  border-radius: 0.8rem;
  color: #fff;
  font-weight: 800;
`;
export default function Button({
  text,
  width,
  height,
  className
}: ButtonProps) {
  return (
    <CustomBtn className={className} style={{ width: width, height: height }}>
      {text}
    </CustomBtn>
  );
}
