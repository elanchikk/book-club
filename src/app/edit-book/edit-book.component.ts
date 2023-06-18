import { group } from '@angular/animations';
import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BookServiceService } from 'src/app/book-service.service';
@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css'],
})
export class EditBookComponent {
  constructor(
    private fb: FormBuilder,
    private bookService: BookServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  bookForm = this.fb.group({
    title: ['', Validators.required],
    author: ['', [Validators.required]],
    category: ['', Validators.required],
    date: ['', Validators.required],
    url: ['', [Validators.required, Validators.pattern('^http.*')]],
  });
  editBookId: string = '';
  bookDetail: any;

  gotoHome() {
    this.router.navigate(['/home']);
  }

  onSubmit() {
    this.bookService
      .updateBook(this.editBookId, this.bookForm.value)
      .subscribe((val) => this.router.navigate(['/home']));
    this.bookForm.reset();
  }

  get titleError() {
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
  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.editBookId = param['id'];
    });

    this.bookService.getBookDetails(this.editBookId).subscribe((val) => {
      this.bookDetail = val;
      console.log(val);
      this.bookForm.setValue({
        title: this.bookDetail.title,
        author: this.bookDetail.author,
        category: this.bookDetail.category,
        date: this.bookDetail.date,
        url: this.bookDetail.url,
      });
    });
  }
}
