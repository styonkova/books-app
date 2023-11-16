import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Book } from 'src/app/models/book';
import { ControlsOf } from 'src/app/models/controls-of';
import { BooksPageActions } from '../+state/actions';
import { BookValidators } from 'src/app/validators/book-validators';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.scss']
})
export class BookAddComponent implements OnInit {
  bookForm = this.fb.group({} as ControlsOf<Book>);

  get bookTitleControl(): FormControl<string> {
    return this.bookForm.get('title') as FormControl<string>;
  }

  get bookAuthorControl(): FormControl<string> {
    return this.bookForm.get('author') as FormControl<string>;
  }
  get bookISBNControl(): FormControl<string> {
    return this.bookForm.get('isbn') as FormControl<string>;
  }
  get bookCoverFormControl(): FormControl<string> {
    return this.bookForm.get('bookCover') as FormControl<string>;
  }

  isbnNumberPrefix = '978-';

  constructor( private fb: NonNullableFormBuilder,
    private store: Store,
    public dialogRef: MatDialogRef<BookAddComponent>,
    ) {

  }
  ngOnInit(): void {
    this.bookForm = this.createForm();
    
  }
  private createForm(): FormGroup {
    return this.fb.group({
      title: [
        '',
        [
          Validators.required,
          BookValidators.noWhitespaceValidator(),
        ],
      ],
      author: [
        '',
        [
          Validators.required,
          BookValidators.noWhitespaceValidator(),
          BookValidators.onlyLetters(),
        ],
      ],
      isbn: ['', 
      [
        Validators.required,     
        BookValidators.noWhitespaceValidator(),    
        BookValidators.requiredISBN(), // here we have to remove the prefix in order to show required message
        Validators.maxLength(17), // value can be 978-000-0000-00-0 which includes prefix and separator
        Validators.minLength(17), // value can be 978-000-0000-00-0 which includes prefix and separator
      ]],
      bookCover: [''],
    });
  }

  onSaveClick(): void {
  
    const newBook = this.bookForm.getRawValue() as Book;
    this.store.dispatch(BooksPageActions.addBook({newBook}))
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onFileChange(event: any): void {
 
    let _this = this;
    let file = event.target.files[0];
    if(!file) {
      return;
    }
    let reader = new FileReader();
    let base64Image;
    reader.readAsDataURL(file);
    reader.onload = function () {
      if(reader.result) {

        base64Image = reader.result as string;
        _this.bookForm.patchValue({
          bookCover: base64Image,
        });

      }
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };

  }


}
