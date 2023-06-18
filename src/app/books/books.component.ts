import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  VirtualTimeScheduler,
  catchError,
  concatMap,
  debounceTime,
  distinctUntilChanged,
  mergeMap,
  switchAll,
  switchMap,
  timer,
} from 'rxjs';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent {
  id: string = '';
  title: string = '';
  author: string = '';
  category: string = '';
  status: string = '';
  date: string = '';
  url: string = '';

  isAddingBook: boolean = false;
  isEditingBook: boolean = false;
  searchForm = this.fb.group({
    name: [''],
  });

  Books$: any;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.Books$ = this.getBooks();
  }

  getBooks() {
    return this.http
      .get('https://648c2b678620b8bae7ec5fab.mockapi.io/bookclub')
      .pipe(catchError((err) => []));
  }

  deleteBook(id: string) {
    this.Books$ = this.http
      .delete(`https://648c2b678620b8bae7ec5fab.mockapi.io/bookclub/${id}`)
      .pipe(
        catchError((err) => []),
        concatMap(() => this.getBooks()) // in case two deletes are done
      );
  }

  bookId(index: number, book: any) {
    return book.id;
  }

  onAddingBooks() {
    this.isAddingBook = false;
    this.isEditingBook = false;
    this.clearAllInputs();
  }

  clearAllInputs() {
    this.id = '';
    this.author = '';
    this.category = '';
    this.status = '';
    this.date = '';
    this.url = '';
  }
}
