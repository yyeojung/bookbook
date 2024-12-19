import icon1 from '../assets/image/character/book-icon-01.png';
import icon2 from '../assets/image/character/book-icon-02.png';
import icon3 from '../assets/image/character/book-icon-03.png';
import icon4 from '../assets/image/character/book-icon-04.png';
import icon5 from '../assets/image/character/book-icon-05.png';
import icon6 from '../assets/image/character/book-icon-06.png';
import icon7 from '../assets/image/character/book-icon-07.png';
import icon8 from '../assets/image/character/book-icon-08.png';

export const homeIcon = (height: number) => {
  if (height < 10) {
    return icon1;
  } else if (height > 10 && height < 20) {
    return icon2;
  } else if (height > 20 && height < 30) {
    return icon3;
  } else if (height > 30 && height < 40) {
    return icon4;
  } else if (height > 40 && height < 50) {
    return icon5;
  } else if (height > 50 && height < 60) {
    return icon6;
  } else if (height > 70 && height < 80) {
    return icon7;
  } else {
    return icon8;
  }
};
