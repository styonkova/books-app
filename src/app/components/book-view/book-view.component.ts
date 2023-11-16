import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.scss']
})
export class BookViewComponent implements OnInit {
  book!: Book;
  constructor(
    public dialogRef: MatDialogRef<BookViewComponent>,
    @Inject(MAT_DIALOG_DATA) public bookDetails: Book,
    private store: Store
  ) {

  }
  ngOnInit() {
    this.book = this.bookDetails;
  }

  closeDialog(): void {
      this.dialogRef.close();
  }
}
