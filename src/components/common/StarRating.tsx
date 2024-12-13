import { useState } from 'react';
import { Rating } from 'react-simple-star-rating';

interface StarProps {
  rating?: number;
}
export default function StarRating({ rating }: StarProps) {
  const [, setRating1] = useState(0);
  const handleRating1 = (rate: number) => {
    setRating1(rate);
  };
  return (
    <Rating
      onClick={handleRating1}
      size={25}
      transition
      allowFraction
      readonly={!!rating}
      initialValue={rating}
    />
  );
}
