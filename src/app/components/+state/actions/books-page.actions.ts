import { createAction, props } from '@ngrx/store';
import { Book } from 'src/app/models/book';
import { BooksRequestParams } from 'src/app/models/books-request-params';

export const getBooksList = createAction(
    '[App / Books Page] Get Books List'
);

export const getBooksListByPageAndSort = createAction(
    '[App / Books Page] Get Books list by page and sort',
    props<{ booksRequestParams:  BooksRequestParams}>()
);

export const openToAddBookModal = createAction(
    '[App / Books Page] Open Add Book Modal'
);

export const addBook = createAction(
  '[App / Books Page]  Add Book ',
  props<{ newBook: Book }>()
);

export const viewBookDetails = createAction(
  '[App / Books Page]  View Book Details',
  props<{ bookId: string }>()
);

