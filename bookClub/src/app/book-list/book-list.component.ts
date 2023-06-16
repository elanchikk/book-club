import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  VirtualTimeScheduler,
  catchError,
  concatMap,
  mergeMap,
  switchAll,
  switchMap,
} from 'rxjs';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent {

  id: string='';
    title: string='';
    author: string='';
    category: string='';
    status: string='';
    date: string='';

    isAddingBook :boolean=false;
isEditingBook:boolean=false;

  
  Books$: any;
  ngOnInit() {
    this.Books$ = this.getBooks();
  }

  constructor(private http: HttpClient) {}

  getBooks() {
    return this.http
      .get('https://648c2b678620b8bae7ec5fab.mockapi.io/:endpoint')      
      .pipe(catchError((err) => []));
  }

  deleteBook(id: string) {
    this.Books$ = this.http
      .delete(`https://648c2b678620b8bae7ec5fab.mockapi.io/:endpoint
      /books/${id}`)
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
    this.id= '';
    this.author = '';
    this.category = '';
    this.status = '';
    this.date = '';
  }

  }
