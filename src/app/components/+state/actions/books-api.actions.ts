import { createAction, props } from "@ngrx/store";
import { Book } from "src/app/models/book";
import { BooksResponseData } from "src/app/models/books-response-data";


export const getBooksListSuccess = createAction(
    '[App / Books API] Get Books List Success',
    props<{
      booksList: Book[];
    }>()
  );

  export const getBooksListByPageAndSortSuccess = createAction(
    '[App / Books API] Get Books List by page and sort Success',
    props<{
      booksResponseData: BooksResponseData
    }>()
  );
  
  export const getBooksListByPageAndSortFailure = createAction(
    '[App / Books API] Get Books List by page and sort Failure',
    props<{ error: unknown }>()
  );
  
  export const getBooksListFailure = createAction(
    '[App / Books API] Get Books List Failure',
    props<{ error: unknown }>()
  );

  export const addBookSuccess = createAction(
    '[App / Books API] Add Book Success ',
    props<{ newBook: Book }>()
  );
  
  export const addBookFailure = createAction(
    '[App / Books API] Add Book Failure ',
    props<{ error: unknown }>()
  );
  
  export const viewBookDetailsSuccess = createAction(
    '[App / Books Page]  View Book Details Success',
    props<{ bookDetails: Book }>()
  )

  export const viewBookDetailsFailure= createAction(
    '[App / Books Page]  View Book Details Failure',
    props<{ error: unknown }>()
  )