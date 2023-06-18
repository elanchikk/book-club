import { group } from '@angular/animations';
import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookServiceService } from 'src/app/book-service.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

interface book {
  id: string;
  title: string;
  author: string;
  category: string;

  date: string;
  status: string;
  url: string;
}

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent {
  constructor(
    private bookService: BookServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  showBookId: string = '';
  showDetail: any = {
    id: '',
    title: 'sherlock holmes',
    author: 'sherlock',
    category: 'adventure',
    date: '5 jan 21',
    status: 'active',
    url: '',
  };

  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.showBookId = param['id'];
    });

    this.bookService.getBookDetails(this.showBookId).subscribe((val) => {
      this.showDetail = val;
      console.log(val);
    });
  }
  gotoHome() {
    this.router.navigate(['/home']);
  }
}
