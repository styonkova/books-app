import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BooksState } from "./books.reducer";
import { BooksRequestParams } from "src/app/models/books-request-params";

export const selectBooksState =
  createFeatureSelector<BooksState>('booksApp');

export const selectBooksRequestParams = createSelector(
  selectBooksState,
    ({ booksRequestParams }) => {
      const defaultParams: BooksRequestParams = {
        pageSize: 5,
        page: 1,
        sortBy: 'author',
        sortDirection: 'asc',
        filter: ''
      }
      booksRequestParams = {...defaultParams, ...booksRequestParams}
      return booksRequestParams
    }
);

export const selectBooksList = createSelector(
  selectBooksState,
    ({ booksResponseData }) => {
      return booksResponseData
    }
);
