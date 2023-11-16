import { Injectable } from '@angular/core';
import { BooksRequestParams } from '../models/books-request-params';
import { Observable, map, of } from 'rxjs';
import { Book } from '../models/book';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BookForm } from '../models/book-form';
import { JsonServerParams } from '../models/json-server-params';
import { BooksResponseData } from '../models/books-response-data';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  apiUrl = ' http://localhost:3000/books';
  constructor(private http: HttpClient) { }

  // get book list without params

  getBooks(): Observable<Book[]> {
    return this.http
      .get<Book[]>(
        `${this.apiUrl}`
      );
  }
  // get book list with params

  getBooksList(requestParams: BooksRequestParams): Observable<BooksResponseData> {
    const {page, pageSize, sortBy, sortDirection, filter} = requestParams;
    const params: any = {
      _page: page.toString(),
      _limit: pageSize.toString(),
    };
    if (sortBy && sortDirection) {
      params._sort = sortBy;
      params._order = sortDirection;
    }
    if (filter) {
      params.q = filter;
    }

    return this.http.get<Book[]>(this.apiUrl, { params, observe: 'response' }).pipe(
      map((processResponse) => {
        const totalCount = processResponse.headers.get(
          'X-Total-Count'
        ) as string;
        const booksData = processResponse.body || []; 
        return {data: booksData, totalElements: +totalCount} as BooksResponseData;
      })
    );
};
// add new book

  addBook(book: Book): Observable<Book> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Book>(this.apiUrl, book, { headers });
  }

  // get unique book
  
  getBookById(bookId: string): Observable<Book> {
    return this.http
      .get<Book>(
        `${this.apiUrl}/${bookId}`
      );
  }

}



