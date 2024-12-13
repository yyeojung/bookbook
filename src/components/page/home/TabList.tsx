import StarRating from 'components/common/StarRating';
import styled from 'styled-components';

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
    // 추후 .img 삭제
    .img,
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
  }
`;

export default function TabList() {
  return (
    <BookList>
      <li>
        <div className='img'></div>
        {/* <img src='' alt='' /> */}
        <p className='title text_ellipsis'>
          책이름책이름책이름책이름책이름책이름책이름책이름
        </p>
        <p className='sub_title mt_4'>자가 이름</p>
        <StarRating rating={3} />
      </li>
      <li>
        <div className='img'></div>
        {/* <img src='' alt='' /> */}
        <p className='title text_ellipsis'>
          책이름책이름책이름책이름책이름책이름책이름책이름
        </p>
        <p className='sub_title mt_4'>자가 이름</p>
        <StarRating rating={4} />
      </li>
      <li>
        <div className='img'></div>
        {/* <img src='' alt='' /> */}
        <p className='title text_ellipsis'>
          책이름책이름책이름책이름책이름책이름책이름책이름
        </p>
        <p className='sub_title mt_4'>자가 이름</p>
        <StarRating rating={2} />
      </li>
      <li>
        <div className='img'></div>
        {/* <img src='' alt='' /> */}
        <p className='title text_ellipsis'>
          책이름책이름책이름책이름책이름책이름책이름책이름
        </p>
        <p className='sub_title mt_4'>자가 이름</p>
        <StarRating rating={2.5} />
      </li>
    </BookList>
  );
}
