import StarRating from 'components/common/StarRating';
import styled from 'styled-components';
import dummyIng from '../../../assets/image/dummyIng.png';

const BookList = styled.ul`
  display: flex;
  gap: 1.4rem;
  flex-wrap: wrap;
  li {
    width: calc((100% - 2.8rem) / 3);
    cursor: pointer;

    @media (min-width: 500px) {
      width: calc((100% - 4.2rem) / 4);
    }
    img {
      background: #ccc; // 삭제
      height: 13rem;
      border-radius: 0.8rem;
      object-fit: fill;
      box-shadow: var(--card_shadow);
      @media (min-width: 500px) {
        height: 14rem;
      }
    }

    .title {
      margin-top: 0.6rem;
      max-width: 100%;
    }

    @media (max-width: 420px) {
      .star-svg {
        width: 2rem;
        height: 2rem;
      }
    }
  }
`;

export default function TabList() {
  return (
    <BookList>
      <li>
        <img src={dummyIng} alt='dummy' />
        <p className='title text_ellipsis'>
          책이름책이름책이름책이름책이름책이름책이름책이름
        </p>
        <p className='sub_title mt_4'>자가 이름</p>
        <StarRating readonly rating={3} />
      </li>
      <li>
        <img src={dummyIng} alt='dummy' />
        <p className='title text_ellipsis'>
          책이름책이름책이름책이름책이름책이름책이름책이름
        </p>
        <p className='sub_title mt_4'>자가 이름</p>
        <StarRating readonly rating={4} />
      </li>
      <li>
        <img src={dummyIng} alt='dummy' />
        <p className='title text_ellipsis'>
          책이름책이름책이름책이름책이름책이름책이름책이름
        </p>
        <p className='sub_title mt_4'>자가 이름</p>
        <StarRating readonly rating={2} />
      </li>
      <li>
        <img src={dummyIng} alt='dummy' />
        <p className='title text_ellipsis'>
          책이름책이름책이름책이름책이름책이름책이름책이름
        </p>
        <p className='sub_title mt_4'>자가 이름</p>
        <StarRating readonly rating={2.5} />
      </li>
    </BookList>
  );
}
