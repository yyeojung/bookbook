import { Rating } from 'react-simple-star-rating';
import styled from 'styled-components';

interface StarProps {
  rating: number | undefined;
  size?: number;
  readonly?: boolean;
  className?: string;
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
  className,
  onChangeRating
}: StarProps) {
  const onClickRating = (rate: number) => {
    if (!readonly && onChangeRating) {
      onChangeRating(rate);
    }
  };

  return (
    <StyledRating
      className={`${className ? className : ''} ${readonly ? 'readonly' : ''}`}
      onClick={onClickRating}
      size={size ? size : 25}
      transition
      allowFraction
      initialValue={rating}
    />
  );
}
