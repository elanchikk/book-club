import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css'],
})
export class BookCardComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}
  @Input() book: book = {
    id: '1',
    title: 'sherlock holmes',
    author: 'sherlock',
    category: 'adventure',
    date: '5 jan 21',
    status: 'active',
    url: '',
  };

  @Output() idToDelete: EventEmitter<any> = new EventEmitter();
  // @Output() idToEdit: EventEmitter<any> = new EventEmitter();
  // @Output() idToToggle: EventEmitter<any> = new EventEmitter();

  onDelete(id: string) {
    this.idToDelete.emit(id);
  }

  onEdit(id: string) {
    this.router.navigate([`./edit-book/${id}`]);
  }

  gotoBookInfo(id: string) {
    this.router.navigate([`./book-details/${id}`]);
  }
}
