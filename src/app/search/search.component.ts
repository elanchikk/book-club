import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  interval,
  switchMap,
  timer,
} from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})

export class SearchComponent {
  searchForm = this.fb.group({
    name: [''],
  });
  constructor(private fb: FormBuilder, private http: HttpClient) {}
  bookname: string = '';
  names = [{}];
  bookDetails: any = [];
  @Output() book: EventEmitter<any> = new EventEmitter();

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
}
