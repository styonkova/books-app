import { Injectable } from "@angular/core";

import { Store } from "@ngrx/store";
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';

import { catchError, filter, map, mergeMap, of, switchMap, tap } from "rxjs";
import { BooksService } from "src/app/services/books.service";
import { BooksApiActions, BooksPageActions } from "./actions";
import { MatDialog } from "@angular/material/dialog";
import { BookAddComponent } from "../book-add/book-add.component";
import { selectBooksRequestParams } from ".";
import { BookViewComponent } from "../book-view/book-view.component";

@Injectable()
export class BooksEffects {
  constructor(
    private actions$: Actions,
    private booksService: BooksService,
    private store: Store,
    private dialogRef: MatDialog
  ) {}

  
  getBooksListWidthPaginator$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BooksPageActions.getBooksListByPageAndSort, BooksApiActions.addBookSuccess),
      concatLatestFrom(() => this.store.select(selectBooksRequestParams)),
      mergeMap(([type, booksRequestParams]) => {
        return this.booksService.getBooksList(booksRequestParams).pipe(
          map((booksResponseData) => {
            return  BooksApiActions.getBooksListByPageAndSortSuccess({
              booksResponseData
            })
          }
 
          ),
          catchError((error: unknown) =>
            of(
              BooksApiActions.getBooksListByPageAndSortFailure({
                error,
              })
            )
          )
        );
      })
    );
  });

  openAddBookModal$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(BooksPageActions.openToAddBookModal),
        tap(() => {
          this.dialogRef.open(BookAddComponent, {
            width: '550px',
            autoFocus: false,
            panelClass: 'app-add-modal',
          });
        })
      );
    },

    {
      dispatch: false,
    }
  );

  addBook$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BooksPageActions.addBook),
      mergeMap(({newBook}) =>
      this.booksService.addBook(newBook).pipe(
          map((newBook) =>
          BooksApiActions.addBookSuccess({
              newBook,
            })
          ),
          catchError((error: unknown) =>
          of(
            BooksApiActions.addBookFailure({
              error,
            })
          )
        )
        )
      )
    );
  });

  closeModalDialog$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BooksApiActions.addBookSuccess),
      tap(() => {
        this.dialogRef.closeAll();
      }),
      switchMap(() => of(BooksPageActions.getBooksList()))
    );
  });

  getChatDetails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BooksPageActions.viewBookDetails),
      filter(({ bookId }) => !!bookId),
      mergeMap(({bookId}) => {
        return this.booksService.getBookById(bookId).pipe(
          map((bookDetails) =>
          BooksApiActions.viewBookDetailsSuccess({
            bookDetails,
            })
          ),
          catchError((error: unknown) =>
            of(
              BooksApiActions.viewBookDetailsFailure({
                error,
              })
            )
          )
        );
      })
    );
  });

  openViewBookModal$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(BooksApiActions.viewBookDetailsSuccess),
        tap(({bookDetails}) => {
          this.dialogRef.open(BookViewComponent, {
            width: '550px',
            autoFocus: false,
            panelClass: 'app-view-modal',
            data: bookDetails
          });
        })
      );
    },

    {
      dispatch: false,
    }
  );

}