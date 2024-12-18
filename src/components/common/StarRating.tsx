import { Rating } from 'react-simple-star-rating';
import styled from 'styled-components';

interface StarProps {
  rating: number;
  size?: number;
  readonly?: boolean;
  onChangeRating?: (rating: number) => void;
}

const StyledRating = styled(Rating)`
  &.readonly {
    pointer-events: none;
  }
`;

export default function StarRating({
  rating,
  size,
  readonly,
  onChangeRating
}: StarProps) {
  const onClickRating = (rate: number) => {
    if (!readonly && onChangeRating) {
      onChangeRating(rate);
    }
  };

  return (
    <StyledRating
      className={readonly ? 'readonly' : ''}
      onClick={onClickRating}
      size={size ? size : 25}
      transition
      allowFraction
      initialValue={rating}
    />
  );
}
