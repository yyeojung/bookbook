import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LibraryData {
  books: LibraryBook[];
  addBook: (data: LibraryBook) => void;
  deleteBook: (bookId: string) => void;
}

interface LibraryBook {
  bookState: boolean;
  id: string;
  startDate: string;
  pagePercent?: boolean;
  endDate?: string | null;
  starRating?: number | null;
  review?: string | null;
  pageNum?: number | null;
}

// 데이터 유지: persist 추가 (로컬스토리지에 저장)

const useLibraryStore = create<LibraryData>()(
  persist(
    (set) => ({
      books: [],
      addBook: (data: LibraryBook) =>
        set((state) => ({
          books: [
            ...state.books,
            {
              bookState: data.bookState,
              id: data.id,
              startDate: data.startDate,
              endDate: data.bookState ? data.endDate : null,
              starRating: data.bookState ? data.starRating : null,
              review: data.bookState ? data.review : null,
              pagePercent: data.pagePercent,
              pageNum: !data.bookState ? data.pageNum : null
            }
          ]
        })),
      deleteBook: (bookId: string) =>
        set((state) => ({
          books: state.books.filter((book) => book.id !== bookId)
        }))
    }),
    { name: 'library' } // 로컬 스토리지에 'library'라는 키로 저장
  )
);

export { useLibraryStore };

// let libraryStore = (set) => ({
//   books: [],
//   addBook: (data: LibraryBook) =>
//     set((state: LibraryData) => ({
//       books: [
//         ...state.books,
//         {
//           bookState: data.bookState,
//           id: data.id,
//           startDate: data.startDate,
//           endDate: data.bookState === 'finish' ? data.endDate : null,
//           starRating: data.bookState === 'finish' ? data.starRating : null,
//           review: data.bookState === 'finish' ? data.review : null,
//           pageNum: data.bookState !== 'finish' ? data.pageNum : null
//         }
//       ]
//     })),
//   deleteBook: (bookId: string) =>
//     set((state: LibraryData) => ({
//       books: state.books.filter((book) => book.id !== bookId)
//     }))
// });

// libraryStore = persist(libraryStore, { name: 'library' });

// export const useLibraryStore = create<LibraryData>(libraryStore);
