import { useLibraryStore } from 'store/useLibraryStore';
import { useSelectStore } from 'store/useSelectStore';
import { useViewStore } from 'store/useViewStore';

export const useReadBook = () => {
  const { books } = useLibraryStore();
  const { isView } = useViewStore();
  const { selectOption } = useSelectStore();

  const currentYear = new Date().getFullYear();
  const defaultYear = { label: 'year', value: String(currentYear) };
  const defaultMonth = { label: 'month', value: '전체' };

  const selectYear =
    selectOption.filter((opt) => opt.label === 'year')[0] || defaultYear;
  const selectMonth =
    selectOption.filter((opt) => opt.label === 'month')[0] || defaultMonth;

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

    if (selectMonth.value === '전체') {
      return bookYear === Number(selectYear.value);
    }

    return (
      bookYear === Number(selectYear.value) &&
      bookMonth === Number(selectMonth.value)
    );
  });

  return { selectYear, selectMonth, readBooks, readingBooks, filterBooks };
};
