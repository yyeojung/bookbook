import { useLibraryStore } from 'store/useLibraryStore';
import { useSelectStore } from 'store/useSelectStore';
import { useViewStore } from 'store/useViewStore';

export const useReadBook = () => {
  const { books } = useLibraryStore();
  const { isView } = useViewStore();
  const { selectOption } = useSelectStore();

  const selectYear = selectOption.filter((opt) => opt.name === 'year');
  const selectMonth = selectOption.filter((opt) => opt.name === 'month');

  const readBooks = books.filter((book) => book.bookState === true);
  const readingBooks = books.filter((book) => book.bookState === false);

  // 책 필터링
  const filterBooks = readBooks.filter((book) => {
    if (!book.endDate) return false;

    if (isView === 'all') {
      return true;
    }

    const bookDate = new Date(book.endDate);
    const bookYear = bookDate.getFullYear();
    const bookMonth = bookDate.getMonth() + 1;

    if (selectMonth[0].value === '전체') {
      return bookYear === Number(selectYear[0].value);
    }

    return (
      bookYear === Number(selectYear[0].value) &&
      bookMonth === Number(selectMonth[0].value)
    );
  });

  return { readBooks, readingBooks, filterBooks };
};
