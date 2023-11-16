import { BookDescription } from "./book-description";

export interface Book {
    id: string | undefined;
    title: string;
    author: string;
    isbn: string;
    bookCover: string;
    descriptions?: BookDescription[] | undefined;

  }
  