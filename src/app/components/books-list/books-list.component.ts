import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { BooksRequestParams } from 'src/app/models/books-request-params';
import { BooksPageActions } from '../+state/actions';
import { selectBooksList } from '../+state';
import { SortColumns } from 'src/app/enums/sort-culumns';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Book } from 'src/app/models/book';
import { Sort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { BooksResponseData } from 'src/app/models/books-response-data';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})

export class BooksListComponent implements OnInit {

  columnsNames = SortColumns;
  displayedColumns: string[] = [
    SortColumns.Title,
    SortColumns.Author,
    SortColumns.ISBN,
    'actions',
  ];

  dataSource = new MatTableDataSource<Book>();
  getBooksList$ = new Observable<BooksResponseData>();
  searchedText: FormControl = new FormControl('')

  // Paginator
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSizeOptions: number[] = [5, 10, 25];
  totalItems = 0;

  //default params for books result
  requestParams: BooksRequestParams = {
    page: 1,
    pageSize: this.pageSizeOptions[0],
    sortBy: 'author',
    sortDirection: 'asc',
    filter: ''
  }

  get searchedTextControl() {
    return this.searchedText.value as string;
  }

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.dispatchGetBooksList();
    this.getBooksList$ = this.store.select(selectBooksList).pipe(
      tap(booksResponse => {
          this.dataSource.data = booksResponse.data;
          this.totalItems = booksResponse.totalElements;
      })
    );  
  }

// search in searchbar by title and author

  onSearch(event: Event, isClear: boolean) {
    if (isClear) {
      this.clearSearch();
    } else {
      event.preventDefault();
      this.updateSearchParams();
    }
    this.dispatchGetBooksList();
  }

  onPageChange(event: PageEvent): void {
    const page = event.pageIndex + 1;
    const pageSize = event.pageSize;
    this.requestParams = {
      ...this.requestParams,
      page,
      pageSize,
    };
    this.dispatchGetBooksList();
  }

  onSortOrders({ active, direction }: Sort) {
    this.requestParams = {
      ...this.requestParams,
      sortBy: active as SortColumns,
      sortDirection: direction,
    };
    this.dispatchGetBooksList();
  }


  private updateSearchParams() {
    this.requestParams = {
      ...this.requestParams,
      page: 1,
      pageSize: this.pageSizeOptions[0],
      filter: this.searchedTextControl,
    };
    this.paginator.firstPage();
  } 

  private dispatchGetBooksList() {
    this.store.dispatch(BooksPageActions.getBooksListByPageAndSort({ booksRequestParams: this.requestParams }));
  }

  private  clearSearch() {
    this.searchedText.reset();
    this.updateSearchParams();
  }

  openModal() {
    this.store.dispatch(BooksPageActions.openToAddBookModal()); 
  }
  viewDetails(bookId: string) {
    if(bookId) {
      this.store.dispatch(BooksPageActions.viewBookDetails({bookId}));
    }
    
  }
}
