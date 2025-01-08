// 상품 조회 데이터
export interface BookData {
  bookId: string;
  title: string;
  author: string;
  cover: string;
  description: string;
  isbn: string;
  isbn13: string;
  link: string;
  publisher: string;
  pubDate?: string;
  subInfo?: {
    itemPage: number;
  };
}

// 서재 저장 데이터
export interface LibraryData {
  books: LibraryBook[];
  addBook: (data: LibraryBook) => void;
  deleteBook: (bookId: string) => void;
}
export interface LibraryBook extends BookData {
  bookState: boolean;
  startDate?: Date | null;
  pagePercent?: boolean;
  endDate?: Date | null;
  starRating?: number | undefined;
  review?: string | null;
  pageNum?: number;
  itemPage?: number;
}
