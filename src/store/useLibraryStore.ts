import { LibraryData } from 'types/bookData';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 데이터 유지: persist 추가 (로컬스토리지에 저장)

const useLibraryStore = create<LibraryData>()(
  persist(
    (set) => ({
      books: [],
      addBook: (data) =>
        set((state) => ({
          books: [
            ...state.books,
            {
              bookId: data.bookId,
              bookState: data.bookState,
              startDate: data.startDate,
              endDate: data.endDate,
              starRating: data.starRating,
              review: data.review,
              pagePercent: data.pagePercent,
              pageNum: data.pageNum,
              // 책 정보
              title: data.title,
              cover: data.cover,
              author: data.author,
              itemPage: data.itemPage,
              link: data.link,
              description: data.description,
              publisher: data.publisher,
              isbn: data.isbn,
              isbn13: data.isbn13
            }
          ]
        })),
      deleteBook: (bookId: string) =>
        set((state) => ({
          books: state.books.filter((book) => book.bookId !== bookId)
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
