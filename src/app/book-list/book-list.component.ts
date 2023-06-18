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
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent {
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
  bookDetails: any = [];
  ngOnInit() {
    this.searchForm
      .get('name')
      ?.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((val) =>
          timer(0, 4000).pipe(switchMap((n) => this.searchBook(val as string)))
        )
      )
      .subscribe((data: any) => {
        //console.log(data);
        // console.log(this.names)
        this.bookDetails = data;
        console.log(this.bookDetails);
      });
  }

  searchBook(name: string) {
    console.log(name);
    return this.http.get(
      `https://648c2b678620b8bae7ec5fab.mockapi.io/bookclub?title=${name}`
    );
  }

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

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

  gotoHome() {
    this.router.navigate(['/home']);
  }
}
