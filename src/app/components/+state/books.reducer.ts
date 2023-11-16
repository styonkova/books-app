import { createReducer, on } from "@ngrx/store";
import { BooksApiActions, BooksPageActions } from "./actions";
import { BooksRequestParams } from "src/app/models/books-request-params";
import { Book } from "src/app/models/book";
import { BooksResponseData } from "src/app/models/books-response-data";

export interface BooksState {
  booksRequestParams: BooksRequestParams;
  booksResponseData: BooksResponseData;
  bookDetails: Book;
  error: unknown;
  }
  
export const initialState: BooksState = {
  booksRequestParams: {} as BooksRequestParams,
  booksResponseData: {} as BooksResponseData,
  bookDetails: {} as Book,
  error: ''
};

export const booksReducer = createReducer(
    initialState,
    on(
      BooksPageActions.getBooksListByPageAndSort,
        (state, { booksRequestParams }): BooksState => {
          return {
            ...state,
            booksRequestParams
          };
        }
      ),
    on(
      BooksApiActions.getBooksListByPageAndSortSuccess,
        (state, { booksResponseData }): BooksState => {
          return {
            ...state,
            booksResponseData,
            error: '',
          };
        }
      ),
      on(
        BooksApiActions.getBooksListByPageAndSortFailure,
        (state, { error }): BooksState => {
          return {
            ...state,
            booksResponseData: {} as BooksResponseData,
            error,
          };
        }
      ),
      on(
        BooksApiActions.viewBookDetailsSuccess,
          (state, { bookDetails }): BooksState => {
            return {
              ...state,
              bookDetails,
              error: '',
            };
          }
        ),
        on(
          BooksApiActions.viewBookDetailsFailure,
          (state, { error }): BooksState => {
            return {
              ...state,
              bookDetails: {} as Book,
              error,
            };
          }
        ),

)