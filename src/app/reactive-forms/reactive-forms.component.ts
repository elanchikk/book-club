import { group } from '@angular/animations';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BookServiceService } from 'src/app/book-service.service';
@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.css'],
})
export class ReactiveFormsComponent {
  @Output() movieData: EventEmitter<any> = new EventEmitter();

  bookForm = this.fb.group({
    title: ['', Validators.required],
    url: ['', [Validators.required,Validators.pattern('^http.*')]],
    author: ['', [Validators.required]],
    category: ['', [Validators.required]],
    date: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private bookService: BookServiceService,
    private router: Router
  ) {}
  invalid: boolean = true;

  gotoHome() {
    this.router.navigate(['/home']);
  }
  ngOnChanges() {
    if (this.bookForm.valid) {
      this.invalid = false;
    }
    console.log(this.invalid);
  }

  onSubmit() {
    console.log(this.bookForm.invalid);
    this.bookService
      .addbook(this.bookForm.value)
      .subscribe((val) => this.router.navigate(['/home']));
    this.bookForm.reset();
  }

  get nameError() {
    return this.bookForm.get('title');
  }

  get authorError() {
    return this.bookForm.get('author');
  }

  get categoryError() {
    return this.bookForm.get('category');
  }

  get dateError() {
    return this.bookForm.get('date');
  }

  get urlError() {
    return this.bookForm.get('url');
  }
}
