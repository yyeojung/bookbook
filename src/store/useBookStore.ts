import { BookData } from 'types/bookData';
import { create } from 'zustand';

interface BookStore {
  bookData: BookData[] | null;
  fetchBookData: (isbn: string) => Promise<void>;
}

// 책 정보 조회 api

const useBookStore = create<BookStore>((set) => ({
  bookData: null,
  fetchBookData: async (isbn) => {
    try {
      const response = await fetch(
        `
                  http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?ttbkey=${
                    process.env.REACT_APP_TTB_KEY
                  }&itemIdType=ISBN13&ItemId=${isbn}&output=js&Version=20131101
              `
      );

      const data = await response.json();
      set({ bookData: data.item });
    } catch (error) {
      console.log(error);
    }
  }
}));

export default useBookStore;
