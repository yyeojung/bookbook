import SubHeader from 'components/common/SubHeader';
import { BookList } from 'components/page/home/TabBuild';
import { ThemeName, useThemeStore } from 'store/useThemeStore';
import icon from '../assets/image/character/book-icon-01.png';
import styled from 'styled-components';

const Wrap = styled.div`
  padding: 2rem;
  .img {
    text-align: center;
    margin-top: 2rem;

    img {
      width: 4rem;
      height: 4rem;
    }
  }

  ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem 0 4rem;

    li {
      font-size: 1.4rem;
      padding: 0.4rem 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .theme_btn {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;

    button {
      border: 0.1rem solid var(--grayD5);
      border-radius: 1rem;
      height: 10rem;
      width: calc(50% - 0.5rem);
      display: flex;
      gap: 1rem;
      justify-content: center;
      align-items: center;

      &::before {
        content: '';
        display: inline-block;
        border-radius: 50%;
        width: 2rem;
        height: 2rem;
        background: #e68a8d;
      }

      &.green::before {
        background: #82c9ab;
      }
      &.blue::before {
        background: #91bce0;
      }
      &.yellow::before {
        background: #ffd966;
      }

      &.active {
        border: 0.2rem solid ${(props) => props.theme.subColor03};
      }
    }
  }
`;

export default function Setting() {
  const { isTheme, setIsTheme } = useThemeStore();

  const buttonText: ThemeName[] = ['pink', 'green', 'blue', 'yellow'];

  const ThemeBook = [
    '선택한 테마를',
    '미리 만나볼 수 있어요.',
    '아래의 컬러 중',
    '하나를 선택해 보세요.'
  ];

  return (
    <>
      <SubHeader text='테마 설정' clear />
      <Wrap>
        <div className='img'>
          <img src={icon} alt='test' />
        </div>
        <BookList>
          {ThemeBook.map((book, index) => (
            <li key={index}>
              <span className='text_ellipsis'>{book}</span>
            </li>
          ))}
        </BookList>
        <div className='theme_btn'>
          {buttonText.map((color) => (
            <button
              className={`${color} ${isTheme === color ? 'active' : ''} `}
              onClick={() => setIsTheme(color)}
              key={color}
            >
              {color}
            </button>
          ))}
        </div>
      </Wrap>
    </>
  );
}
