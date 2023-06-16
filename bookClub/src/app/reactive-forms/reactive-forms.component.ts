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
    name: ['', Validators.required],
    poster: ['', [Validators.required, Validators.pattern('^http.*')]],
    summary: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(40)],
    ],
    rating: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
  });

  constructor(
    private fb: FormBuilder,
    private bookService: BookServiceService,
    private router: Router
  ) {}

  onSubmit() {
    this.bookService
      .addbook(this.bookForm.value)
      .subscribe((val) => this.router.navigate(['/movies']));
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
}