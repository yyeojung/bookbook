import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';

const TextBox = styled.div`
  width: 100%;
  height: 21rem;
  padding: 1.6rem;
  border: 0.1rem solid var(--grayD5);
  background: #fff;
  border-radius: 0.8rem;
  position: relative;

  textarea {
    outline: none;
    resize: none;
    width: 100%;
    height: 100%;
  }
  textarea::-webkit-input-placeholder {
    color: var(--grayA3);
  }

  .limit {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    color: var(--gray78);
  }
`;

interface TextProps {
  placeholder?: string;
  maxLength?: number;
}

export default function Textarea({ placeholder, maxLength }: TextProps) {
  const [text, setText] = useState('');

  const onChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  return (
    <TextBox>
      <textarea
        onChange={onChangeText}
        maxLength={maxLength && maxLength}
        placeholder={placeholder}
      ></textarea>
      {maxLength && (
        <p className='limit'>
          {text.length}/{maxLength}
        </p>
      )}
    </TextBox>
  );
}
